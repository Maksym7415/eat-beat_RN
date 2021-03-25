import { Dimensions } from 'react-native';
import server from '../server';
import { Col } from '../components/Config';

interface Page {
    title: string
    previewTabTitle: string
    width: number
    bg: string
    pageText: string
    search: Function
    get?: Function
    add: () => Function
    preview: () => Function
    navigation: Array<object>
    noInstractiontext: string
    recommendText: string
    isShowGetRecommendBtn: boolean
}

interface Pages {
    [key: string]: Page
}

interface Navigation {
    title: string
    page: string
}

const disabledItem = ['Side dish','Bread', 'Beverage', 'Fingerfood', 'Sauce', 'Marinade', 'Snack']

const deviceWidth = Dimensions.get('window').width;

const restrauntsPreview = (id, item) => new Promise((resolve) => resolve(item));
            
export const pageSettings: Pages = {
    restaurants: {
        title: 'restaurants',
        recommendText: 'No recommendations',
        isShowGetRecommendBtn: true,
        previewTabTitle: 'description',
        width: deviceWidth/2,
        bg: Col.Restaurants,
        pageText: "Search the restaurant meals",
        get: server.getRecommendedRestaurant,
        search: server.restaurantSearch,
        add: server.addRestaurantsMeal,
        preview: restrauntsPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'restaurants'
        }],
        noInstractiontext: 'No description here',
        searhFilter: (data: object) => {
            const filterObject = {}
            filterObject.intolerances = data.intolerances.map((el) =>  {
                if(el.name === 'Dairy' || el.name === 'Gluten') {
                    return {
                        ...el,
                        disabled: false
                    }
                }
                return {
                    ...el,
                    disabled: true
                }
            });
            filterObject.diets = data.diets.map((el) => ({...el, disabled: false}));
            filterObject.mealTypes = data.mealTypes.map((el) => {
                if(disabledItem.includes(el.name)) {
                    return {
                        ...el,
                        disabled: true
                    }
                }
                return {
                    ...el,
                    disabled: false
                }
            })
        return filterObject
        }
    },
    recipes: {
        title: 'recipes',
        recommendText: 'No recommendations',
        isShowGetRecommendBtn: true,
        previewTabTitle: 'instruction',
        width: deviceWidth/3,
        bg: Col.Recipes,
        pageText: "Search the meals",
        get: server.getRecommendedMeals,
        search: server.getRecipeByName,
        add: server.addCookedMeal,
        preview: server.getPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'recipes'
        }],
        noInstractiontext: 'No instructions here',
        searhFilter: (data: Array<object>) => {
            const filterObject = {}
            filterObject.intolerances = data.intolerances.map((el) => ({...el, disabled: false}))
            filterObject.diets = data.diets.map((el) => ({...el, disabled: false}));
            filterObject.mealTypes = data.mealTypes.map((el) => ({...el, disabled: false}))
        return filterObject
        }
    },
    snacks: {
        title: 'snacks',
        recommendText: '',
        isShowGetRecommendBtn: false,
        width: deviceWidth/3,
        bg: Col.Snacks,
        get: () => new Promise((res, rej) => res(
            [
                {
                    id: 1,
                    image: 'https://i.pinimg.com/originals/e5/a8/c3/e5a8c3b39aa8d0f5c8301f82d392b994.jpg',
                    title: 'Apple',
                    healthScore: 95,
                    vegetarian: true,
                    vegan: true,
                    glutenFree: true,
                    dairyFree: false,
                    veryPopular: true,
                },
                {
                    id: 2,
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1280px-Orange-Fruit-Pieces.jpg',
                    title: 'Orange',
                    healthScore: 87,
                    vegetarian: true,
                    vegan: true,
                    glutenFree: false,
                    dairyFree: false,
                    veryPopular: true,
                }
            ]
        )),
        add: server.addSnacks,
    }
        
}
