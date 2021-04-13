module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    //   image: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imedFam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comment;
};
