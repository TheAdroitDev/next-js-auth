import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

       connection.on('connected',() => {
         console.log("MongoDB connection Successfully")
       });
       connection.on('error',(err) => {
         console.log("Erro Aa gya bhai"+ err);
         process.exit();
       });
       
    } catch (error) {
        console.log('Something Goes Wrong')
        console.log(error)
    }
}