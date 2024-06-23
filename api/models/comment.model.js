import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Comment = sequelize.define('Comment', {
    content: {
        type:DataTypes.TEXT,
        allowNull: false,
    },
    postId: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    likes:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    numberOfLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
},{
    timestamps:true,
    tableName: 'Comment',
});

export default Comment;