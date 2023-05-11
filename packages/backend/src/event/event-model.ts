import { Model, Schema, Types, model } from "mongoose";

/**
 * A single user registered to an event
 * 
 * @property {mongoose.Types.ObjectId} userId - the id of the user
 * @property {Date} registrationDate - the date the user registered for the event
 * @property {boolean} paid - whether the user has already paid for the event
 * @property {object} paymentDetails - the type of payment. For example, "card"
 * 
 */
export interface RegistrationRecordEvent {
  userId: Types.ObjectId;
  registrationDate: Date;
  paid: boolean;
  paymentDetails: object;
}

/**
 * An event in the database
 */
interface IEvent {
  eventTitle: string;
  eventDescription: string;
  eventLocation: string;
  eventTime: Date;
  stripeProductId: string;
  users?: RegistrationRecordEvent[];
}

// mongoose gets a bit weird with TypeScript, see https://mongoosejs.com/docs/typescript/subdocuments.html#subdocument-arrays
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

/**
 * the Event model
 */
export const Event = model<IEvent, EventModelType>("Event", eventSchema);
