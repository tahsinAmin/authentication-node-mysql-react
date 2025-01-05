import {Sequelize} from "sequelize";

const db = new Sequelize('auth_db', 'root', {
    host: 'localhost',
    dialact: "mysql",
});

export default db;