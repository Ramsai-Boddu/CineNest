import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";

const Movies = sequelize.define(
    "Movies",
    {
        id:{
            type:DataTypes.STRING,
            primaryKey:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        director:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        genre:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        releaseYear:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        status:{
            type:DataTypes.STRING,
            defaultValue:"not completed",
        },
        rating:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        review:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        cast:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        moviePic:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        userId:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        tablename:"movies",
        timestamps:true,
    }
);

export default Movies;