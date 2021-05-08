module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define("guest", {
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    side: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    theirSpouse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    theirKids: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Guest;
};
