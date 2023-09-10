import sequelize from './db';
import { DataTypes } from 'sequelize';

const userModel = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
  chatId: { type: DataTypes.STRING, unique: true },
  balance: { type: DataTypes.INTEGER }
});

export default userModel