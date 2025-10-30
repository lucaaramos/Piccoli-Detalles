import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    last_name: {type: String, requeried: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    // date: {type: Date}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString(); // agrega "id" legible
        delete ret._id;              // oculta "_id"
        delete ret.__v;              // oculta "__v"
      },
    },
  }
);

// Exportar el modelo
const User = mongoose.model("User", userSchema);
export default User;
