import { database } from "./config.js";
import { DataTypes } from "sequelize";

export const Note = database.define(
  "notes",
  {
    noteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    noteTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noteBody: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    noteDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    noteStatus: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["noteId"],
      },
    ],
  }
);
