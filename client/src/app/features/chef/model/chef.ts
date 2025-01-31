export enum Gender {
    MAN = "Man",
    WOMAN = "Woman",
    OTHER = "Other"
}

export enum Category {
    DRINKS = "Drinks",
    PIZZAS = "Pizzas",
    DISHS = "Dishs",
    NOODLES = "Noodles"
}

export interface Chef {
    id : number;
    name : string;
    birthDate : Date;
    profile : string;
    gender : Gender | string;
    speciality : Category | string;
    description : string | null,
}