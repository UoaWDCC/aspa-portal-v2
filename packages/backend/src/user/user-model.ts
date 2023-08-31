import { Model, Schema, Types, model } from "mongoose";

/**
 * A single event that a User is registered to
 *
 * @property {mongoose.Types.ObjectId} eventId - the id of the event
 * @property {Date} registrationDate - the date the user registered for the event
 * @property {boolean} isPaid - whether the user has already paid for the event
 * @property {object} paymentDetails - the type of payment. For example, "card"
 *
 */
export interface RegistrationRecordUser {
  eventId: Types.ObjectId;
  registrationDate: Date;
  isPaid: boolean;
  paymentDetails: object;
}

/**
 * A user in the database
 */
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

// mongoose gets a bit weird with TypeScript, see https://mongoosejs.com/docs/typescript/subdocuments.html#subdocument-arrays
type UserDocumentProps = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  firebaseId?: string;
  university?: string;
  studentId?: number;
  skillLevel?: string;
  events: Types.DocumentArray<RegistrationRecordUser>;
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
      isPaid: Boolean,
      paymentDetails: Object,
    }),
  ],
});

/**
 * The User model
 */
export const User = model<IUser, UserModelType>("User", userSchema);
