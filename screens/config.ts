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
        previewTabTitle: 'description',
        width: deviceWidth/2,
        bg: Col.Restaurants,
        pageText: "Search the restaurant meals",
        get: server.getRecommendedRestaurant,
        search: (search:string) => console.log(search),
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
        
}
