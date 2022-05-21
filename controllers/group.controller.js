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
    const gid = req.params.groupId;

    await Group.findOneAndDelete({ id: gid})
        .then(() => {
           return res.status(200).send({ status: "student group deleted" });
        }).catch((err) => {
           return  res.status(500).send({ status: "Error with deleting group record"});
        })
}



module.exports = {
    createGroup,
    getAllGroup,
    removeGroup
}
