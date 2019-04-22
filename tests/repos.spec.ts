import chai from 'chai';
import chaiHttp from 'chai-http';
import { responseRepos, responseRepo, responseRepoBranches } from './data/repos.response';
import nockGithub, { repoNotFound } from './nock.github';
import { repo, username, usernameNotFound } from './nock.github';
import {app, server} from '../src/server'

chai.use(chaiHttp);
chai.should();

describe('Get User repos', () => {
    beforeEach(() => {
        nockGithub();
    });

    it('Get user repos', (done) => {
        chai.request(app)
            .get(`/repos/${username}`)
            .end((err, res) => {
                res.should.have.status(200);
                chai.expect(JSON.stringify(res.body)).to.equal(JSON.stringify(responseRepos));
                done();
            });
    });

    it('User not found', (done) => {
        chai.request(app)
            .get(`/repos/${usernameNotFound}`)
            .end((err, res) => {
                res.should.have.status(404);
                chai.expect(res.body).to.satisfy((body: any) => {
                    return 'status' in body && 'Message' in body;
                });
                chai.expect(res.body.status).to.equal(404);
                done();
            });
    });

    it('Get repo', (done) => {
        chai.request(app)
            .get(`/repos/${username}/${repo}`)
            .end((err, res) => {
                res.should.have.status(200);
                chai.expect(JSON.stringify(res.body)).to.equal(JSON.stringify(responseRepo));
                done();
            });
    });

    it('Repo not found', (done) => {
        chai.request(app)
            .get(`/repos/${username}/${repoNotFound}`)
            .end((err, res) => {
                res.should.have.status(404);
                chai.expect(res.body).to.satisfy((body: any) => {
                    return 'status' in body && 'Message' in body;
                });
                chai.expect(res.body.status).to.equal(404);
                done();
            });
    });

    it('Get repo branches', (done) => {
        chai.request(app)
            .get(`/repos/${username}/${repo}/branches`)
            .end((err, res) => {
                res.should.have.status(200);
                chai.expect(JSON.stringify(res.body)).to.equal(JSON.stringify(responseRepoBranches));
                done();
            });
    });

    it('Unsupported type', (done) => {
        chai.request(app)
            .get(`/repos/${username}/${repo}/branches`)
            .set('Accept', 'application/xml')
            .end((err, res) => {
                res.should.have.status(406);
                chai.expect(res.body).to.satisfy((body: any) => {
                    return 'status' in body && 'Message' in body;
                });
                chai.expect(res.body.status).to.equal(406);
                done();
            });
    });

    after(async () => {
        server.close();
    });
});