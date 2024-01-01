"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderScema = new mongoose_1.Schema({
    buyerEmail: String,
    Country: String,
    name: String,
    Address: String,
    City: String,
    Postcode: String,
    EmailAddress: String,
    date: String,
    Phone: String,
    totalPrice: Number,
    orderProducts: Array,
    paymentId: String,
});
exports.Order = (0, mongoose_1.model)("Order", orderScema);
