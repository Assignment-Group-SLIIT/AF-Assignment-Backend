const Template = require('../models/template.model');

const createTemplate = async (req, res) => {

    const submissionId = req.body.id;
    const submissionType = req.body.type;
    const template = req.body.file;

    const newTemplate = new Template({
        submissionId,
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

const getAllTemplate = async (req, res) => { }
const getOneTemplate = async (req, res) => { }
const updateTemplate = async (req, res) => { }
const deleteTemplate = async (req, res) => { }

module.exports = {
    createTemplate,
    getAllTemplate,
    getOneTemplate,
    updateTemplate,
    deleteTemplate
}