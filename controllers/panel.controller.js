const Panel = require('../models/panel.model');

const addPanel = async (req, res) => {
    console.log("reqqqq>>", req.body)

    const panelId = req.body.panelId;
    const panelNumber = req.body.panelNumber;
    const member1 = req.body.member1;
    const member2 = req.body.member2;
    const member3 = req.body.member3;
    const member4 = req.body.member4;
    const FieldOfInterest = req.body.FieldOfInterest;

    const newPanel = new Submission({
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
            return res.status(201).send({ message: 'new Panel Delete' });
        } else {
            return res.status(500).send({ message: 'Internal Server Error!!' });
        }
    } catch (err) {
        console.log("errr>>", err)
        return res.status(400).send({ message: 'error while adding a submission' });
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

module.exports = { addPanel }