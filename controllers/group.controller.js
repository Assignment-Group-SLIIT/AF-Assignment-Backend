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
    let gid = req.params.groupId;
    console.log(gid)
    await Group.findOneAndDelete({ id: gid})
        .then(() => {
           return res.status(200).send({ status: "student group deleted" });
        }).catch((err) => {
           return  res.status(500).send({ status: "Error with deleting group record"});
        })
}

const getOneGroup = async (req , res) => {
    let gid = req.params.groupId;
    console.log(gid)
    const group = await Group.findOne({ id: gid })
    .then((group) => {
        if (group == null) {
            res.status(200).send({ status: "No group Record Retrieved" })
        }
        else {
            res.status(200).send({ status: "group Record Retrieved", group: group })
        }
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({ status: "Server error", error: err.message });
    })
}



module.exports = {
    createGroup,
    getAllGroup,
    removeGroup,
    getOneGroup
}
