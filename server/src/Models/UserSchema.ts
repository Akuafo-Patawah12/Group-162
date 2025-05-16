import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: string;
  passwordResetToken?: string | null;
  passwordResetExpiration?: Date | null;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true},
  name: { type: String, required: true },
  email: { type: String, default:"" },
  password:{ type: String, default:"" },
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
