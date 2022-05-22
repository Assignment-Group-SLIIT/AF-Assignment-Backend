
const Submission = require('../models/submission.model')

const addSubmission = async (req, res) => {

    const submissionId = req.body.submissionId;
    const submissionType = req.body.submissionType;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const markingSchema = req.body.markingSchema;

    const newSubmission = new Submission({
        submissionId,
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

const updateSubmission = async (req, res) => {

    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: "Invalid Request" });
    }
    const {
        submissionType,
        startDate,
        endDate,
        markingSchema
    } = req.body;

    let udpdateSubmissionData = {
        submissionId: id,
        submissionType,
        startDate,
        endDate,
        markingSchema
    }

    try {

        let response = await Submission.findOneAndUpdate({ submissionId: id }, udpdateSubmissionData);
        if (response) {
            return res.status(200).send({ status: "submission updated successfully" });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const deleteSubmission = async (req, res) => {
    const Id = req.params.id;
    if (!Id) {
        return res.status(400).send({ message: "Invalid Request" });
    }

    try {
        await Submission.findOneAndDelete({ submissionId: Id });
        return res.status(200).send({ status: "submission deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }


}

const getOneSubmission = async (req, res) => {
    let id = req.params.id;
    try {
        let response = await Submission.findOne({ submissionId: id });
        if (response) {
            return res.json(response);
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}


module.exports = { addSubmission, getAllSubmissions, updateSubmission, deleteSubmission, getOneSubmission }