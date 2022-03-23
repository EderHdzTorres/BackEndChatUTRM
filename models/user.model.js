import { Model, DataTypes } from 'sequelize';
import { database } from '../config/database.js';

export class UserModel extends Model {}

UserModel.init( 
{
     id: {
         type: DataTypes.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true
        },
     username:{
         type: DataTypes.STRING
        },
     password: {
         type: DataTypes.STRING
        },
    name:
        {
        type: DataTypes.STRING
        },
     idlevel: {
        type: DataTypes.INTEGER
    },
     email: {
        type: DataTypes.STRING
    },
    last_access: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER
    },
    attempts: {
        type: DataTypes.INTEGER
    },
    setpass: {
        type: DataTypes.STRING
    },
    Lang: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.STRING
    },
    updated_at: {
        type: DataTypes.STRING
    }
},
{

    sequelize: database,
    tableName: 'users',
    timestamps: false,
}



);