import { Model, DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export class conversation extends Model {}

conversation.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    from_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    to_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    uuid: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize: database,
    tableName: 'conversation',
    timestamps: false
});