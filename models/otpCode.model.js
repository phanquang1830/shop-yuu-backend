import { DataTypes } from "sequelize";

export default (sequelize) => {
  const OtpCode = sequelize.define(
    "OtpCode",
    {
      otp_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "otp_codes",
    }
  );

  return OtpCode;
};
