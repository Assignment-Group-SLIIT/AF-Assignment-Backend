const Group = require('../models/group.model');

const createGroup = async (req, res) => {
    const groupId = req.body.groupId;
    const student = req.body.student;
    const supervisor = req.body.supervisor;
	const coSupervisor = req.body.coSupervisor;
    const researchTopic = req.body.researchTopic;
    const researchField = req.body.researchField;
    const panelNo = req.body.panelNo;
        
    const newGroup = new Group({
        groupId,
        student,
        supervisor,
        coSupervisor,
        researchTopic,
        researchField,
        panelNo
    })

    try {
        let response =  await newGroup.save();
        if(response) {
            return res.status(201).send({message: "new student group created"})
        }else {
            return res.status(500).send({message: "Internal server error"})
        }
    }catch(err) {
        return res.status(400).send({message: 'error while adding a group'})
    }

}

module.exports = {
    createGroup
}
