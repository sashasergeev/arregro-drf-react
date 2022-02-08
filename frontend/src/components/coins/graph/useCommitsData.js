import { useEffect, useState } from "react";

import axios from "axios";

const useCommitsData = (git) => {
  const PER_PAGE = 100;
  const YEAR_AGO = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );

  const [state, setState] = useState({
    isLoading: true,
    isError: false,
    commitsData: [],
  });

  const getRepositories = async () => {
    // getting all repos
    const url = `https://api.github.com/orgs/${git}/repos?type=public&accept=application/vnd.github.v3+json&per_page=${PER_PAGE}`;
    const { data } = await axios.get(url);
    // filter by date and exclude forks
    return data.filter((e) => new Date(e.pushed_at) > YEAR_AGO && !e.fork);
  };

  const getReposCommits = async (repo) => {
    // get commits by repo
    const url = `https://api.github.com/repos/${git}/${repo}/commits?per_page=${PER_PAGE}&since=${YEAR_AGO}`;
    const commits = await axios.get(url);
    return commits.data;
  };

  useEffect(async () => {
    if (git) {
      const repos = await getRepositories();

      // get all commits into timeline
      // using Primise.all to batch all fetches
      const commitsData = await Promise.all(
        repos.map((e) => getReposCommits(e.name))
      );

      // reformatting data
      const filteredData = commitsData
        .flat()
        .map((e) => e.commit.committer.date.split("T")[0])
        .reduce(
          (obj, e) =>
            obj.hasOwnProperty(e)
              ? { ...obj, [e]: obj[e] + 1 }
              : { ...obj, [e]: 1 },
          {}
        );

      // applying data
      setState({
        isLoading: false,
        isError: false,
        commitsData: filteredData,
      });
    } else {
      // case when coin doesnt have github org
      setState({
        isLoading: false,
        commitsData: [],
        isError: true,
      });
    }
  }, []);

  return state;
};

export default useCommitsData;
