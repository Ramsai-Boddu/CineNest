import { DataTypes } from "sequelize";
import sequelize from "../database/config"; 

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    otpExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true, 
  }
);

export default User;