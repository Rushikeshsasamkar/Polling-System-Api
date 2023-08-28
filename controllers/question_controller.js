const Questions = require("../models/question");
const Options = require("../models/option");

// functionality to create a question in the database
module.exports.create = async function (req, res) {
  try {
    const question = await Questions.create({ title: req.body.title, vote: false });
    return res.status(200).json({
      message: "Question Created",
      data: question,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Question is not created",
      data: err,
    });
  }
};

// functionality to delete a question from the database with all its options
module.exports.deleteQuestion = async function (req, res) {
  try {
    await Questions.findByIdAndDelete(req.params.id);
    await Options.deleteMany({ question: req.params.id });
    return res.status(200).json({
      message: "Question and options deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Could not delete question and options",
      data: err,
    });
  }
};

// functionality to add options to a question
module.exports.addOptions = async function (req, res) {
  try {
    const question = await Questions.findById(req.params.id);
    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const id = question.option.length + 1;
    const optionCreated = await Options.create({
      id: question.option.length + 1,
      question: req.params.id,
      text: req.body.text,
      votes: 0,
      link: `http://localhost:8000/options/${id}/add_vote`,
    });

    await Questions.updateOne(
      { _id: req.params.id },
      { $push: { option: optionCreated._id } }
    );

    return res.status(200).json({
      message: "Question and Option Updated",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server",
      data: err,
    });
  }
};

// functionality to show all full question with all its options
module.exports.showAllQuestions = async function (req, res) {
  try {
    // finding all the questions and returning
    let question = await Questions.findById(req.params.id).populate({
      path: "option",
    });

    if (question) {
      return res.status(200).json({
        message: "Here is the questions",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server",
      data: err,
    });
  }
};
