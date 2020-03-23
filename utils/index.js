const fs = require('fs');

const toCsv = (dataToWrite, username) => {
  const writeStream = fs.createWriteStream(`${username}.csv`);

  let line = [];

  line.push(dataToWrite);

  writeStream.write(line.join(', '), (err) => {
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


module.exports.status = (data, username) => {
  const total = data.length;
  const success = data.reduce(
    (acc, cur) => (cur.status === 'success' ? ++acc : acc),
    0
  );

  const output = `Date: ${formattedDate()}, Successful: ${success}, Failed/Cancelled: ${total - success}, Total: ${total}`;

  toCsv(output, username);

  console.log(output);
};
