const toCsv = require('./toCsv');
const formattedDate = require('./getFormattedDate');

module.exports = (data, username) => {
  const total = data.length;
  const success = data.reduce(
    (acc, cur) => (cur.status === 'success' ? ++acc : acc),
    0
  );

  const combined = `Date: ${formattedDate()}, Successful: ${success}, Failed/Cancelled: ${total - success}, Total: ${total}`;

  toCsv(combined, username);

  console.log(combined);
};
