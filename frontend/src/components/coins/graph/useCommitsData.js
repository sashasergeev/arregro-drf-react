import { useEffect, useState } from "react";

import axios from "axios";

const useCommitsData = (git) => {
  const PER_PAGE = 100;
  const YEAR_AGO = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );

  const [state, setState] = useState({ isLoading: true, commitsData: [] });

  const getRepositories = async () => {
    // getting all repos
    const url = `https://api.github.com/orgs/${git}/repos?type=public&accept=application/vnd.github.v3+json&per_page=${PER_PAGE}`;
    const { data } = await axios.get(url);
    return data;
  };

  // get commits by repo
  const getReposCommits = async (repo) => {
    const url = `https://api.github.com/repos/${git}/${repo}/commits?per_page=${PER_PAGE}&since=${YEAR_AGO}`;
    const commits = await axios.get(url);
    return commits;
  };

  useEffect(async () => {
    const repos = await getRepositories();

    // get all commits into timeline
    const commitsData = [];
    for (const repo of repos) {
      const commPerRepoData = await getReposCommits(repo.name);
      commitsData.push(...commPerRepoData.data);
    }

    // reformatting data
    const filteredData = commitsData
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
      commitsData: filteredData,
    });
  }, []);

  return state;
};

export default useCommitsData;
