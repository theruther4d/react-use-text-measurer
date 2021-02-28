const connect = require('connect');
const serveStatic = require('serve-static');
const {copyFile} = require('fs/promises');
const {resolve} = require('path');

(async () => {
  await copyFile(
    resolve(__dirname, './index.html'),
    resolve(__dirname, '../dist/index.html')
  );

  connect()
    .use(serveStatic(resolve(__dirname, '../dist/')))
    .listen(8080, () => {
      console.log('Server running on 8080...');
    });
})();
