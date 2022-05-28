const Assignment = require('../models/assignment.model');
const sendEmail = require('./thirdpartyapis');

const createAssignment = async (req, res) => {

    const {
        groupId,
        submissionId,
        submissionType,
        document,
        evaluationStatus,
        marks,
    } = req.body;

    const newAssignment = new Assignment({
        groupId,
        submissionId,
        submissionType,
        document,
        evaluationStatus,
        marks,
    })

    try {
        let response = await newAssignment.save();
        if (response) {
            return res.status(201).send({ message: 'new assignment added' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'error while adding a assignment' })
    }

}

const getAllAssignment = async (req, res) => {
    try {
        const response = await Assignment.find();
        return res.status(200).send({ data: response });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const updateAssignment = async (req, res) => {
    // const Id = req.query.id;
    const Id = req.params.id;
    // console.log("assignment id>>", Id,);

    const {
        groupId,
        submissionId,
        submissionType,
        document,
        evaluationStatus,
        marks,
    } = req.body;

    const assignmentPayload = {
        groupId,
        submissionId,
        submissionType,
        document,
        evaluationStatus,
        marks,
    }

    if (Id) {
        try {
            await Assignment.findOneAndUpdate({ submissionId: Id }, assignmentPayload);
            return res.status(200).send({ status: "assignment Successfully updated!" });
        } catch (err) {
            return res.status(500).send({ status: "Internal Server Error" });
        }
    }
    return res.status(400).send({ status: "Invalid Request" });
}

const deleteAssignment = async (req, res) => {
    // const Id = req.query.id;
    const Id = req.params.id;
    // console.log("assignment id>>", Id,);

    if (Id) {
        try {
            await Assignment.findOneAndDelete({ submissionId: Id })
            return res.status(200).send({ status: "assignment deleted successfully" });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
    return res.status(400).send({ message: "Invalid Request" });
}

const sendPresentationEmail = async (req, res) => {

    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;

    // console.log(email, name, message)

    try {
        if (sendEmail(email, name, message)) {
            return res.status(200).send({ status: "Presentation Email sent successfully" });
        }


    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}


const getAllAssignmentForGroup = async (req, res) => {
    const groupId = req.params.id;
    // console.log(groupId)
    try {
        const response = await Assignment.find({ groupId: groupId });
        if (response) {
            return res.status(200).send(response);
        } else {
            return res.status(404).send({ message: 'No result found' });
        }

    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = {
    createAssignment,
    getAllAssignment,
    updateAssignment,
    deleteAssignment,
    sendPresentationEmail,
    getAllAssignmentForGroup
}

