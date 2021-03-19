export interface RestMeals {
    id: number,
    fk_restaurant_id: number,
    name: string,
    price: string,
    healthScore: number
    image: string
    ingredients: null | string,
    allergens:  null | string,
    categories:  null | string,
    nutritions:  null | string
    vegetarian: boolean,
    vegan: boolean,
    glutenFree: boolean,
    dairyFree: boolean,
    veryPopular: boolean
}