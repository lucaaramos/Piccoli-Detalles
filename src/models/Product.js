import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String },
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
const Product = mongoose.model("Product", productSchema);
export default Product;
