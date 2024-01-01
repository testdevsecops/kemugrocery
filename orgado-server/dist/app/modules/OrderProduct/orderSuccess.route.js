"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderSuccess_controller_1 = require("./orderSuccess.controller");
const userVerify_1 = __importDefault(require("../../../middleware/userVerify"));
const paymentSuccess = express_1.default.Router();
// all Routes
paymentSuccess.post("/save-payment-info", userVerify_1.default, orderSuccess_controller_1.SavePaymentInfo);
paymentSuccess.get("/sell-summaries", orderSuccess_controller_1.sellSummary);
paymentSuccess.get("/best-category-chart", orderSuccess_controller_1.bestCategoryProduct);
paymentSuccess.get("/clients", orderSuccess_controller_1.getClient);
paymentSuccess.get("/best-selling-products", orderSuccess_controller_1.bestSellingProduct);
paymentSuccess.get("/percess-client-info", orderSuccess_controller_1.getpurchaseClientInfo);
paymentSuccess.get("/orders", orderSuccess_controller_1.orderInfo);
paymentSuccess.get("/clientInfo", orderSuccess_controller_1.getClientInfo);
paymentSuccess.get("/search-clients", orderSuccess_controller_1.searchClients);
paymentSuccess.get("/client-order/:id", orderSuccess_controller_1.clientOrders);
paymentSuccess.get("/client-product", orderSuccess_controller_1.searchClientProduct);
paymentSuccess.get("/client-order-info", orderSuccess_controller_1.clientOrdersInfo);
paymentSuccess.get("/payment-info", orderSuccess_controller_1.clientPaymentInfo);
exports.default = paymentSuccess;
