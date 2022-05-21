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
        let response =  await newCoSupervisorRequest.save();
        if(response) {
            return res.status(201).send({message: "Register topic to co-supervisor"})
        }else {
            return res.status(500).send({message: "Internal server error"})
        }
    }catch(err) {
        return res.status(400).send({message: 'error while register topic'})
    }

}


module.exports = {
    createCoSupervisorRequest
}
