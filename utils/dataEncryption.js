import RSA from './rsa';
import * as SecureStore from 'expo-secure-store';

const encryption = async ({email, password}) => {
    const stringSecureItems = await SecureStore.getItemAsync('public_key');
    const parseSecureItems = JSON.parse(stringSecureItems);
    const rsa = new RSA();
    const stringify = JSON.stringify({email, password})
    const encoded_message = rsa.encode(stringify);
    const encrypted_message = rsa.encrypt(encoded_message, parseSecureItems.public_key, parseSecureItems.exponent);
    return {credentials: encrypted_message, deviceId: parseSecureItems.uniqueId};
}

export default encryption