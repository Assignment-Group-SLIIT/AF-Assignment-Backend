const bcrypt = require('bcryptjs');
const { request } = require('express');
const auth = require('../middlewares/jwt')
const User = require('../models/user.model')

const register = async (req, res) => {

    const fullname = req.body.fullname;
    const studentId = req.body.studentId;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const degree = req.body.degree;
    const pwd = req.body.password;
    const role = req.body.role;
    const groupId = req.body.groupId;
    const isAvailable = req.body.isAvailable;
    const department = req.body.department;
    const field = req.body.field;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pwd, salt);

    const user = new User({
        fullname,
        studentId,
        email,
        contactNo,
        degree,
        password,
        role,
        groupId,
        isAvailable,
        department,
        field
    })

    try {
        let response = await user.save();
        if (response) {
            return res.status(201).send({ message: 'New User registered' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Error while registering a user' })
    }

}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    try {
        const user = await User.findOne({ email: email });
        if (user) {

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = auth.generateAccessToken(email);
                // call toJSON method applied during model instantiation
                return res.status(200).send({ ...user.toJSON(), token });
            }
            else {
                return res.status(400).send({ message: 'Such user does not exist check your credentials' })
            }
        } else {
            return res.status(404).send({ message: 'Such user does not exist' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Such user does not exist check your credentials' })
    }

}


const getAllUsers = async (req, res) => {

    try {
        let users = await User.find();
        if (users) {
            return res.json(users)
        } else {
            return res.status(404).send({ message: 'Error on retrieving users' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

const getOneUser = async (req, res) => {
    const email = req.params.email

    try {
        let user = await User.findOne({
            email: email
        });
        if (user) {
            return res.json(user)
        } else {
            return res.status(404).send({ message: 'No such user found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateUserPassword = async (req, res) => {
    const email = req.params.email;
    const password = req.params.pwd;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const salt = bcrypt.genSaltSync(10);
            const updatePassword = bcrypt.hashSync(password, salt);

            const newUser = {
                fullname: user.fullname,
                studentId: user.studentId,
                email: user.email,
                contactNo: user.contactNo,
                degree: user.degree,
                password: updatePassword,
                role: user.role,
                groupId: user.groupId,
                isAvailable: user.isAvailable,
                department: user.department,
                field: user.field
            }

            try {
                const response = await User.findOneAndUpdate({ email: email }, newUser);
                if (response) {
                    return res.status(200).send({ message: 'Successfully updated Password' });
                } else {
                    return res.status(500).send({ message: 'Internal server error' });
                }

            } catch (err) {
                return res.status(400).send({ message: 'Unable to update recheck your email' })
            }

        } else {
            return res.status(404).send({ message: 'No such user with entered email' })
        }

    } catch (err) {
        return res.status(404).send({ message: 'No such user with entered email' })
    }

}

const updateUser = async (req, res) => {
    const email = req.params.email;

    const user = await User.findOne({ email: email });

    const password = user.password;

    const newUser = {
        fullname: req.body.fullname,
        studentId: req.body.studentId,
        email: req.body.email,
        contactNo: req.body.contactNo,
        degree: req.body.degree,
        password: password,
        role: req.body.role,
        groupId: req.body.groupId,
        isAvailable: req.body.isAvailable,
        department: req.body.department,
        field: req.body.field
    }

    try {
        const response = await User.findOneAndUpdate({ email: email }, newUser);
        if (response) {
            return res.status(200).send({ message: 'Successfully updated User Details' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Unable to update recheck your email' })
    }

}

const deleteUser = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOneAndDelete({ email: email });
        if (user) {
            return res.status(204).send({ message: 'Successfully deleted A User' });
        } else {
            return res.status(404).send({ message: 'Such user does not exists recheck the email' });
        }

    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}


module.exports = {
    register,
    login,
    getAllUsers,
    getOneUser,
    updateUserPassword,
    updateUser,
    deleteUser
}