const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const panelSchema = new Schema({
    panelId: { type: String, required: true },
    panelNumber: { type: Number, required: true },
    member1: {},
    member2: {},
    member3: {},
    member4: {},
    FieldOfInterest: { type: String, required: true },
})

const Panel = mongoose.model('Panel', panelSchema);
module.exports = Panel;