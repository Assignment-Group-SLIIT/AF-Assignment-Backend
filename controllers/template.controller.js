import { nanoid } from 'nanoid'
const Template = require('../models/template.model');

const createTemplate = async (req, res) => {

    const {
        submissionType,
        template
    } = req.body;

    const newTemplate = new Template({
        submissionId: nanoid(4),
        submissionType,
        template
    })

    try {
        let response = await newTemplate.save();
        if (response) {
            return res.status(201).send({ message: 'new template added' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'error while adding a template' })
    }

}

const getAllTemplate = async (req, res) => {
    try {
        const response = await newTemplate.find();
        return res.status(200).send({ data: response });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const updateTemplate = async (req, res) => {
    const Id = req.params.id;
    // console.log("template id>>", Id,);

    const {
        submissionType,
        template,
    } = req.body;

    const templatePayload = {
        submissionId: Id,
        submissionType,
        template,
    }

    if (Id) {
        await templatePayload.findOneAndUpdate({ submissionId: Id }, newTemplate).then(() => {
            return res.status(200).send({ status: "Template Successfully updated!" });
        }).catch((err) => {
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }
    return res.status(400).send({ status: "Invalid Request" });
}

const deleteTemplate = async (req, res) => {
    const Id = req.params.id;
    // console.log("template id>>", Id,);

    if (Id) {
        const response = await newTemplate.findOneAndDelete({ submissionId: Id }).then(() => {
            return res.status(200).send({ status: "template deleted successfully" });
        }).catch((err) => {
            return res.status(500).send({ message: "Internal Server Error" });
        })
    }
    return res.status(400).send({ message: "Invalid Request" });
}

module.exports = {
    createTemplate,
    getAllTemplate,
    updateTemplate,
    deleteTemplate
}