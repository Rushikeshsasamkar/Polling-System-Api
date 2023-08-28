// Import the required modules
const exp = require("constants"); // This import is not used in the code
const express = require("express");
const router = express.Router();

// Import the option controller module
const optionController = require("../controllers/option_controller");

// Define a route to add a vote to a specific option using POST method
// The :id parameter in the route will be replaced with the option's ID
router.post("/:id/add_vote", optionController.addVote);

// Define a route to delete a specific option using GET method
// The :id parameter in the route will be replaced with the option's ID
router.get("/:id/delete", optionController.deleteOption);

// Export the router to make it available to other parts of the application
module.exports = router;
