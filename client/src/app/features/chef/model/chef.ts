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
    bithDate : Date;
    profile : string;
    gender : Gender;
    specialities : Category[] | null;
    description : string,
}