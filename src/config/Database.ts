import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI || '', {
            dbName: 'gestion_agro'
        })
        console.log('mongoDb conectado');
    } catch (error){
        console.error('error al conectar', error);
        process.exit(1);
    }
};