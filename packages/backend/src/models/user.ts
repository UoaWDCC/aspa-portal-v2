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
    university: string;
    studentId?: number;
    skillLevel: string;
    events?: RegistrationRecordUser[];
}

type UserDocumentProps = {
    firstName: string;
    lastName: string;
    university: string;
    studentId?: number;
    skillLevel: string;
    events?: Types.DocumentArray<RegistrationRecordUser>;
};
type UserModelType = Model<IUser, object, UserDocumentProps>;

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    university: { type: String, required: true },
    studentId: Number,
    skillLevel: { type: String, required: true },

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
