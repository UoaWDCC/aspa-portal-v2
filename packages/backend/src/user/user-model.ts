import { Model, Schema, Types, model } from "mongoose";

export interface RegistrationRecordUser {
  eventId: Types.ObjectId;
  registrationDate: Date;
  paymentStatus: string;
  paymentDetails: object;
}

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  firebaseId?: string;
  university?: string;
  studentId?: number;
  skillLevel?: string;
  events?: RegistrationRecordUser[];
}

type UserDocumentProps = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  firebaseId?: string;
  university?: string;
  studentId?: number;
  skillLevel?: string;
  events?: Types.DocumentArray<RegistrationRecordUser>;
};
type UserModelType = Model<IUser, object, UserDocumentProps>;

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  firebaseId: String,
  university: String,
  studentId: Number,
  skillLevel: String,

  events: [
    new Schema<RegistrationRecordUser>({
      eventId: Types.ObjectId,
      registrationDate: Date,
      paymentStatus: String,
      paymentDetails: Object,
    }),
  ],
});

export const User = model<IUser, UserModelType>("User", userSchema);
