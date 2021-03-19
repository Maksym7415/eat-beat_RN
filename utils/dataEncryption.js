import RSA from './rsa';
import * as SecureStore from 'expo-secure-store';

const encryption = async (data) => {
    const stringSecureItems = await SecureStore.getItemAsync('public_key');
    const parseSecureItems = JSON.parse(stringSecureItems);
    const rsa = new RSA();
    const stringify = JSON.stringify(data)
    const encoded_message = rsa.encode(stringify);
    const encrypted_message = rsa.encrypt(encoded_message, parseSecureItems.public_key, parseSecureItems.exponent);
    return {encryptedData: encrypted_message, deviceId: parseSecureItems.uniqueId};
}

export default encryption