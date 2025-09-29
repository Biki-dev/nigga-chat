import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("MOONGODB CONNECTED:", conn.connection.host)
    } catch (error){
        console.error("ERROR CONNECTING TO MONGODB:", error)
        process.exit(1)

    }
    
}