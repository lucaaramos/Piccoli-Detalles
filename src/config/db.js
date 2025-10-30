import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}/${process.env.DB_NAME}`);
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};
