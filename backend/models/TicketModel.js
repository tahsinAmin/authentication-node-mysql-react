import { Sequelize } from "sequelize";

import db from "../config/database.js";
import Users from "./UserModel.js"

const { DataTypes } = Sequelize;

const Tickets = db.define('tickets', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,100]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,255]
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,10]
        }
    },
    assigned: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    reply: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null values
        validate: {
          len: [0, 255] // Allow empty strings and lengths between 1 and 255 characters
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Tickets);
Tickets.belongsTo(Users, {foreignKey: 'userId'})

export default Tickets;