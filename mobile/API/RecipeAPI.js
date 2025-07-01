const baseURl = "http://192.168.88.249:8080";

const recipeUrl = baseURl + "/api/v1/products";

export function searchRecipe(text) {
    const url = recipeUrl + "?name=" + text;
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function recipeImage(id) {
    return recipeUrl + "/image?id=" + id;
}