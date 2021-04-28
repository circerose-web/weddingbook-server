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
  return Comment;
};
