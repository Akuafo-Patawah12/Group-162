import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchase extends Document {
  purchaseId: string;
  productId: string;
  timestamp: Date;
  quantity: number;
  unitCost: number;
  totalCost: number;
  product: mongoose.Types.ObjectId;
}

const PurchaseSchema: Schema = new Schema({
  purchaseId: { type: String, required: true, unique: true },
  productId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  quantity: { type: Number, required: true },
  unitCost: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

export default mongoose.model<IPurchase>('Purchase', PurchaseSchema);
