#!/usr/bin/env node
const GitlabAPI = require('./api/gitlab');
const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options({
    t: {
      alias: 'token',
      type: 'string',
      describe: 'Private Access Token from GitLab',
      demand: true,
    },
    p: {
      alias: 'projectId',
      type: 'number',
      describe: 'Project ID',
      demand: true,
    },
    u: {
      alias: 'username',
      type: 'string',
      describe: 'GitLab username',
      demand: true,
    },
    pg: {
      alias: 'page',
      type: 'number',
      describe: 'Number of a page',
      default: 1,
    },
  })
  .help('h').argv;

const { token, projectId, username, page } = argv;
const gitlabApi = new GitlabAPI(token, projectId, username, page);

gitlabApi.getPipelinesStatus();
