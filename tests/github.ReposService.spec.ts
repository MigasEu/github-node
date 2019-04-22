import {expect} from 'chai';
import nock from 'nock';
import { GithubReposService } from '../src/github/ReposService';
import { githubReposResponse } from './data/github.repos.response';
import branchesResponse from './data/github.branches.response';

const username = 'MigasEu';
const repo = 'TPW2';

describe('Get User tests', () => {
  beforeEach(() => {
    nock('https://api.github.com')
      .get(`/search/repositories?q=user:${username}&page=1&per_page=30`)
      .reply(200, githubReposResponse);
    nock('https://api.github.com')
      .get(`/repos/${username}/${repo}/branches?page=1&per_page=30`)
      .reply(200, branchesResponse);
  });

  it('Get user repos', async () => {
    let client = new GithubReposService();
    const response = await client.getUserRepos(username);    
    expect(response.result).to.exist;
    if (!response.result) {
      return;
    }
    expect(response.result.items[0].name).to.equal(repo);
  });

  it('Get repo branches', async () => {
    let client = new GithubReposService();
    const branchesResponse = await client.getRepoBranches(username, repo);
    expect(branchesResponse.result).to.exist;
    if (!branchesResponse.result) {
      return;
    }
    expect(branchesResponse.result[0].name).to.equal('create-and-main');
    expect(branchesResponse.result[0].commit.sha).to.equal('76132f3f40a9f8fdd86c01078543226541cd5118');
  });
});