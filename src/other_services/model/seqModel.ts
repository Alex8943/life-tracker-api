import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection';

export class Users extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

Users.init
({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
    tableName: 'users',
    sequelize,
    timestamps: false
});

export default Users;
