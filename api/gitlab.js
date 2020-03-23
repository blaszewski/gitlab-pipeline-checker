const axios = require('axios');
const parse = require('parse-link-header');

module.exports = class GitlabAPI {
  allData = [];

  constructor(privateAccessToken) {
    this._privateAccessToken = privateAccessToken;
  }

  async getPipelinesStatus(username, projectId, page = 1) {
    try {
      await axios
        .get(
          `${process.env.GITLAB_PROJECT_API}/${projectId}/pipelines?private_token=${this._privateAccessToken}&username=${username}&per_page=100&page=${page}`
        )
        .then(({ data, headers }) => {
          this.allData = [...this.allData, ...data];
          const { next } = parse(headers.link);
          if (!next) {
            const total = this.allData.length;
            const success = this.allData.reduce(
              (acc, cur) => (cur.status === 'success' ? ++acc : acc),
              0
            );

            console.log(
              `Successful: ${success}, Failed/Cancelled: ${
                total - success
              }, Total: ${total}`
            );
          } else {
            return this.getPipelinesStatus(username, projectId, next.page);
          }
        });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};
