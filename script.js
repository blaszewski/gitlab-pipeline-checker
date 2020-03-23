#!/usr/bin/env node
const GitlabAPI = require('./api/gitlab');
const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .option('t', {
    alias: 'token',
    type: 'string',
    describe: 'Private Access Token from GitLab',
    demand: true
  })
  .option('p', {
    alias: 'projectId',
    type: 'number',
    describe: 'Project ID',
    demand: true
  })
  .option('u', {
    alias: 'username',
    type: 'string',
    describe: 'GitLab username',
    demand: true
  })
  .option('pg', {
    alias: 'page',
    type: 'number',
    describe: 'Number of a page',
    default: 1
  })
  .help('h').argv;

const { token, projectId, username, page } = argv;
const gitlabApi = new GitlabAPI(token, projectId, username, page);

gitlabApi.getPipelinesStatus();
