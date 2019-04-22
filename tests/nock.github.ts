import nock from 'nock';
import { githubReposResponse, githubRepoResponse, githubUserNotFoundResponse, githubRepoNotFoundResponse } from "./data/github.repos.response";
import githubBranchesResponse from "./data/github.branches.response";

export const username = 'MigasEu';
export const usernameNotFound = 'NotFound';
export const repo = 'TPW2';
export const repoNotFound = 'NotFound';
export default () => {

    nock('https://api.github.com')
        .get(`/search/repositories?q=user:${username}&page=1&per_page=30`)
        .reply(200, githubReposResponse);

    nock('https://api.github.com')
        .get(`/search/repositories?q=user:${usernameNotFound}&page=1&per_page=30`)
        .reply(422, githubUserNotFoundResponse);

    nock('https://api.github.com')
        .get(`/repos/${username}/${repo}`)
        .reply(200, githubRepoResponse);

    nock('https://api.github.com')
        .get(`/repos/${username}/${repoNotFound}`)
        .reply(404, githubRepoNotFoundResponse);

    nock('https://api.github.com')
        .get(`/repos/${username}/${repo}/branches?page=1&per_page=30`)
        .reply(200, githubBranchesResponse);
}