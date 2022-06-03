const ProjectProposal = require('../models/projectProposal.model');
let sendEmail = require('../controllers/thirdpartyapis');
const { getOneUserName } = require('./user.controller');
const Group = require('../models/group.model');
const User = require('../models/user.model');

const createProjectProposal = async (req, res) => {

    const {
        groupId,
        leaderEmail,
        researchTopic,
        field,
        document
    } = req.body;

    const newProjectProposal = new ProjectProposal({
        groupId,
        leaderEmail,
        researchTopic,
        field,
        document
    })

    try {
        let response = await newProjectProposal.save();
        if (response) {
            return res.status(201).send({ message: 'new ProjectProposal added' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'error while adding a ProjectProposal' })
    }

}

const getAllProjectProposal = async (req, res) => {
    try {
        const response = await ProjectProposal.find();
        return res.status(200).send({ data: response });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const updateProjectProposal = async (req, res) => {
    console.log("req>>", req.body?.leaderEmail)
    const Id = req.params.id;
    const emailLeader = req.body?.leaderEmail;
    const getLeaderName = await getOneUserName(emailLeader);
    if (!getLeaderName) {
        return res.status(400).send({ message: 'User not available' })
    }
    const msg = " Your team project proposal is accespted. So Please refer to the published time tables ";

    const {
        groupId,
        leaderEmail,
        researchTopic,
        field,
        document
    } = req.body;

    const ProjectProposalPayload = {
        groupId,
        leaderEmail,
        researchTopic,
        field,
        document
    }

    try {
        const response = await ProjectProposal.findOneAndUpdate({ groupId: Id }, ProjectProposalPayload)
        if (response) {
            try {
                await updateProjectProposalStatus(groupId)

                const res = sendEmail(emailLeader, getLeaderName.fullname, msg)
                if (res) {
                    return res.status(200).send({ message: 'Successfully updated project proposal' });
                } else {
                    return res.status(500).send({ message: 'Internal server error with sending email' });
                }
            } catch (err) {
                return res.status(400).send({ message: 'Unable to inform the group on project proposal with accepted' })
            }

        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Unable to update project proposal' })
    }

}

//     if (Id) {
//         try {
//             await ProjectProposal.findOneAndUpdate({ groupId: Id }, ProjectProposalPayload)
//             return res.status(200).send({ message: "ProjectProposal Successfully updated!" });
//         } catch {
//             return res.status(500).send({ message: "Internal Server Error" });
//         }
//     }
//     return res.status(400).send({ message: "Invalid Request" });
// }

const deleteProjectProposal = async (req, res) => {
    const Id = req.params.id;
    // console.log("ProjectProposal id>>", Id,);

    if (Id) {
        try {
            try {
                await Group.findOneAndUpdate(
                    { "groupId": Id },
                    { $set: { "supervisor": "", "coSupervisor": "" } }
                )
            } catch (error) {
                return res.status(500).send({ message: "Error while updating group" });
            }
            try {
                await User.findOneAndUpdate(
                    { "groupId": Id },
                    { $set: { "supervisor": "", "coSupervisor": "" } }
                );
            } catch (error) {
                return res.status(500).send({ message: "Error while updating user" });
            }
            try {
                await ProjectProposal.findOneAndDelete({ groupId: Id })
            } catch (error) {
                return res.status(500).send({ message: "Error while updating supervisor" });
            }
            return res.status(200).send({ message: "ProjectProposal deleted successfully" });
        } catch {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
    return res.status(400).send({ message: "Invalid Request" });
}

//to update group to set proposal accepted or not
const updateProjectProposalStatus = async (groupId) => {
    try {
        const res = await Group.findOneAndUpdate(
            { "groupId": groupId },
            { $set: { "isProposalAccepted": true } }
        )
    } catch (err) {
        console.log("error while updating user>>", err)
    }

}

module.exports = {
    createProjectProposal,
    getAllProjectProposal,
    updateProjectProposal,
    deleteProjectProposal
}