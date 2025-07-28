import { Image } from 'react-native';
import { TruckIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc';

export const notifications = [
    {
        id : 1,
        title : "Bruce placed an order",
        component : "Icon",
        url : null,
        date : "2025-06-13T09:18:22"
    },
    {
        id : 2,
        title : "Try our new recipe Veg noodlemade by our chef Jie Chu",
        component : "Recipe",
        url : require("../assets/Recette_de_Nouilles_Sautees_aux_Legumes.webp"),
        date : "2025-06-13T09:15:27"
    },
    {
        id : 3,
        title : "Jie Chu was added in the list",
        component : "Chef",
        url : require("../assets/istockphoto-1213660289-612x612.jpg"),
        date : "2025-06-13T09:13:58"
    }
]