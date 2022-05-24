const Panel = require('../models/panel.model');

const addPanel = async (req, res) => {

    const panelId = req.body.panelId;
    const panelNumber = req.body.panelNumber;
    const member1 = req.body.member1;
    const member2 = req.body.member2;
    const member3 = req.body.member3;
    const member4 = req.body.member4;
    const FieldOfInterest = req.body.FieldOfInterest;

    const newPanel = new Panel({
        panelId,
        panelNumber,
        member1,
        member2,
        member3,
        member4,
        FieldOfInterest
    })
    try {
        let response = await newPanel.save();
        if (response) {
            return res.status(201).send({ message: 'new Panel Added sucessfully' });
        } else {
            return res.status(500).send({ message: 'Internal Server Error!!' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'error while adding a panel' });
    }
}

const getAllPanels = async (req, res) => {
    try {
        let response = await Panel.find();
        if (response) {
            return res.json(response);
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const getOnePanel = async (req, res) => {
    let id = req.params.id;
    try {
        let response = await Panel.findOne({ panelId: id });
        if (response) {
            return res.json(response);
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const updatePanel = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({ message: "Invalid Request" });
    }
    const {
        panelNumber,
        member1,
        member2,
        member3,
        member4,
        FieldOfInterest
    } = req.body;

    let updatePanelData = {
        panelId: id,
        panelNumber,
        member1,
        member2,
        member3,
        member4,
        FieldOfInterest
    }

    try {

        let response = await Panel.findOneAndUpdate({ panelId: id }, updatePanelData);
        if (response) {
            return res.status(200).send({ status: " Panel updated successfully" });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const deletepanel = async (req, res) => {
    const Id = req.params.id;
    if (!Id) {
        return res.status(400).send({ message: "Invalid Request" });
    }

    try {
        await Panel.findOneAndDelete({ panelId: Id });
        return res.status(200).send({ status: "panel deleted successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}


module.exports = { addPanel, getAllPanels, updatePanel, deletepanel, getOnePanel }