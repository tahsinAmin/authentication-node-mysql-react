import Products from './../models/ProductModel.js';
import Users from '../models/UserModel.js';
import { Op } from 'sequelize';

export const getProducts = async(req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Products.findAll({
                attributes: ['uuid','name','price'],
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        } else {
            response = await Products.findAll({
                attributes: ['uuid','name','price'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProductById = async(req, res) => {
    console.log("\n\n\n Inside getProductById");
    
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        console.log("\n\n\n product =", product);
        if(!product) return res.status(404).json({msg: "Data not found"});

        let response;
        if (req.role === "admin") {
            response = await Products.findOne({
                attributes:['uuid','name','price'],
                where: {
                    id: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        } else {
            response = await Products.findOne({
                attributes:['uuid','name','price'],
                where: {
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProduct = async(req, res) => {
 
    const {name, price} = req.body;
    
    console.log("name, price =", name, price);
    try {
        await Products.create({
            name: name,
            price: price,
            userId: req.userId
        });
        res.status(201).json({msg: "Products created successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateProduct = async(req, res) => {
    console.log("\n\n\n Inside getProductById");
    
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        console.log("\n\n\n product =", product);
        if(!product) return res.status(404).json({msg: "Data not found"});

        const {name, price} = req.body;
        if (req.role === "admin") {
            await Products.update({name, price}, {
                where: {
                    id: product.id
                }
            })
        } else {
            if(req.userId !== product.userId) return res.status(403).json({msg: "Access is forbidden"})

            await Products.update({name, price}, {
                where: {
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "Product updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        console.log("\n\n\n product =", product);
        if(!product) return res.status(404).json({msg: "Data not found"});

        if (req.role === "admin") {
            await Products.destroy({
                where: {
                    id: product.id
                }
            })
        } else {
            if(req.userId !== product.userId) return res.status(403).json({msg: "Access is forbidden"})

            await Products.destroy({
                where: {
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}