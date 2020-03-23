const axios = require('axios');
const parse = require('parse-link-header');
const { status, failed } = require('../utils/index');

const projectApi = 'https://gitlab.com/api/v4/projects';

module.exports = class GitlabAPI {
  allData = [];

  constructor(privateAccessToken, projectId, username, page) {
    this._privateAccessToken = privateAccessToken;
    this._projectId = projectId;
    this._username = username;
    this._page = page;
  }

  async getPipelinesStatus(page = this._page) {
    try {
      await axios
        .get(
          `${projectApi}/${this._projectId}/pipelines?private_token=${this._privateAccessToken}&username=${this._username}&per_page=100&page=${page}`
        )
        .then(({ data, headers }) => {
          this.allData = [...this.allData, ...data];
          const { next } = parse(headers.link);
          if (!next) {
            failed(this.allData);
            status(this.allData, this._username);
          } else {
            return this.getPipelinesStatus(next.page);
          }
        });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};
