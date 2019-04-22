# github-node
## Endpoints
  Serves github repository information. Consumes github v3 api. Limited to github's non-authenticated API rate limit.
### GET /repos/:username
Returns list of repositories.
Branches on each repository limited to 30. To fetch more, use branches endpoint.
  ```
{
    "items": [
        {
            "name": "TPW2",
            "owner": "MigasEu",
            "branches": {
                "items": [
                    {
                        "name": "create-and-main",
                        "last_commit": "76132f3f40a9f8fdd86c01078543226541cd5118"
                    },
                    {
                        "name": "data-model",
                        "last_commit": "f42492d23558d1054cc67ed56b96dd0d712674ac"
                    },
                    {
                        "name": "login",
                        "last_commit": "809b6d022242e9ce5c388fac14170fb426ac482e"
                    },
                    {
                        "name": "master",
                        "last_commit": "9c7eb7970b1a63c39a5a8fc4b98acf139b8f9ccb"
                    },
                    {
                        "name": "play-story",
                        "last_commit": "5d33b41f010d3f8c9f331aa638ffbe552c4d3856"
                    },
                    {
                        "name": "registration",
                        "last_commit": "b8c6e404c2cd05b4825a455b2d525f32bafaf3f5"
                    }
                ],
                "link": "/repos/MigasEu/TPW2/branches"
            },
            "link": "/repos/MigasEu/TPW2"
        }
    ],
    "link": "/repos/MigasEu"
}
  ```
### GET /repos/:username/:repository
Returns the repository object
  ```
{
    "name": "TPW2",
    "owner": "MigasEu",
    "branches": {
        "items": [
            {
                "name": "create-and-main",
                "last_commit": "76132f3f40a9f8fdd86c01078543226541cd5118"
            },
            {
                "name": "data-model",
                "last_commit": "f42492d23558d1054cc67ed56b96dd0d712674ac"
            },
            {
                "name": "login",
                "last_commit": "809b6d022242e9ce5c388fac14170fb426ac482e"
            },
            {
                "name": "master",
                "last_commit": "9c7eb7970b1a63c39a5a8fc4b98acf139b8f9ccb"
            },
            {
                "name": "play-story",
                "last_commit": "5d33b41f010d3f8c9f331aa638ffbe552c4d3856"
            },
            {
                "name": "registration",
                "last_commit": "b8c6e404c2cd05b4825a455b2d525f32bafaf3f5"
            }
        ],
        "link": "/repos/MigasEu/TPW2/branches"
    },
    "link": "/repos/MigasEu/TPW2"
}
  ```
### GET /repos/:username/:repository/branches
Returns given repository branches
  ```
{
    "items": [
        {
            "name": "create-and-main",
            "last_commit": "76132f3f40a9f8fdd86c01078543226541cd5118"
        },
        {
            "name": "data-model",
            "last_commit": "f42492d23558d1054cc67ed56b96dd0d712674ac"
        },
        {
            "name": "login",
            "last_commit": "809b6d022242e9ce5c388fac14170fb426ac482e"
        },
        {
            "name": "master",
            "last_commit": "9c7eb7970b1a63c39a5a8fc4b98acf139b8f9ccb"
        },
        {
            "name": "play-story",
            "last_commit": "5d33b41f010d3f8c9f331aa638ffbe552c4d3856"
        },
        {
            "name": "registration",
            "last_commit": "b8c6e404c2cd05b4825a455b2d525f32bafaf3f5"
        }
    ],
    "link": "/repos/MigasEu/TPW2/branches"
}
  ```
## pagination
All endpoint that return a collection allow for pagination control, through querystring values.

**per_page:** collection size per page.

**page:** Page number.
### Ex.:
/repos/MigasEu/TPW2/branches?per_page=1&page=2
