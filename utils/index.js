const fs = require('fs');
const path = require('path');

const convertToCsv = ({ data, columns }, delimiter = ',') =>
  [
    columns.join(delimiter),
    ...data.map((data) =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? '' : delimiter}${!data[key] ? '' : data[key]}`,
        ''
      )
    ),
  ].join('\n');

const writeAsCsv = ({
  data,
  username,
  projectId,
  fileName = `${projectId}.${username}`,
} = {}) => {
  const writeStream = fs.createWriteStream(
    path.join(__dirname, `../${fileName}.csv`)
  );

  const columns = Object.keys(data[0]);
  const convertedData = convertToCsv({ data, columns });

  writeStream.write(convertedData, (err) => {
    if (err) {
      throw err;
    }
  });

  writeStream.end();

  writeStream
    .on('finish', () => {
      console.log('Saved to a .csv file');
    })
    .on('error', (err) => {
      console.log(err);
    });
};

const formattedDate = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  return `${d}-${m}-${y}`;
};

module.exports.failed = (data) => {
  const filterData = data.filter(({ status }) => status === 'failed');
  console.log(filterData.map(({ web_url }) => web_url));
};

module.exports.status = ({ data, username, projectId, fileName }) => {
  const total = data.length;
  const success = data.reduce(
    (acc, cur) => (cur.status === 'success' ? ++acc : acc),
    0
  );

  const output = `Date: ${formattedDate()}, Successful: ${success}, Failed/Cancelled: ${
    total - success
  }, Total: ${total}`;

  writeAsCsv({ data, username, projectId, fileName });

  console.log(output);
};
