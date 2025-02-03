import { database } from '../config/mysqldb.js';
import { DataTypes } from 'sequelize';

const DogModel = database.define('Dog', {
  nameDog: { type: DataTypes.STRING, allowNull: false },
  breed: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gener: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.BLOB('medium'), allowNull: true },
}, {
  tableName: 'dogs',
  timestamps: false,
});

export { DogModel };

