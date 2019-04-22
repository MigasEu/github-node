import * as rm from "typed-rest-client";
import { RestParams, GithubReposService } from "./github/ReposService";
import { Collection } from "./Collection";
import { Repository } from "./Repository";
import { HttpError } from "./HttpError";
import { Branch } from "./Branch";

export class ReposService {
    client: GithubReposService;

    constructor(url: string = 'https://api.github.com') {
        this.client = new GithubReposService();
    }

    async getRepo(username: string, repository: string): Promise<Repository> {
        console.time('github-fetch-repo');
        const githubRepos = await this.client.getRepo(username, repository);
        console.timeEnd('github-fetch-repo');
        if (!githubRepos.result) {
            throw new HttpError('Repository not found', 404);
        }
        let repo = Repository.fromGithub(githubRepos.result);

        console.time('github-fetch-repo-branches');
        const colletion = await this.getRepoBranches(repo);
        console.timeEnd('github-fetch-repo-branches');
        repo.branches.items = colletion.items;
        return repo;
    }

    async getUserRepos(username: string, params: RestParams = {
        page: 1,
        pageSize: 30,
    }): Promise<Collection<Repository>> {
        let notFound = false;
        let githubRepos = null;
        try {
            console.time('github-fetch-repos');
            githubRepos = await this.client.getUserRepos(username, {
                page: params.page,
                pageSize: params.pageSize,
            });
            console.timeEnd('github-fetch-repos');
        } catch (err) {
            if (err.statusCode === 422) {
                notFound = true;
            } else {
                throw err;
            }
        }
        if (notFound || !githubRepos || !githubRepos.result) {
            throw new HttpError('User not found', 404);
        }
        let repos = Repository.fromGithubArray(githubRepos.result.items);

        console.time('github-fetch-repos-branches');
        repos = await Promise.all(repos.map(async (repo) => {
            const colletion = await this.getRepoBranches(repo);
            repo.branches.items = colletion.items;
            return repo;
        }));
        console.timeEnd('github-fetch-repos-branches');

        return new Collection<Repository>(repos);
    }

    async getRepoBranches(repository: Repository, params: RestParams = {
        page: 1,
        pageSize: 30,
    }): Promise<Collection<Branch>> {
        const githubBranches = await this.client.getRepoBranches(repository.owner, repository.name, {
            page: params.page,
            pageSize: params.pageSize,
        });
        if (!githubBranches.result) {
            throw new HttpError('Repository not found', 404);
        }
        const branches = Branch.fromGithubArray(repository, githubBranches.result);

        return new Collection<Branch>(branches);
    }
}