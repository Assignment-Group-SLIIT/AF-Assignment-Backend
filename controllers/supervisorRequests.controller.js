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
        return res.status(400).send({ message: 'Error on retrieving users' })
    }
}

module.exports = {
    createSupervisorRequest,
    getAllRequestsofSupervisor
}
