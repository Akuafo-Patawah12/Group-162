import mongoose, { Document, Schema } from 'mongoose';

export interface ISale extends Document {
  saleId: string;
  productId: string;
  timestamp: Date;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  product: mongoose.Types.ObjectId;
}

const SaleSchema: Schema = new Schema({
  saleId: { type: String, required: true, unique: true },
  productId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

export default mongoose.model<ISale>('Sale', SaleSchema);
