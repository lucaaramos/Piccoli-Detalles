import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
    imageUrl: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

/* Indexes */
productSchema.index({ createdAt: -1 });
productSchema.index({ price: 1, stock: 1, createdAt: -1 });
productSchema.index({ name: "text" });
   

const Product = mongoose.model("Product", productSchema);
export default Product;
