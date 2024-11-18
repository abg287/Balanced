// Initialization
import dotenv from 'dotenv';
dotenv.config();

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
const PORT = process.env.SERVER_PORT || "8080";

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

app.post("/add-food", (req, res) => {
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
  });

  Food.findOne({ name: name })
    .then((foundFood) => {
      if (!foundFood) {
        food.save();
      }
    });
});

app.post("/physical-data", (req, res) => {
  const { userName, height, weight, age, gender, activityLevel } = req.body;

  const filter = { userName: userName };

  const update = { $set: { height: height, weight: weight, age: age, gender: gender, activityLevel: activityLevel } };

  User.updateOne(filter, update)
    .then(res => console.log(res));
});

app.delete("/food", (req, res) => {
  const { name } = req.body;
  console.log(name);

  Food.findOneAndDelete({ name: name })
    .then(deletedFood => {
      if (deletedFood) {
        console.log("Food was deleted successfully");
        res.status(200).json({ message: "Food deleted successfully", deletedFood });
      } else {
        console.log("Food was not deleted");
        res.status(404).json({ message: "Food item not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error deleting food item" });
    });
});

// Add review route
app.post('/add-review', (req, res) => {
  const { foodName, userName, rating, comment } = req.body;

  // Validar que los campos necesarios estén presentes
  if (!foodName || !userName || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Buscar la comida en la base de datos
  Food.findOne({ name: foodName })
    .then(food => {
      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }

      // Crear una nueva reseña
      const newReview = {
        userName,
        rating,
        comment
      };

      // Agregar la reseña al array de reseñas
      food.reviews.push(newReview);

      // Guardar los cambios
      food.save()
        .then(updatedFood => res.status(200).json({ message: "Review added successfully", food: updatedFood }))
        .catch(err => res.status(500).json({ message: "Error saving review", error: err }));
    })
    .catch(err => res.status(500).json({ message: "Error finding food", error: err }));
});

// OTHER
app.get('/food/:name', (req, res) => {
  const foodName = req.params.name; // Extrae el nombre del alimento de los parámetros

  Food.findOne({ name: foodName }) // Busca el alimento en la base de datos
      .then(food => {
          if (!food) {
              return res.status(404).json({ message: "Food not found" });
          }
          res.status(200).json(food); // Devuelve la información del alimento con sus reseñas
      })
      .catch(err => res.status(500).json({ message: "Error fetching food", error: err }));
});
// Console listening to a port
app.listen(PORT, HOST, () => {
  console.log(`Server started listening on ${HOST}:${PORT}`);
});
