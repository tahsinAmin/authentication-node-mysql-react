import Users from './../models/UserModel.js';
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes:['uuid','name','email','role']
        });
        res.status(200).json(response);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg: "Password doesn't match! Try again"});

    const hashedPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })

        return res.status(201).json({msg: "User created!"})

    } catch (error) {
        console.log("Error: ",error)
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

export const updateUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user)  res.status(404).json({msg: "User doesn't exist"});

    const {name, email, password, confPassword, role} = req.body;

    let hashedPassword;
    
    if (password === "" || password === null) {
        hashedPassword = user.password;
    } else {
        hashedPassword = await argon2.hash(password);
    }

    if (password !== confPassword) return res.status(400).json({msg: "Password doesn't match! Try again"});

    try {
        await Users.update({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        }, {
            where: {
                id:user.id
            }
        })

        return res.status(200).json({msg: "User updated!"})

    } catch (error) {
        console.log("Error: ",error)
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

export const deleteUser = async(req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user)  res.status(404).json({msg: "User doesn't exist"});

    try {
        await Users.destroy({
            where: {
                id:user.id
            }
        })

        return res.status(200).json({msg: "User deleted!"})

    } catch (error) {
        console.log("Error: ",error)
        return res.status(500).json({msg: "Internal Server Error"})
    }
}