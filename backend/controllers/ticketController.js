import Tickets from './../models/TicketModel.js';
import Users from '../models/UserModel.js';
import { Op } from 'sequelize';

export const getTickets = async(req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Tickets.findAll({
                attributes: ['uuid','subject','description', 'status', 'reply'],
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        } else {
            response = await Tickets.findAll({
                attributes: ['uuid','subject','description', 'status', 'reply'],
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

export const getTicketById = async(req, res) => {
    console.log("\n\n\n Inside getTicketById");
    
    try {
        const ticket = await Tickets.findOne({
            where: {
                uuid: req.params.id
            }
        });
        console.log("\n\n\n ticket =", ticket);
        if(!ticket) return res.status(404).json({msg: "Data not found"});

        let response;
        if (req.role === "admin") {
            response = await Tickets.findOne({
                attributes: ['uuid','subject','description', 'status', 'reply'],
                where: {
                    id: ticket.id
                },
                include: [{
                    model: Users,
                    attributes: ['name','email']
                }]
            });
        } else {
            response = await Tickets.findOne({
                attributes: ['uuid','subject','description', 'status', 'reply'],
                where: {
                    [Op.and]:[{id: ticket.id}, {userId: req.userId}]
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

export const createTicket = async(req, res) => {
    const {subject, description} = req.body;
    
    console.log("subject, description =", subject, description);

    try {
        await Tickets.create({
            subject: subject,
            description: description,
            status: 'open',
            assigned: 'admin',
            reply: "",
            userId: req.userId
        });
        res.status(201).json({msg: "Tickets created successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateTicket = async(req, res) => {
    console.log("\n\n\n Inside getTicketById");
    
    try {
        const ticket = await Tickets.findOne({
            where: {
                uuid: req.params.id
            }
        });
        console.log("\n\n\n ticket =", ticket);
        if(!ticket) return res.status(404).json({msg: "Data not found"});

        const {subject, description, assigned, status, reply} = req.body;
        if (req.role === "admin") {
            await Tickets.update({subject, description, assigned, status, reply}, {
                where: {
                    id: ticket.id
                }
            })
        } else {
            if(req.userId !== ticket.userId) return res.status(403).json({msg: "Access is forbidden"})

            await Tickets.update({subject, description, assigned, reply}, {
                where: {
                    [Op.and]:[{id: ticket.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "Ticket updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteTicket = async(req, res) => {
    try {
        const ticket = await Tickets.findOne({
            where: {
                uuid: req.params.id
            }
        });
        console.log("\n\n\n ticket =", ticket);
        if(!ticket) return res.status(404).json({msg: "Data not found"});

        if (req.role === "admin") {
            await Tickets.destroy({
                where: {
                    id: ticket.id
                }
            })
        } else {
            if(req.userId !== ticket.userId) return res.status(403).json({msg: "Access is forbidden"})

            await Tickets.destroy({
                where: {
                    [Op.and]:[{id: ticket.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg: "Ticket deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}