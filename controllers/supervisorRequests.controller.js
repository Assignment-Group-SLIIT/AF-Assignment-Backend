const SupervisorRequestList = require('../models/supervisorRequests.model');

const createSupervisorRequest = async (req, res) => {

    const groupId = req.body.groupId;
    const email = req.body.email;
    const researchTopic = req.body.researchTopic;
    const researchField = req.body.researchField;
    const supervisor = req.body.supervisor;


    const supervisorRequest = new SupervisorRequestList({
        groupId,
        email,
        researchTopic,
        researchField,
        supervisor
    })

    try {
        let response = await supervisorRequest.save();
        if (response) {
            return res.status(201).send({ message: 'New Request Sent to the Supervisor' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Error while sending request to the Supervisor' })
    }

}

const getAllRequestsofSupervisor = async (req, res) => {

    const supervisor = req.params.name;

    try {
        let supervisorRequests = await SupervisorRequestList.find({
            supervisor: supervisor
        });
        if (supervisorRequests) {
            return res.json(supervisorRequests)
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Error on retrieving request list of supervisors' })
    }
}

const getAllRequests = async (req, res) => {

    try {

        let supervisorRequests = await SupervisorRequestList.find();
        if (supervisorRequests) {
            return res.json(supervisorRequests)
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(404).send({ message: 'Error on retrieving request list of supervisors' })
    }
}

const updateSupervisorRequest = async (req, res) => {

    const groupId = req.params.id;

    const updateSupervisorRequest = {
        groupId: req.body.groupId,
        email: req.body.email,
        researchTopic: req.body.researchTopic,
        researchField: req.body.researchField,
        supervisor: req.body.supervisor
    }

    try {
        const response = await SupervisorRequestList.findOneAndUpdate({ groupId: groupId }, updateSupervisorRequest)
        if (response) {
            return res.status(200).send({ message: 'Successfully updated Supervisor request' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

const deleteSupervisorRequest = async (req, res) => {
    const groupId = req.params.id;

    try {
        const user = await SupervisorRequestList.findOneAndDelete({ groupId: groupId });
        if (user) {
            return res.status(204).send({ message: 'Successfully deleted A Request' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Could not delete the request' })
    }

}

module.exports = {
    createSupervisorRequest,
    getAllRequestsofSupervisor,
    getAllRequests,
    updateSupervisorRequest,
    deleteSupervisorRequest
}
