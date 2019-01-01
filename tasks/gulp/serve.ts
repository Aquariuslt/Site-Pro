import * as logger from 'fancy-log';
import * as gulp from 'gulp';
import * as opn from 'opn';
import * as webpack from 'webpack';
import * as http from 'http';
import * as handler from 'serve-handler';
import * as addEntries from 'webpack-dev-server/lib/utils/addEntries';

import * as WebpackDevServer from 'webpack-dev-server';

import {webpackDevConfig} from '../webpack/webpack.dev';
import * as packageJson from '../../package.json';

import ipUtil from '../utils/ip-util';

const baseConfig = packageJson.config.base;

const LOCAL_IP = '127.0.0.1';
const LAN_IP = ipUtil.getLanIp();

gulp.task('serve', () => {
  logger.info('Webpack building.');
  addEntries(webpackDevConfig, webpackDevConfig.devServer);
  const compilerConfig = webpack(webpackDevConfig);
  new WebpackDevServer(compilerConfig, webpackDevConfig.devServer).listen(webpackDevConfig.devServer.port, webpackDevConfig.devServer.host, (error) => {
    if (error) {
      logger.error('Webpack build error:', error);
    }
    const AUTO_OPEN_URL = 'http://' + LOCAL_IP + ':' + baseConfig.dev.port;
    const LAN_URL = 'http://' + LAN_IP + ':' + baseConfig.dev.port;
    logger.info('You can visit at below urls:');
    logger.info('Local: ', AUTO_OPEN_URL);
    logger.info('Network:', LAN_URL);
    opn(AUTO_OPEN_URL);
  });
});

gulp.task('serve:prod', () => {
  logger.info('Serve production assets files.');
  const PROD_PORT = baseConfig.dev.port + 1;
  const server = http.createServer((res, req) => {
    return handler(res, req, {
      public: baseConfig.dir.dist.root
    });
  });

  server.listen(PROD_PORT, () => {
    const AUTO_OPEN_URL = 'http://' + LOCAL_IP + ':' + PROD_PORT;
    const LAN_URL = 'http://' + LAN_IP + ':' + PROD_PORT;
    logger.info('You can visit at below urls:');
    logger.info('Local: ', AUTO_OPEN_URL);
    logger.info('Network:', LAN_URL);
    opn(AUTO_OPEN_URL);
  });
});