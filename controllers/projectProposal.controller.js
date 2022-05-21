const ProjectProposal = require('../models/projectProposal.model');


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
        const response = await newProjectProposal.find();
        return res.status(200).send({ data: response });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const updateProjectProposal = async (req, res) => {
    const Id = req.params.id;
    // console.log("ProjectProposal id>>", Id,);

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

    if (Id) {
        await ProjectProposalPayload.findOneAndUpdate({ groupId: Id }, newProjectProposal).then(() => {
            return res.status(200).send({ status: "ProjectProposal Successfully updated!" });
        }).catch((err) => {
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }
    return res.status(400).send({ status: "Invalid Request" });
}

const deleteProjectProposal = async (req, res) => {
    const Id = req.params.id;
    // console.log("ProjectProposal id>>", Id,);

    if (Id) {
        await newProjectProposal.findOneAndDelete({ groupId: Id }).then(() => {
            return res.status(200).send({ status: "ProjectProposal deleted successfully" });
        }).catch((err) => {
            return res.status(500).send({ message: "Internal Server Error" });
        })
    }
    return res.status(400).send({ message: "Invalid Request" });
}

module.exports = {
    createProjectProposal,
    getAllProjectProposal,
    updateProjectProposal,
    deleteProjectProposal
}