import 'dotenv/config';
import sequelize from "./config"; 
import '../models/userModel';
import '../models/movieModel';


const connectDb = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL.');
        await sequelize.sync({ alter: true });
        await sequelize.sync();
        //console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDb;