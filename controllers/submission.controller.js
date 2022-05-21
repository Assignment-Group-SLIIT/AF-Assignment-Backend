const { response } = require('express');
const Submission = require('../models/submission.model')

const addSubmission = async (req, res) => {
    console.log("reqqqq>>", req.body)

    const submissionID = req.body.submissionID;
    const submissionType = req.body.submissionType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const markingSchema = req.body.markingSchema;

    const newSubmission = new Submission({
        submissionID,
        submissionType,
        startDate,
        endDate,
        markingSchema
    })
    try {
        let response = await newSubmission.save();
        if (response) {
            return res.status(201).send({ message: 'new submission added' });
        } else {
            return res.status(500).send({ message: 'Internal Server Error!!' });
        }
    } catch (err) {
        console.log("errr>>", err)
        return res.status(400).send({ message: 'error while adding a submission' });
    }
}

const getAllSubmissions = async (req, res) => {
    try {
        let response = await Submission.find();
        if (response) {
            return res.json(response);
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}




module.exports = { addSubmission, getAllSubmissions }