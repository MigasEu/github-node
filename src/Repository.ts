import { Branch } from "./Branch";
import { GithubRepository } from "./github/Repository";
import { Resource } from "./Resource";
import { Collection } from "./Collection";

export class Repository extends Resource {
    branches = new Collection<Branch>([], () => {
        return this.link + '/branches';
    });

    constructor(public name: string, public owner: string) { 
        super();
    }

    static fromGithub(from: GithubRepository): Repository {
        return new Repository(from.name, from.owner.login);
    }

    static fromGithubArray(from: GithubRepository[]): Repository[] {
        return from.map((v) => {
            return Repository.fromGithub(v);
        })
    }

    get link() {
        return `/repos/${this.owner}/${this.name}`;
    }
}