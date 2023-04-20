import { Model, Schema, Types, model } from "mongoose";

export interface RegistrationRecordEvent {
  userId: Types.ObjectId;
  registrationDate: Date;
  paymentStatus: string;
  paymentDetails: object;
}

interface IEvent {
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventTime: Date;
  eventLink?: string;
  users?: RegistrationRecordEvent[];
}

type EventDocumentProps = {
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventTime: Date;
  eventLink?: string;
  users?: Types.DocumentArray<RegistrationRecordEvent>;
};
type EventModelType = Model<IEvent, object, EventDocumentProps>;

const eventSchema = new Schema<IEvent>({
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventTime: { type: Date, required: true },
  eventLink: String,

  users: [
    new Schema<RegistrationRecordEvent>({
      userId: Types.ObjectId,
      registrationDate: Date,
      paymentStatus: String,
      paymentDetails: Object,
    }),
  ],
});

export const Event = model<IEvent, EventModelType>("Event", eventSchema);
