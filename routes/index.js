const express = require("express");
const router = express.Router();

// Create an instance of the Express application
const app = express();

// Log a message indicating that the router is loaded
console.log("router loaded");

// Import the home controller module
const homeController = require("../controllers/home_controller");

// Define a route for the homepage ("/") that maps to the 'front' function in homeController
router.get("/", homeController.front);

// Use the '/question' and '/option' sub-routers for specific routes
router.use("/question", require("./question"));
router.use("/option", require("./option"));

// Export the router to make it available to other parts of the application
module.exports = router;
