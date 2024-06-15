import mongoose from "mongoose";

export default async function connectDB () {
    try {
        await mongoose.connect(
            process.env.DATABASE_URI as string
        )
    } catch (error) {
        console.error(error);
    }
}

