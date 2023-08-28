const Questions = require("../models/question");
const Options = require("../models/option");

// Functionality to create a question in the database
module.exports.create = async function (req, res) {
  try {
    // Create a new question with the provided title and vote status
    const question = await Questions.create({ title: req.body.title, vote: false });
    return res.status(200).json({
      message: "Question Created",
      data: question,
    });
  } catch (err) {
    // If an error occurs during question creation, send an error response
    return res.status(500).json({
      message: "Question is not created",
      data: err,
    });
  }
};

// Functionality to delete a question from the database with all its options
module.exports.deleteQuestion = async function (req, res) {
  try {
    // Find and delete the question by its ID
    await Questions.findByIdAndDelete(req.params.id);
    
    // Delete all options associated with the deleted question
    await Options.deleteMany({ question: req.params.id });
    
    // Send a success response after deleting question and options
    return res.status(200).json({
      message: "Question and options deleted successfully",
    });
  } catch (err) {
    // If an error occurs during question or options deletion, send an error response
    return res.status(500).json({
      message: "Could not delete question and options",
      data: err,
    });
  }
};

// Functionality to add options to a question
module.exports.addOptions = async function (req, res) {
  try {
    // Find the question by its ID
    const question = await Questions.findById(req.params.id);
    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    // Create a new option with provided details
    const id = question.option.length + 1;
    const optionCreated = await Options.create({
      id: question.option.length + 1,
      question: req.params.id,
      text: req.body.text,
      votes: 0,
      link: `http://localhost:8000/options/${id}/add_vote`,
    });

    // Add the newly created option's ID to the question's options list
    await Questions.updateOne(
      { _id: req.params.id },
      { $push: { option: optionCreated._id } }
    );

    // Send a success response indicating question and option update
    return res.status(200).json({
      message: "Question and Option Updated",
    });
  } catch (err) {
    // If an error occurs during the process, send an error response
    return res.status(500).json({
      message: "Error from the server",
      data: err,
    });
  }
};

// Functionality to show all full questions with all their options
module.exports.showAllQuestions = async function (req, res) {
  try {
    // Find the question by its ID and populate its options
    let question = await Questions.findById(req.params.id).populate({
      path: "option",
    });

    if (question) {
      // Send a response with the question and its options
      return res.status(200).json({
        message: "Here is the questions",
        data: question,
      });
    } else {
      // If question not found, send a 400 response
      return res.status(400).json({
        message: "Question does not exist",
      });
    }
  } catch (err) {
    // If an error occurs during the process, send an error response
    return res.status(500).json({
      message: "Error from the server",
      data: err,
    });
  }
};
