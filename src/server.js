// Initialization

  import express from "express";
  import webpack from 'webpack';
  import webpackConfig from '../webpack.config.cjs';
  import webpackHotMiddleware from 'webpack-hot-middleware';
  import historyApiFallback from 'connect-history-api-fallback';
  import webpackDevMiddleware from 'webpack-dev-middleware';

  // Require modules
  // const bodyParser = require( "body-parser" );
  // const mongoose = require( "mongoose" );

  // Create app
  const app = express();

  // Get port
  const HOST = process.env.SERVER_HOST;
  const PORT = process.env.SERVER_PORT;

  // Get URL and database
  const url = "";
  const database = "";

 

  // Logging middleware
  app.use((req, res, next) => {
    console.log('-------------------------------------');
    console.log(`Request: ${req.method} ${req.url}`);
    return next();
  });

  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: true,
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: (context) => context.parsedUrl.path
      }
    ]
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler, {}));

  // Add api routes
  const ApiRouter = express.Router();
  ApiRouter.get('/home', (req, res) => {
    return res.json({message: 'Home Page'});
  });
  ApiRouter.get('/add-meals', (req, res) => {
    return res.json({message: 'Add Meals Page'});
  });
  ApiRouter.get('/physical-data', (req, res) => {
    return res.json({message: 'Physical Data Page'});
  });
  ApiRouter.get('/recommendations', (req, res) => {
    return res.json({message: 'Recommendations Page'});
  });
  // ApiRouter.get('*', (req, res) => {
  //   return res.json({message: 'This is Express! Here are the contacts!'});
  // });
  app.use('/api', ApiRouter);

  // app.use( bodyParser.json() );
  // app.use( bodyParser.urlencoded( { extended: true } ) );
  // app.use( express.static( "build" ) );
  // app.get('*', (req, res) => {
  //   res.sendFile("index.html", {root: "build"});
  // });
  // mongoose.connect( url + database ); // Not created yet


  
// OTHER

    // Console listening to a port
    app.listen(PORT, HOST, () => {
      console.log(`Server started listening on ${HOST}:${PORT}`);
    });