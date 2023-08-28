const Options = require("../models/option");
const Questions = require("../models/question");

// Functionality to add vote to a particular option
module.exports.addVote = async function (req, res) {
  try {
    const option = await Options.findById(req.params.id);
    if (!option) {
      return res.status(404).json({
        message: "Option not found",
      });
    }

    const currentVote = option.votes + 1;
    option.votes = currentVote;
    await option.save();

    return res.status(200).json({
      message: "Option votes updated",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error updating option votes",
      error: err.message,
    });
  }
};

// Functionality to delete a particular option of a question
module.exports.deleteOption = async function (req, res) {
  try {
    const option = await Options.findById(req.params.id);
    if (!option) {
      return res.status(404).json({
        message: "Option not found",
      });
    }

    // Note: The code to remove the option from the question is commented out
    // since it's not clear how your schema and relationships are defined.

    const deletedOption = await Options.findByIdAndDelete(req.params.id);

    if (!deletedOption) {
      return res.status(500).json({
        message: "Option cannot be deleted",
      });
    }

    return res.status(200).json({
      message: "Option deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting option",
      error: err.message,
    });
  }
};
