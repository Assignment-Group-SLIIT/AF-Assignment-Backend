const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const panelSchema = new Schema({
    panelId: { type: String, required: true },
    panelNumber: { type: String, required: true },
    member1: { type: String, required: true },
    member2: { type: String, required: true },
    member3: { type: String, required: true },
})

const Panel = mongoose.model('Panel', panelSchema);
module.exports = Panel;