const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const bodyParser = require('body-parser');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
    silent: true,
    stats: 'errors-only'
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(compiler, webpackConfig.output.publicPath);


  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  const fileSystemRoot = 
  app.post('/file-system', (req, res) => {
    const relpath = req.body.path;
    console.log('compiler', compiler);
    console.log('look', path.join(compiler.outputPath, relpath));
    fs.readdir( path.join(compiler.outputPath, relpath), (error, items)=>{
      console.log('READ DIR', items);
      res.send(JSON.stringify({
        files: [],
        directories: []
      }));
    });
  })
};
