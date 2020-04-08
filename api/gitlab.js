const axios = require('axios');
const parse = require('parse-link-header');
const { status, failed } = require('../utils/index');

const projectApi = 'https://gitlab.com/api/v4/projects';

module.exports = class GitlabAPI {
  allData = [];

  constructor({ token, projectId, username, page, fileName }) {
    this._privateAccessToken = token;
    this._projectId = projectId;
    this._username = username;
    this._page = page;
    this._fileName = fileName;
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
            status({
              data: this.allData,
              username: this._username,
              projectId: this._projectId,
              fileName: this._fileName,
            });
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
