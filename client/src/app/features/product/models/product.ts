import { Category, Chef } from "../../chef/model/chef";

export interface ProductRequest {
    id : number;
    name : string;
    price : number;
    image : string;
    category : Category | string;
    idChef : number | null;
}

export interface ProductResponse {
    id : number;
    name : string;
    price : number;
    image : string;
    category : Category | null;
    chef : Chef;
}