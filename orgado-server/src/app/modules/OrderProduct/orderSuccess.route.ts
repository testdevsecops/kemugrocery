
import express from "express";
import { SavePaymentInfo, bestCategoryProduct, bestSellingProduct, clientOrders, clientOrdersInfo, clientPaymentInfo, getClient, getClientInfo, getpurchaseClientInfo, orderInfo, searchClientProduct, searchClients, sellSummary } from "./orderSuccess.controller";
import verifyToken from "../../../middleware/userVerify";

const paymentSuccess = express.Router();
// all Routes
paymentSuccess.post("/save-payment-info", verifyToken, SavePaymentInfo);
paymentSuccess.get("/sell-summaries",sellSummary);
paymentSuccess.get("/best-category-chart",bestCategoryProduct);
paymentSuccess.get("/clients",getClient);
paymentSuccess.get("/best-selling-products",bestSellingProduct);
paymentSuccess.get("/percess-client-info",getpurchaseClientInfo);
paymentSuccess.get("/orders",orderInfo);
paymentSuccess.get("/clientInfo",getClientInfo);
paymentSuccess.get("/search-clients",searchClients);
paymentSuccess.get("/client-order/:id",clientOrders);
paymentSuccess.get("/client-product",searchClientProduct);
paymentSuccess.get("/client-order-info",clientOrdersInfo);
paymentSuccess.get("/payment-info",clientPaymentInfo);


export default paymentSuccess;
