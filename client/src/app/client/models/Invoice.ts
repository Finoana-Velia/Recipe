export interface Invoice {
    products : any[];
    subtotal : number;
    discount : number | null;
    delivery : number | null;
    promoCode : string | null;
    total : number;
}

export interface InvoiceRequest {
    reference : string,
    date : Date,
    deliveryAdress : string,
    isDelivered : boolean,
    subtotal : number;
    total : number,
    discount : number | null,
    deliveryFee : number | null,
    productIds : any[],
    idAccount : number,
}