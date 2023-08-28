const Questions = require("../models/question");
const Options = require("../models/option");

module.exports.front = async function (req, res) {
    try {
        // Attempt to find all the questions and populate their associated options
        let question = await Questions.find({}).populate({
            path: "option",
        });

        if (question) {
            // If questions are found, send a success response with the questions data
            return res.status(200).json({
                message: "Here are the questions",
                data: question,
            });
        } else {
            // If no questions are found, send a response indicating that questions don't exist
            return res.status(400).json({
                message: "Questions do not exist",
            });
        }
    } catch (err) {
        // If an error occurs during the process, send an error response
        return res.status(500).json({
            message: "Server error",
            data: err,
        });
    }
};
