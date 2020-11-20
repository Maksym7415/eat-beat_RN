import axios from 'axios';
import generator from './randomNumberGenerator';
import { baseURL } from '../url';
import * as SecureStore from 'expo-secure-store';
import RSA from './rsa';

async function ping(){
    const id = generator();
    const url = `${baseURL}api/main/generate-rsa`;
    try{
        const {data: { public_key, exponent }} = await axios.post(url , { uniqueId: id });
        // const rsa = new RSA();
        // const email = "vit91112@gmail.com";
        // const password = 123456;
        // const stringify = JSON.stringify({email, password})
        // const encoded_message = rsa.encode(stringify);
        // const encrypted_message = rsa.encrypt(encoded_message, public_key, exponent);
        //await axios.post(`${baseURL}api/main/get-rsa` , { encrypted: encrypted_message, uniqueId: id });
        await SecureStore.setItemAsync('public_key', JSON.stringify({ public_key, exponent, uniqueId: id }))
    }catch(error) {
        console.log('generation error', error)
    }
   
    // console.log(result)
}


export default ping