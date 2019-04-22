import { GithubBranch } from "./github/Branch";
import { Repository } from "./Repository";
import { Resource } from "./Resource";

export class Branch implements Resource {

    constructor(
        private repository: Repository,
        public name: string,
        public last_commit: string,
    ) {

    }
    static fromGithub(repo: Repository, from: GithubBranch): Branch {
        return new Branch(repo, from.name, from.commit.sha);
    }

    static fromGithubArray(repo: Repository, from: GithubBranch[]): Branch[] {
        return from.map((v) => {
            return Branch.fromGithub(repo, v);
        })
    }

    public toJSON() {
        return {
            name: this.name,
            last_commit: this.last_commit,
        };
    }

    get link() {
        return `/repos/${this.repository.owner}/${this.repository.name}/branches/${this.name}`;
    }
}