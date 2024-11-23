// Initializationf
import express from "express";
import webpack from 'webpack';
import webpackConfig from '../webpack.config.cjs';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { Food, User } from "./models.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Create app
const app = express();

// Get port
const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 8080;

// Get URL and database
const url = "mongodb+srv://admin:pass@atlascluster.wzdy0ju.mongodb.net/";
const database = "BalancedDB";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(url + database);

// Logging middleware
app.use((req, res, next) => {
  console.log('-------------------------------------');
  console.log(`Request: ${req.method} ${req.url}`);
  return next();
});

const compiler = webpack(webpackConfig);

// ---- BACKEND ROUTES ----
// Estas rutas deben estar antes de `historyApiFallback`
// app.get('/food', (req, res) => {
//   const foodName = req.params.name;

//   Food.findOne({ name: foodName })
//     .then(food => {
//       if (!food) {
//         return res.status(404).json({ message: "Food not found" });
//       }
//       res.status(200).json(food); // Devuelve el alimento con sus reseñas
//     })
//     .catch(err => res.status(500).json({ message: "Error fetching food", error: err }));
// });

// app.post('/add-review', (req, res) => {
//   const { foodName, userName, rating, comment } = req.body;

//   if (!foodName || !userName || !rating) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   Food.findOne({ name: foodName })
//     .then(food => {
//       if (!food) {
//         return res.status(404).json({ message: "Food not found" });
//       }

//       const newReview = {
//         userName,
//         rating,
//         comment
//       };

//       food.reviews.push(newReview);

//       food.save()
//         .then(updatedFood => res.status(200).json({ message: "Review added successfully", food: updatedFood }))
//         .catch(err => res.status(500).json({ message: "Error saving review", error: err }));
//     })
//     .catch(err => res.status(500).json({ message: "Error finding food", error: err }));
// });

// Otros endpoints de tu API...
const ApiRouter = express.Router();
ApiRouter.get('/home', (req, res) => {
  Food.find()
    .then(foods => res.json(foods));
});

ApiRouter.get('/add-food', (req, res) => {
  return res.json({ message: 'Add Food Page' });
});

ApiRouter.get('/physical-data', (req, res) => {
  User.find()
    .then(users => res.json(users));
});

ApiRouter.get('/recommendations', (req, res) => {
  return res.json({ message: 'Recommendations Page' });
});

app.use('/api', ApiRouter);

// ---- FRONTEND MIDDLEWARES ----
// Estos middlewares deben estar al final
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

// Console listening to a port
app.listen(PORT, HOST, () => {
  console.log("Server started listening on", HOST, ":", PORT)
}); 