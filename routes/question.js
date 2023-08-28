// Import the required modules
const express = require("express");
const router = express.Router();

// Import the question controller module
const questionController = require("../controllers/question_controller");

// Define a route to create a new question using POST method
router.post("/create", questionController.create);

// Define a route to delete a specific question along with its options using GET method
// The :id parameter in the route will be replaced with the question's ID
router.get("/:id/delete", questionController.deleteQuestion);

// Define a route to add options to a specific question using POST method
// The :id parameter in the route will be replaced with the question's ID
router.post("/:id/options/create", questionController.addOptions);

// Define a route to retrieve a specific question along with all its options using GET method
// The :id parameter in the route will be replaced with the question's ID
router.get("/:id", questionController.showAllQuestions);

// Export the router to make it available to other parts of the application
module.exports = router;
