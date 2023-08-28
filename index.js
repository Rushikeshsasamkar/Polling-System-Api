// Import the required modules
const express = require('express');
const app = express(); // Create an Express app instance
const db = require('./config/mongoose'); // Import the mongoose configuration

app.use(express.urlencoded()); // Middleware to parse request body data

// Use the routes defined in the 'routes' module
app.use('/', require('./routes'));

const port = 8000; // Port to listen on

// Start the server and listen on the specified port
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in connecting to the database: ${err}`);
        return;
    }
    console.log(`Server is running at port ${port}`);
});
