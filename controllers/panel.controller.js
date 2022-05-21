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

const updatePanel = async (req, res) => {
    console.log("req??", req.query.id)
    const id = req.query.id;

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
            return res.status(200).send({ status: " updated successfully" });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

const deletepanel = async (req, res) => {
    const Id = req.query.id;
    // console.log("template id>>", Id,);

    if (Id) {
        try {
            await Panel.findOneAndDelete({ panelId: Id });
            return res.status(200).send({ status: " deleted successfully" });
        } catch (err) {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
    return res.status(400).send({ message: "Invalid Request" });
}


module.exports = { addPanel, getAllPanels, updatePanel, deletepanel }