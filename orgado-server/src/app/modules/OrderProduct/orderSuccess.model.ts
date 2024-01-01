import { model, Schema } from "mongoose";
import {OrderDataType} from "./orderSuccess.interface";


const orderScema = new Schema<OrderDataType>({
  buyerEmail : String,
  Country: String,
  name: String,
  Address: String,
  City: String,
  Postcode: String,
  EmailAddress: String,
  date:String,
  Phone: String,
  totalPrice: Number,
  orderProducts:Array,
  paymentId: String,
});

export const Order = model<OrderDataType>("Order", orderScema);
