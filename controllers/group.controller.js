const Group = require('../models/group.model');
const User = require('../models/user.model');
let sendEmail = require('../controllers/thirdpartyapis')

//register group with supervisors
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
        let response = await newGroup.save();
        if (response) {
            await updateMemberAvailability(student.leader.registrationNo.toUpperCase(), groupId)
            await updateMemberAvailability(student.member01.registrationNo.toUpperCase(), groupId)
            await updateMemberAvailability(student.member02.registrationNo.toUpperCase(), groupId)
            await updateMemberAvailability(student.member03.registrationNo.toUpperCase(), groupId)
            return res.status(201).send({ message: "new student group created" })
        } else {
            return res.status(500).send({ message: "Internal server error" })
        }
    } catch (err) {
        console.log("err>>", err)
        return res.status(400).send({ message: 'error while adding a group' })
    }

}

//get all registered group 
const getAllGroup = async (req, res) => {
    try {
        let response = await Group.find();
        if (response) {
            return res.status(200).send({ message: "get all registered group", data: response })
        } else {
            return res.status(500).send({ message: "Internal server error" })
        }
    } catch (error) {
        return res.status(400).send({ message: "error while getting all group" })
    }
}

//remove group
const removeGroup = async (req, res) => {
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

//get on group by group Id
const getOneGroup = async (req, res) => {
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

//update group details by group Id
const updateGroup = async (req, res) => {

    const groupId = req.params.id;
    // const leaderEmail = req.body?.student?.leader?.email
    // const leaderName = req.body?.student?.leader?.name;
    // const msg = "Your team evaluations will be conducted by Panel " + req.body.panelNo + ". So Please refer to the published time tables ";

    // console.log(leaderEmail)

    const updateGroup = {
        groupId: req.body.groupId,
        student: req.body.student,
        supervisor: req.body.supervisor,
        coSupervisor: req.body.coSupervisor,
        researchTopic: req.body.researchTopic,
        researchField: req.body.researchField,
        panelNo: req.body.panelNo
    }

    try {
        const response = await Group.findOneAndUpdate({ groupId: groupId }, updateGroup)
        if (response) {

            try {
                // sendEmail(leaderEmail, leaderName, msg)
                if (response) {
                    return res.status(200).send({ message: 'Successfully updated group request' });
                } else {
                    return res.status(500).send({ message: 'Internal server error with sending email' });
                }
            } catch (err) {
                return res.status(400).send({ message: 'Unable to inform the group on allocation' })
            }

        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Unable to update group request' })
    }

}

//to update member availability
const updateMemberAvailability = async (studentId, groupId) => {
    try {
        const res = await User.findOneAndUpdate(
            { "studentId": studentId },
            { $set: { "isAvailable": false, "groupId": groupId } }
        )
    } catch (err) {
        console.log("error while updating user>>", err)
    }

}


const sendAcceptRejectEmail = async (req, res) => {

    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;


    try {
        if (sendEmail(email, name, message)) {
            return res.status(200).send({ status: "Email sent successfully" });
        }


    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}


module.exports = {
    createGroup,
    getAllGroup,
    removeGroup,
    getOneGroup,
    updateGroup,
    sendAcceptRejectEmail
}
