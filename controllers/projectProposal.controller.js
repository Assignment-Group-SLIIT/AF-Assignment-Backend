const ProjectProposal = require('../models/projectProposal.model');
let sendEmail = require('../controllers/thirdpartyapis');
const { getOneUser } = require('./user.controller');

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

    const Id = req.params.id;
    const emailLeader = req.body?.leaderEmail;
    //const getLeaderName =await getOneUser(emailLeader);
    //console.log(getLeaderName)
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
                sendEmail(emailLeader, msg)
                if (response) {
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
            await ProjectProposal.findOneAndDelete({ groupId: Id })
            return res.status(200).send({ message: "ProjectProposal deleted successfully" });
        } catch {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
    return res.status(400).send({ message: "Invalid Request" });
}

module.exports = {
    createProjectProposal,
    getAllProjectProposal,
    updateProjectProposal,
    deleteProjectProposal
}