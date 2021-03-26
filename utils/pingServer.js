import axios from "axios";
import generator from "./randomNumberGenerator";
import * as SecureStore from "expo-secure-store";
import AppBackend from '../components/BackendSwitcher/store'

async function ping() {
  await SecureStore.deleteItemAsync("public_key");
  if (await SecureStore.getItemAsync("public_key")) return;
  const id = generator();
  const url = `${AppBackend.getBaseUrl()}api/main/generate-rsa`;
  try {
    const {
      data: { public_key, exponent },
    } = await axios.post(url, { uniqueId: id });
    await SecureStore.setItemAsync(
      "public_key",
      JSON.stringify({ public_key, exponent, uniqueId: id })
    );
  } catch (error) {
    console.log("generation error", error);
  }

  // console.log(result)
}

export default ping;
