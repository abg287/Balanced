// Initialization

  // Require modules
  const express = require( "express" );
  const bodyParser = require( "body-parser" );
  const mongoose = require( "mongoose" );

  // Create app
  const app = express();

  // Get port
  const PORT = process.env.PORT || 8080;

  // Get URL and database
  const url = "";
  const database = "";

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( express.static( "build" ) );
  // mongoose.connect( url + database ); // Not created yet


  
// OTHER

    // Console listening to a port
    app.listen( PORT, () => {
        console.log( "Server has started successfully at port " + PORT );
    });