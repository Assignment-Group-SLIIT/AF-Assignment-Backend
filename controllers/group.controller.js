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

const getAllGroup = async(req , res) => {
    try {
        let response = await Group.find();
        if(response){
            return res.status(200).send({message:"get all registered group" , data:response})
        }else{
            return res.status(500).send({message:"Internal server error"})
        }
    }catch(error){
        return res.status(400).send({message:"error while getting all group"})
    }
}

const removeGroup = async (req,res) => {
    let groupId = req.params.id;
    try {
        const response = await Group.findOneAndDelete({ groupId: groupId });
        if (response) {
            return res.status(204).send({ message: 'Successfully deleted a Group' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Could not delete the Group' })
    }
}

const getOneGroup = async (req , res) => {
    const groupId = req.params.id;
    try {
        let response = await Group.findOne({ groupId: groupId });
        if (response) {
            return res.json(response)
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(404).send({ message: 'No such request available' })
    }
}


const updateGroup = async (req, res) => {

    const groupId = req.params.id;

    const updateGroup = {
     groupId : req.body.groupId,
     student : req.body.student,
     supervisor : req.body.supervisor,
	 coSupervisor : req.body.coSupervisor,
     researchTopic : req.body.researchTopic,
     researchField : req.body.researchField,
     panelNo : req.body.panelNo
    }

    try {
        const response = await Group.findOneAndUpdate({ groupId: groupId }, updateGroup)
        if (response) {
            return res.status(200).send({ message: 'Successfully updated group request' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Unable to update group request' })
    }

}


module.exports = {
    createGroup,
    getAllGroup,
    removeGroup,
    getOneGroup,
    updateGroup
}
