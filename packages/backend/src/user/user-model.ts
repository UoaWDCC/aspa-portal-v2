import { Model, Schema, Types, model } from "mongoose";

export interface RegistrationRecordUser {
  eventId: Types.ObjectId;
  registrationDate: Date;
  paid: boolean;
  paymentDetails: object;
}

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  university?: string;
  studentId?: number;
  skillLevel?: string;
  events?: RegistrationRecordUser[];
}

type UserDocumentProps = {
  firstName: string;
  lastName: string;
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
  university: String,
  studentId: Number,
  skillLevel: String,

  events: [
    new Schema<RegistrationRecordUser>({
      eventId: Types.ObjectId,
      registrationDate: Date,
      paid: Boolean,
      paymentDetails: Object,
    }),
  ],
});

export const User = model<IUser, UserModelType>("User", userSchema);
