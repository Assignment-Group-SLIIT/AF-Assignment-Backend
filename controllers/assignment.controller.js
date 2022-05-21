const Assignment = require('../models/assignment.model');

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
    const Id = req.query.id;
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
            await Assignment.findOneAndUpdate({ submissionId: Id }, assignmentPayload)
            return res.status(200).send({ status: "assignment Successfully updated!" });
        } catch (err) {
            return res.status(500).send({ status: "Internal Server Error" });
        }
    }
    return res.status(400).send({ status: "Invalid Request" });
}

const deleteAssignment = async (req, res) => {
    const Id = req.query.id;
    // console.log("assignment id>>", Id,);

    if (Id) {
        await newAssignment.findOneAndDelete({ submissionId: Id }).then(() => {
            return res.status(200).send({ status: "assignment deleted successfully" });
        }).catch((err) => {
            return res.status(500).send({ message: "Internal Server Error" });
        })
    }
    return res.status(400).send({ message: "Invalid Request" });
}

module.exports = {
    createAssignment,
    getAllAssignment,
    updateAssignment,
    deleteAssignment
}

