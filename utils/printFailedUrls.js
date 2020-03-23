module.exports = (data) => {
  const filterData = data.filter(({ status }) => status === 'failed');
  console.log(filterData.map(({web_url}) => web_url));
};
