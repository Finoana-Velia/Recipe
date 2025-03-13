import { Category, Chef } from "./chef";

export interface ProductRequest {
    id : number;
    name : string;
    price : number;
    image : string;
    availability : boolean;
    category : Category | string;
    idChef : number | null;
}

export interface ProductResponse {
    id : number;
    name : string;
    price : number;
    image : string;
    availability : boolean;
    category : Category | string ;
    chef : Chef;
}