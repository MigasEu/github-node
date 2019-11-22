import * as rm from "typed-rest-client";
import { GithubRepository } from "./Repository";
import { QueryResult } from "./QueryResult";
import { GithubBranch } from "./Branch";

export interface RestParams {
    page?: number,
    pageSize?: number,
}

export class GithubReposService {
    client: rm.RestClient;

    constructor(url: string = 'https://api.github.com') {
        this.client = new rm.RestClient('github_node', url);
    }

    async getRepo(username: string, repository: string): Promise<rm.IRestResponse<GithubRepository>> {
        return this.client.get<GithubRepository>(`/repos/${username}/${repository}`);
    }

    async getUserRepos(username: string, params: RestParams = {
        page: 1,
        pageSize: 30,
    }): Promise<rm.IRestResponse<QueryResult<GithubRepository>>> {
        return this.client.get<QueryResult<GithubRepository>>(`/search/repositories?q=user:${username}&page=${params.page}&per_page=${params.pageSize}`);
    }

    async getRepoBranches(username: string, repository: string, params: RestParams = {
            page: 1,
            pageSize: 30,
        }): Promise<rm.IRestResponse<GithubBranch[]>> {
        return this.client.get<GithubBranch[]>(`/repos/${username}/${repository}/branches?page=${params.page}&per_page=${params.pageSize}`);
    }
}
