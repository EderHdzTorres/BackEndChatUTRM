import { Model, DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export class messages extends Model {}

messages.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    conversation_uuid: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    msg: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    created_at: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: database,
    tableName: 'messages',
    timestamps: false
});

// messages.hasMany(messages, {sourceKey: 'conversation_id'})