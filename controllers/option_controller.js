const Options = require("../models/option");
const Questions = require("../models/question");

// Functionality to add vote to a particular option
module.exports.addVote = async function (req, res) {
  try {
    // Find the option using the provided ID
    const option = await Options.findById(req.params.id);
    if (!option) {
      // If option not found, send a 404 response
      return res.status(404).json({
        message: "Option not found",
      });
    }

    // Increment the votes count for the option and save it
    const currentVote = option.votes + 1;
    option.votes = currentVote;
    await option.save();

    // Send a success response indicating option votes updated
    return res.status(200).json({
      message: "Option votes updated",
    });
  } catch (err) {
    // If an error occurs during the process, send an error response
    return res.status(500).json({
      message: "Error updating option votes",
      error: err.message,
    });
  }
};

// Functionality to delete a particular option of a question
module.exports.deleteOption = async function (req, res) {
  try {
    // Find the option using the provided ID
    const option = await Options.findById(req.params.id);
    if (!option) {
      // If option not found, send a 404 response
      return res.status(404).json({
        message: "Option not found",
      });
    }

    // Note: The code to remove the option from the question is commented out
    // since it's not clear how your schema and relationships are defined.

    // Delete the option and get the deleted option details
    const deletedOption = await Options.findByIdAndDelete(req.params.id);

    if (!deletedOption) {
      // If option cannot be deleted, send a 500 response
      return res.status(500).json({
        message: "Option cannot be deleted",
      });
    }

    // Send a success response indicating option deleted successfully
    return res.status(200).json({
      message: "Option deleted successfully",
    });
  } catch (err) {
    // If an error occurs during the process, send an error response
    return res.status(500).json({
      message: "Error deleting option",
      error: err.message,
    });
  }
};
