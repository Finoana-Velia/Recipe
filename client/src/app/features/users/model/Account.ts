import { Gender } from "../../chef/model/chef"

interface Auth {
    username : string,
    password : string
}

interface Contact {
    email : string,
    phone : string,
}

interface Location {
    address : string,
    city : string,
    provinceState : string
}

export interface Account {
    id : number | null,
    firstName : string,
    lastName : string,
    birthDate : Date,
    profile : string,
    gender : Gender | string | null
    contact : Contact,
    location : Location,
    auth : Auth
}