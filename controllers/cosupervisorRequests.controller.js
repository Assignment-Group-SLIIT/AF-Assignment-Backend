const CoSupervisorRequest = require('../models/cosupervisorRequests.model');

const createCoSupervisorRequest = async (req, res) => {
    const groupId = req.body.groupId;
    const email = req.body.email;
    const researchTopic = req.body.researchTopic;
    const researchField = req.body.researchField;
    const coSupervisor = req.body.coSupervisor;

    const newCoSupervisorRequest = new CoSupervisorRequest({
        groupId,
        email,
        coSupervisor,
        researchTopic,
        researchField
    })

    try {
        let response = await newCoSupervisorRequest.save();
        if (response) {
            return res.status(201).send({ message: "Register topic to co-supervisor" })
        } else {
            return res.status(500).send({ message: "Internal server error" })
        }
    } catch (err) {
        return res.status(400).send({ message: 'error while register topic' })
    }

}

const getAllRequestTopic = async (req, res) => {
    try {
        let response = await CoSupervisorRequest.find();
        if (response) {
            return res.status(200).send({ message: "get all request topic", data: response })
        } else {
            return res.status(500).send({ message: "Internal server error" })
        }
    } catch (error) {
        return res.status(400).send({ message: "error while getting request topic" })
    }
}

const getAllRequestsofCoSupervisor = async (req, res) => {

    const cosupervisor = req.params.name;

    try {
        let response = await CoSupervisorRequest
        .find({supervisor: cosupervisor});
        if (response) {
            return res.json(response)
        } else {
            return res.status(404).send({ message: 'Error on retrieving request list of Co-supervisors' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}


const getOneRequest = async (req, res) => {

    const groupId = req.params.id;

    try {
        let response = await CoSupervisorRequest.findOne({ groupId: groupId });
        if (response) {
            return res.json(response)
        } else {
            return res.status(404).send({ message: 'No such request available' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateCoSupervisorRequest = async (req, res) => {

    const groupId = req.params.id;

    const updateCoSupervisorRequest = {
         groupId  :req.body.groupId,
         email : req.body.email,
         researchTopic : req.body.researchTopic,
         researchField : req.body.researchField,
         coSupervisor : req.body.coSupervisor
    }

    try {
        const response = await CoSupervisorRequest.findOneAndUpdate({ groupId: groupId }, updateCoSupervisorRequest)
        if (response) {
            return res.status(200).send({ message: 'Successfully updated Supervisor request' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Unable to update' })
    }

}

const deleteCoSupervisorRequest = async (req, res) => {
    const groupId = req.params.id;

    try {
        const response = await CoSupervisorRequest.findOneAndDelete({ groupId: groupId });
        
        if (response) {
            return res.status(200).send({ message: 'Successfully deleted a Request' });
            
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        console.log(err.message)
        return res.status(400).send({ message: 'Could not delete the request' })
    }

}

module.exports = {
    createCoSupervisorRequest,
    getAllRequestTopic,
    getAllRequestsofCoSupervisor,
    getOneRequest,
    updateCoSupervisorRequest,
    deleteCoSupervisorRequest
}
