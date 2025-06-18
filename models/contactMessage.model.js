import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ContacMessage = sequelize.define(
    "ContactMessage",
    {
      contact_messages_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
        tableName: "contact_messages"
    }
  );

  return ContacMessage
};
