import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string,
  passwordResetToken: string,
  passwordResetExpiration: Date,
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password:{ type: String, required: true },
  role: {type: String, enum: ['admin', 'user'], default: 'user'},
  passwordResetToken: {
        type: String,
        default:null
    },
    passwordResetExpiration: {
        type: Date,
        default :null
    },
});

export default mongoose.model<IUser>('User', UserSchema);
