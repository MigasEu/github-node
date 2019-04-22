export interface GithubRepository {
    name: string;
    full_name: string;
    owner: {
        login: string,
    };
    description: string;
    fork: boolean;
};