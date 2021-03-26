import React from 'react'
import * as Updates from 'expo-updates';
import BackendSwitcherStore from './store'
import { BackendItem, BackendSwitcherProps, BackendSwitcherState } from './types';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';

export class BackendSwitcher extends React.Component<BackendSwitcherProps, BackendSwitcherState>{

  public state: BackendSwitcherState = {
    display: false,
    items: []
  }

  public static instance: BackendSwitcher | null = null

  public static openSwitcher = (): void => {
    const items = [...BackendSwitcherStore.getBackendItems()]
    BackendSwitcher.instance.setState({ items, display: true })
  }

  public static closeSwitcher = (): void => {
    BackendSwitcher.instance.setState({ display: false })
  }

  public static setup = async (callback?: Function): Promise<void> => {
    await BackendSwitcherStore.setup()
    if (typeof callback === 'function') {
      callback()
    }
  }


  public componentDidMount(): void {
    BackendSwitcher.instance = this
  }

  onPressBackendItem = async (item: BackendItem): Promise<void> => {
    const updated: BackendItem[] = []
    this.state.items.forEach((stateItem) => {
      const newItem = { ...stateItem }
      newItem.isDefault = false
      if (newItem.id === item.id) {
        newItem.isDefault = true
      }
      updated.push(newItem)
    })
    this.setState({ items: updated })
  }

  onPressCancel = () => {
    BackendSwitcher.closeSwitcher()
  }

  onPressApply = async () => {
    BackendSwitcher.closeSwitcher()
    await BackendSwitcherStore.setList(this.state.items)
    Updates.reloadAsync()
  }

  render() {
    const { display, items } = this.state
    if (!display) return null

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <FlatList
            keyExtractor={item => item.id}
            data={items}
            renderItem={(listItem) => {
              return (
                <TouchableOpacity
                  style={[styles.item, listItem.item.isDefault ? styles.itemDefault : {}]}
                  onPress={() => this.onPressBackendItem(listItem.item)}
                >
                  <Text style={styles.itemTitle}>{listItem.item.title}</Text>
                  <Text style={styles.itemUrl}>{listItem.item.url}</Text>
                </TouchableOpacity>
              )
            }}
          />
          <View style={[styles.buttons, styles.row]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.onPressCancel}
              style={styles.button}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.onPressApply}
              style={styles.button}
            >
              <Text>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default BackendSwitcher

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 50,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    padding: 16,
  },
  buttons: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 25,
  },
  item: {
    width: '100%',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#fff',
  },
  itemDefault: {
    backgroundColor: '#f4f0fa',
  },
  itemTitle: {

  },
  itemUrl: {

  },
});

