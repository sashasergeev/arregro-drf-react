from functools import reduce
from asgiref.sync import async_to_sync
from django.forms.models import model_to_dict
from celery import shared_task

from channels.layers import get_channel_layer
from .models import PriceDynamic, Post, Github

import os
import requests
from datetime import datetime, timedelta

channel_layer = get_channel_layer()


@shared_task
def get_coins_price():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=swftcoin%2Cfrax-share%2Cdego-finance%2Ckeep-network%2Craydium%2Cnear%2Cconnect-financial%2Cferrum-network%2Cdigibyte%2Corbs%2Crio-defi%2Ciexec-rlc%2Csnowswap%2Cceler-network%2Creserve-rights-token%2Cmarlin%2Cdecred%2Cfio-protocol%2Cvethor-token%2Cnimiq%2Cpaid-network%2Crobonomics-network%2Cpolylastic%2Cbluzelle%2Cacryptos%2Ccream%2Cecomi%2Ccertik%2Cnkn%2Contology%2Cdeus-finance%2Clambda%2Csingularitynet%2Cstafi%2Caergo%2Cakropolis%2Cdigitalbits%2Cpresearch%2Cmantra-dao%2Corigintrail%2Cevolution-finance%2Corchid-protocol%2Cmorpheus-network%2Cflow%2Crubic%2Catari%2Ctrust-wallet-token%2Cavalanche-2%2Cgenesis-vision%2Ccivic%2Caavegotchi%2Caave%2Coasis-network%2Cneblio%2Cboson-protocol%2Carweave%2Cpower-ledger%2Cellipsis%2Cswissborg%2C1inch%2Cmodefi%2Cshopping-io%2Ciotex%2Ccosmos%2Cnord-finance%2Cpoolz-finance%2Cmetal%2Cpolkadot%2Ccarry%2Cdecentr%2Cocean-protocol%2Cyearn-finance%2Cspartan-protocol-token%2Cderivadao%2Ccartesi%2Credfox-labs%2Csyscoin%2Ccoti%2Cmywish%2Cergo%2Calien-worlds%2Ccumrocket%2Clua-token%2Caion%2Cgraphlinq-protocol%2Csuperbid%2Calgorand%2Cmy-neighbor-alice%2Cprcy-coin%2Cfantom%2Clto-network%2Clukso-token%2Cunmarshal%2Cwault%2Csuperfarm%2Cenergi%2Cbtu-protocol%2Ckylin-network%2Cbtse-token%2Cdarwinia-network-native-token%2Cunifty%2Charmony%2Cstp-network%2Chuobi-token%2Csolana%2Cdusk-network%2Calpha-finance%2Cselfkey%2Cwing-finance%2Cband-protocol%2Cstakenet%2Cton-crystal%2Ctelos%2Ctellor%2Cnuls%2Czignaly%2Csafemoon%2Cripio-credit-network%2Cphantasma%2Cmetahash%2Carianee%2Ckava-lend%2Capy-finance%2Chelmet-insure%2Cbitberry-token%2Cperpetual-protocol%2Celectroneum%2Cmeasurable-data-token%2Crootkit%2Cconvergence%2Cbridge-mutual%2Corigin-protocol%2Csonm%2Cunifi-protocol-dao%2Ccrypterium%2Cpolymath%2Cdefi-yield-protocol%2Csmartlands%2Cidle%2Cmultivac%2Cbartertrade%2Campleforth%2Cfetch-ai%2Caxion%2Ccontentos%2Chedera-hashgraph%2Cskale%2Cyield-app%2Csignata%2Cwaves%2Cdextf%2Cvideocoin%2Cskey-network%2Cbella-protocol%2Chorizon-protocol%2Cthorchain%2Csentivate%2Cvechain%2Cdefi-for-you%2Cxfund%2Coxbull-tech%2Cprometeus%2Copium%2Cglitch-protocol%2Ctrias-token%2Corion-protocol%2Cte-food%2Cinverse-finance%2Cswitcheo%2Cpnetwork%2Cunit-protocol-duck%2Cautonio%2Cmorpheus-labs%2Cpoa-network%2Cwaultswap%2Cnano%2Cvexanium%2Ccoinmetro%2Clabs-group%2Cwoo-network%2Creef-finance%2Cultra%2Cfree-coin%2Chackenai%2Cark%2Crari-governance-token%2Cdodo%2Ctokenclub%2Ctomochain%2Cparsiq%2Cpendle%2Czkswap%2Cnodeseeds%2Cparticl%2Cpundi-x%2Ccanyacoin%2Clitentry%2Cidena%2Csync-network%2Ctrustswap%2Cgamercoin%2Cvfox%2Cblank%2Csatt%2Ckardiachain%2Csparkpoint%2Carpa-chain%2Coceanex-token%2Crefinable%2Cduckdaodime%2Cswipe%2Cbeam%2Cbasis-share%2Choge-finance%2Cauto%2Chydradx%2Cdexe%2Cdao-maker%2Ccyberfi%2Ckava%2Cankr%2Csentinel-protocol%2Cpersistence%2Cpivx%2Ccutcoin%2Cneutrino-system-base-token%2Cpancaketools%2Ccurve-dao-token%2Cbanano%2Coiler%2Cpolkamarkets%2Cbenchmark-protocol%2Cenergy-web-token%2Cvesper-finance%2Ckonomi-network%2Cterra-virtua-kolect%2Cbasketcoin%2Copacity%2Crefereum%2Cwanchain%2Cplotx%2Coccamfi%2Cmaps%2Cramp%2Capyswap%2Cexeedme%2Cunitrade%2Cnewscrypto-coin%2Cunit-protocol%2Caioz-network%2Covr%2Cjulswap%2Coraichain-token%2Clinear%2Cunion-protocol-governance-token%2Cblind-boxes%2Crevv%2Cnaos-finance%2Csparkpoint-fuel%2Cfrax%2Cgochain%2Csolve-care%2Cmcdex%2Cpaypolitan-token%2Ctidal-finance%2Ccrowns%2Callianceblock%2Carmor%2Cgeeq%2Cpower-index-pool-token%2Cbifrost%2Cdivi%2Cjenny-metaverse-dao-token%2Cnominex%2Cstake-dao%2Ceffect-network%2Cdhedge-dao%2Crainicorn%2Cfinxflo%2Cmonavale%2Cdeapcoin%2Cplaycent%2Crender-token%2Clympo%2Cbzx-protocol%2Cdent%2Czilliqa%2Cmobox%2Cthe-sandbox%2Cwazirx%2Cchiliz%2Cshabu-shabu%2Cthe-graph%2Cakash-network%2Cvelas%2Cvenus%2Csentinel%2Ccardstarter%2Ccardstack%2Ckira-network%2Cgovi%2Coffshift%2C88mph%2Cdora-factory%2Cbeefy-finance%2Cinjective-protocol%2Cxend-finance%2Cdecentral-games%2Cv-systems%2Cbip%2Chopr%2Cmoviebloc%2Cbscpad%2Cupbots%2Cklever%2Cdlp-duck-token%2Cumbrella-network%2Cpermission-coin%2Csafe-haven%2Chord%2Chakka-finance%2Ccrust-network%2Clgcy-network%2Cmatic-network%2Cluna%2Cpancakeswap-token%2Celrond-erd-2%2Camp-token%2Cenjincoin%2Cblockstack%2Cbancor%2Cstaked-ether%2Ciostoken%2Cnxm%2Cbakerytoken%2Crepublic-protocol%2Cquant-network%2Cneutrino%2Ckyber-network%2Cfunfair%2Cconcierge-io%2Cnoia-network%2Czcoin%2Cdia-data%2Cquark-chain%2Cchromaway%2Cpha%2Ciris-network%2Csharering%2Cquick%2Cthunder-token%2Cyfii-finance%2Cfsn%2Cwozx%2Cstacktical%2Ceverid%2Cfrontier-token%2Capollo%2Cget-token%2Cbepro-network%2Cunlend-finance%2Cred-pulse%2Cbit-z-token%2Cdextools%2Cforce-protocol%2Czero-exchange%2Cneon-exchange%2Ccallisto%2Cpchain%2Cconcentrated-voting-power%2Croute%2Caleph%2Cichi-farm%2Cmemetic%2Cblockport%2Cfoam-protocol%2Canj%2Cshyft-network-2%2Cgivly-coin%2Cdoki-doki-finance%2Cghost-by-mcafee%2Cchronobank%2Cac-exchange-token&vs_currencies=usd&include_24hr_change=true"
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
        obj.price_change24h = price["usd_24h_change"]
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
