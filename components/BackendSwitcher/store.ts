import AsyncStorage from '@react-native-community/async-storage';
import { BackendItem } from './types';
import initial from '../../backend.json'

const storeKey = '@backend'

export class BackendSwitcherStore {

  private baseUrl: string = null;
  private baseThirdPartyUrl: string = null;
  private backendItems: BackendItem[] = [];

  public setup = async () => {
    await this.load()
    await this.setBaseUrl()
    await this.setBasethirdPartyUrl()
  }

  public getBaseUrl = () => {
    return this.baseUrl
  }

  public getBasethirdPartyUrl = () => {
    return this.baseThirdPartyUrl
  }
  
  public getBackendItems = () => {
    return [ ...this.backendItems ]
  }

  public setAsDefault = async (item: BackendItem) => {
    for (let i = 0; i < this.backendItems.length; i++) {
      this.backendItems[i].isDefault = false
      if (item.id === this.backendItems[i].id) {
        this.backendItems[i].isDefault = true
      }
    }
    await this.save()
  }

  public setList = async (list: BackendItem[]) => {
    this.backendItems = [...list]
    await this.setBaseUrl()
    await this.setBasethirdPartyUrl()
    await this.save()
  }

  private setBaseUrl = async () => {
    this.backendItems.forEach((item) => {
      if (item.isDefault) {
        this.baseUrl = item.url
      }
    })
    if (!this.baseUrl) {
      if (this.backendItems.length) {
        await this.setAsDefault({...this.backendItems[0]})
      } else {
        throw new Error('Can\'t detect baseUrl, please check ./backend.json')
      }
    }
    console.log('baseUrl', this.baseUrl)
  }

  private setBasethirdPartyUrl = async () => {
    this.backendItems.forEach((item) => {
      if (item.isDefault) {
        this.baseThirdPartyUrl = item.thirdPartyUrl
      }
    })
    if (!this.baseThirdPartyUrl) {
      if (this.backendItems.length) {
        await this.setAsDefault({...this.backendItems[0]})
      } else {
        throw new Error('Can\'t detect basethirdPartyUrl, please check ./backend.json')
      }
    }
    console.log('basethirdPartyUrl', this.baseThirdPartyUrl)
  }

  private load = async () => {
    const str = await AsyncStorage.getItem(storeKey)
    if (str) {
      try {
        this.backendItems = JSON.parse(str)
      } catch (e) {
        console.log('AppStore -> setup -> error loading from AsyncStore:', e)
      }
    }

    if (!this.backendItems.length) {
      this.backendItems = initial
      await this.save()
    }
  }

  private save = async () => {
    await AsyncStorage.setItem(storeKey, JSON.stringify(this.backendItems))
  }
}

const BackendSwitcherStoreObject = new BackendSwitcherStore()
export default BackendSwitcherStoreObject
