//const baseURl = "http://192.168.88.248:8080";
//const baseURl = "http://192.168.42.151:8080";
const baseURl = "http://192.168.43.128:8080";

const recipeUrl = baseURl + "/api/v1/products";
const chefUrl = baseURl + "/api/v1/chefs";

export function searchRecipe(text) {
    const url = recipeUrl + "?name=" + text + "&page=0&size=0";
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function findById(id) {
    const url = recipeUrl + "/" + id;
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function recipeImage(id) {
    return recipeUrl + "/image?id=" + id;
}

export function chefImage(id) {
    return chefUrl + "/profile?id=" + id;
}