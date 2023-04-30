import { Model, Schema, Types, model } from "mongoose";

// TODO: payment controller contributes to payment status and details
export interface RegistrationRecordEvent {
  userId: Types.ObjectId;
  registrationDate: Date;
  paid: boolean;
  paymentDetails: object;
}

interface IEvent {
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventTime: Date;
  stripeProductId: string;
  users?: RegistrationRecordEvent[];
}

type EventDocumentProps = {
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventTime: Date;
  stripeProductId: string;
  users?: Types.DocumentArray<RegistrationRecordEvent>;
};
type EventModelType = Model<IEvent, object, EventDocumentProps>;

const eventSchema = new Schema<IEvent>({
  eventTitle: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventLocation: { type: String, required: true },
  eventTime: { type: Date, required: true },
  stripeProductId: String,

  users: [
    new Schema<RegistrationRecordEvent>({
      userId: Types.ObjectId,
      registrationDate: Date,
      paid: Boolean,
      paymentDetails: Object,
    }),
  ],
});

export const Event = model<IEvent, EventModelType>("Event", eventSchema);
