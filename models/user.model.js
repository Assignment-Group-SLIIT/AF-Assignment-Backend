const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
    },
    isAvailable: {
        type: String,
    },
    department: {
        type: String,
    },
    field: {
        type: String,
    }
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User = mongoose.model("user", UserSchema);

module.exports = User;