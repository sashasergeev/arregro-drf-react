from functools import reduce
from asgiref.sync import async_to_sync
from django.forms.models import model_to_dict
from celery import shared_task

from channels.layers import get_channel_layer
from .models import PriceDynamic, Post, Github

import requests
from datetime import datetime, timedelta

channel_layer = get_channel_layer()


def generate_coin_prices_api_call():
    url = "https://api.coingecko.com/api/v3/simple/price?ids="
    prices = PriceDynamic.objects.all()
    for price in prices:
        url += f"{price.cg_id}%2C"
    url += "bitcoin&vs_currencies=usd&include_24hr_change=true"
    return url


@shared_task
def get_coins_price():
    url = generate_coin_prices_api_call()
    data = requests.get(url).json()
    prices = []
    for coin, price in data.items():
        try:
            obj = PriceDynamic.objects.get(cg_id=coin)
        except:
            continue

        if float(obj.price) > price["usd"]:
            state = "fall"
        elif float(obj.price) == price["usd"]:
            state = "same"
        elif float(obj.price) < price["usd"]:
            state = "raise"

        obj.price = str(price["usd"])
        obj.cg_id = coin

        if not price["usd_24h_change"] is None:
            obj.price_change24h = round(price["usd_24h_change"], 2)

        obj.save()
        new_data = model_to_dict(obj)
        new_data.update({"name": obj.coin.name, "state": state})
        prices.append(new_data)

    async_to_sync(channel_layer.group_send)(
        "prices", {"type": "send_new_data", "text": prices}
    )


@shared_task
def update_post_price(post_id):
    post = Post.objects.get(pk=post_id)
    if not post.price1hr:
        post.price1hr = post.coin.prices.price
    else:
        post.price2hr = post.coin.prices.price

    post.save()


# GITHUB ACTIVITY
def convertDataForChart(data: list) -> dict:
    """DELETE DATE DUBLICATES AND ASSIGN ACTIVITY"""

    def reduceToDict(x, y):
        if not x.__contains__(y):
            x[y] = 1
        else:
            x[y] = x[y] + 1
        return x

    return reduce(reduceToDict, data, {})


def getRepoCommits(HEADERS, LAST_YEAR, git, repo, per_page=100):
    """GETTING REPOS COMMITS"""
    commits = requests.get(
        f"https://api.github.com/repos/{git}/{repo}/commits?per_page={per_page}&since={LAST_YEAR}",
        headers=HEADERS,
    )
    commits = commits.json()
    if not commits.__contains__("message"):
        filtered = []
        for commit in commits:
            filtered.append(commit["commit"]["committer"]["date"].split("T")[0])
        return filtered
    else:
        # case: repository is empty
        return []


@shared_task
def observe_github_activity(github, token):
    # CONST VARIABLES
    NOW = datetime.now()
    LAST_YEAR_DATE = (NOW - timedelta(days=365)).strftime("%Y-%m-%d")
    PER_PAGE = 100
    HEADERS = {"Authorization": f"token {token}"}

    # GET ORGANIZATION REPOSITORIES
    url = f"https://api.github.com/orgs/{github}/repos?type=public&accept=application/vnd.github.v3+json&per_page={PER_PAGE}&sort=pushed"
    repos = requests.get(url, headers=HEADERS)
    repos = repos.json()
    # print(repos)
    repos = list(
        filter(lambda b: b["pushed_at"] > LAST_YEAR_DATE and not b["fork"], repos)
    )

    # GET COMMITS DATA INTO TIMELINE
    commits = []
    for repo in repos:
        name = repo["name"]
        commits.extend(getRepoCommits(HEADERS, LAST_YEAR_DATE, github, name))

    # formatting data for chart
    commits = convertDataForChart(commits)

    # save data
    ghObj = Github.objects.get(name=github)
    ghObj.plotData = commits
    ghObj.save()

    print(commits)
