import { Request, Response, NextFunction } from "express";
import { ReposService } from "../ReposService";
import { Repository } from "../Repository";
import { Branch } from "../Branch";
import { Collection } from "../Collection";
import { HttpError } from "../HttpError";

export class ReposController {
    static async getRepo(req: Request, res: Response, next: NextFunction) {
        const username = req.params.username;
        const repository = req.params.repository;
        const reposService = new ReposService();

        try {
            const repo = await reposService.getRepo(username, repository);
            res.status(200).json(repo);
        } catch (e) {
            if (e.statusCode === 403) {
                e = new HttpError('Github API rate limit exceeded', 403);
            }
            next(e);
        }
    }

    static async getUserRepos(req: Request, res: Response, next: NextFunction) {
        const username = req.params.username;
        const pageSize = req.query.per_page || 30;
        const page = req.query.page || 1;
        const reposService = new ReposService();

        try {
            const reposCollection = await reposService.getUserRepos(username, {
                page,
                pageSize,
            });
            reposCollection.link = () => req.originalUrl;
            res.status(200).json(reposCollection);
        } catch (e) {
            if (e.statusCode === 403) {
                e = new HttpError('Github API rate limit exceeded', 403);
            }
            next(e);
        }
    }

    static async getRepoBranches(req: Request, res: Response, next: NextFunction) {
        const username = req.params.username;
        const repositoryName = req.params.repository;
        const pageSize = req.query.per_page || 30;
        const page = req.query.page || 1;
        const reposService = new ReposService();

        try {
            const repo = new Repository(repositoryName, username);
            const reposCollection = await reposService.getRepoBranches(repo, {
                page,
                pageSize,
            });
            reposCollection.link = () => req.originalUrl;
            res.status(200).json(reposCollection);
        } catch (e) {
            if (e.statusCode === 403) {
                e = new HttpError('Github API rate limit exceeded', 403);
            }
            next(e);
        }
    }
}