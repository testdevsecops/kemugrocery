
  export interface OrderDataType {
    buyerEmail : string | undefined;
    Country: string;
    name: string;
    Address: string;
    City: string;
    Postcode: string;
    EmailAddress: string;
    date:string;
    Phone: string;
    totalPrice: number;
    orderProducts?: any;
    paymentId: string;
  }
