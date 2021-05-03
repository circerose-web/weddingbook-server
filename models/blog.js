module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("blog", {
    userId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thoughts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Blog;
};
