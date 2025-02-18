export interface Invoice {
    products : any[];
    subtotal : number;
    discount : number | null;
    delivery : number | null;
    promoCode : string | null;
    total : number;
}