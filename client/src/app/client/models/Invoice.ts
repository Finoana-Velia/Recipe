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
    isDelivered : boolean,
    subtotal : number;
    total : number,
    discount : number | null,
    deliveryFee : number | null,
    productsIds : any[],
    idAccount : number,
}