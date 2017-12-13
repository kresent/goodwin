const path = require('path');
// eslint-disable-next-line dependencies/no-unresolved
const selenium = require('selenium-download');

selenium.ensure(path.resolve(__dirname, '../..'), error => {
  if (error) console.error(error.stack);
  process.exit(0);
});
