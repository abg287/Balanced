// Initialization

  import express from "express";
  import webpack from 'webpack';
  import webpackConfig from '../webpack.config.cjs';
  import webpackHotMiddleware from 'webpack-hot-middleware';
  import historyApiFallback from 'connect-history-api-fallback';
  import webpackDevMiddleware from 'webpack-dev-middleware';
  import { Food } from "./models.js";
  import mongoose from "mongoose";
  import bodyParser from "body-parser";

  // Create app
  const app = express();

  // Get port
  const HOST = process.env.SERVER_HOST;
  const PORT = process.env.SERVER_PORT;

  // Get URL and database
  const url = "mongodb+srv://admin:pass@atlascluster.wzdy0ju.mongodb.net/";
  const database = "BalancedDB";

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  mongoose.connect( url + database );

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
  ApiRouter.get('/add-food', (req, res) => {
    return res.json({message: 'Add Food Page'});
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

  
  app.post( "/submit", ( req, res ) => {
    const { name, calories, totalFat, saturatedFat, polyunsaturatedFat, monounsaturatedFat, transFat, cholesterol, sodium, potassium, totalCarbs, dietaryFiber, sugars, protein, vitaminA, vitaminC, calcium, iron } = req.body;
    const food = new Food({
      name: name,
      calories: calories,
      totalFat: totalFat,
      saturatedFat: saturatedFat,
      polyunsaturatedFat: polyunsaturatedFat,
      monounsaturatedFat: monounsaturatedFat,
      transFat: transFat,
      cholestorol: cholesterol,
      sodium: sodium,
      potassium: potassium,
      totalCarbs: totalCarbs,
      dietaryFiber: dietaryFiber,
      sugars: sugars,
      protein: protein,
      vitaminA: vitaminA,
      vitaminC: vitaminC,
      calcium: calcium,
      iron: iron
    })

    Food
      .findOne( { name: name } )
      .then( ( foundFood ) => {
        if ( !foundFood ) {
          food.save();
        }
      })
  });

  
// OTHER

    // Console listening to a port
    app.listen(PORT, HOST, () => {
      console.log(`Server started listening on ${HOST}:${PORT}`);
    });