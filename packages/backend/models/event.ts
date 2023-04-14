import { Model, Schema, Types, model } from "mongoose";

export interface RegistrationRecordEvent {
  userId: Types.ObjectId;
  registrationDate: Date;
  paymentStatus: string;
  paymentDetails: object;
}

interface IEvent {
  eventTitle: String;
  eventDescription: String;
  eventLocation: String;
  eventTime: Date;
  eventLink: String;
  users?: RegistrationRecordEvent[];
}

type EventDocumentProps = {
  eventTitle: String;
  eventDescription: String;
  eventLocation: String;
  eventTime: Date;
  eventLink: String;
  users?: Types.DocumentArray<RegistrationRecordEvent>;
};
type EventModelType = Model<IEvent, object, EventDocumentProps>;

const eventSchema = new Schema<IEvent>({
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventTime: { type: Date, required: true },
  eventLink: { type: String, required: true },

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
