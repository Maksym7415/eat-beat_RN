import { Dimensions } from 'react-native';
import server from '../server';
import { Col } from '../components/Config';

interface Page {
    title: string
    previewTabTitle: string
    width: number
    bg: string
}

interface Pages {
    [key: string]: Page
}

interface Navigation {
    title: string
    page: string
}


interface RecommendedScreen {
    [key:string]: {
        get: Function
        add: Function
        preview: Function
        navigation: Array<Navigation>
        color: string
    }
}

interface SearchScreen {
    [key: string] : {
        pageText: string,
        search: Function,
        add: Function,
        preview: Function
        navigation: Array<Navigation>
    }
}

const deviceWidth = Dimensions.get('window').width;

const restrauntsPreview = (id, item) => new Promise((resolve) => resolve(item));
            
 

export const recommendedScreens: RecommendedScreen = {
    'recipes': {
        get: server.getRecommendedMeals,
        add: server.addCookedMeal,
        preview: server.getPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'recipes'
        }],
        color: Col.Recipes

    },
    'restaurants': {
        get: server.getRecommendedRestaurant,
        add: server.addRestaurantsMeal,
        preview: restrauntsPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'restaurants'
        }],
        color: Col.Restaurants

    }
}

export const searchScreen: SearchScreen = {
    restaurants: {
        pageText: "Search the restaurant meals",
        search: (search:string) => console.log(search),
        add: server.addRestaurantsMeal,
        preview: restrauntsPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'restaurants'
        }],
    },
    recipes: {
        pageText: "Search the meals",
        search: server.getRecipeByName,
        add: server.addCookedMeal,
        preview: server.getPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'recipes'
        }],
    }
}

export const pageSettings: Pages = {
    restaurants: {
        title: 'restaurants',
        previewTabTitle: 'description',
        width: deviceWidth/2,
        bg: Col.Restaurants,
        pageText: "Search the restaurant meals",
        search: (search:string) => console.log(search),
        add: server.addRestaurantsMeal,
        preview: restrauntsPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'restaurants'
        }],
        noInstractiontext: 'No description here'
    },
    recipes: {
        title: 'recipes',
        previewTabTitle: 'instruction',
        width: deviceWidth/3,
        bg: Col.Recipes,
        pageText: "Search the meals",
        search: server.getRecipeByName,
        add: server.addCookedMeal,
        preview: server.getPreview,
        navigation: [{
            title: 'previewRecommendedPage',
            page: 'recipes'
        }],
        noInstractiontext: 'No instructions here'
    },
        
}
