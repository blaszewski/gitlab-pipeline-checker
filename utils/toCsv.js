const fs = require('fs');

module.exports = (dataToWrite, username) => {
  const writeStream = fs.createWriteStream(`csv/${username}.csv`);

  let newLine = [];

  newLine.push(dataToWrite);

  writeStream.write(newLine.join(', '), (err) => {
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
