import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Col } from './Config';
import { Text } from './custom/Typography';
import SvgMaker from './SvgMaker';

export interface SelectOption {
  id: string
  value: string
}

interface SelectProps {
  selected?: string
  placeHolder?: string
  options: SelectOption[]
  onSelect: (option: SelectOption) => void
}

interface SelectState {
  initComplete: boolean
  opened: boolean
  selected: SelectOption
}

class Select extends React.PureComponent<SelectProps, SelectState> {

  static getDerivedStateFromProps(props: SelectProps, state: SelectState): SelectState {
    if (!state.initComplete) {
      state.initComplete = true
      if (props.selected) {
        const option = props.options.find(o => o.id === props.selected)
        if (option) {
          state.selected = option
        }
      }
    }
    return state
  }

  state: SelectState = {
    initComplete: false,
    opened: false,
    selected: null
  }

  getInputStyles = () => {
    const { opened } = this.state;
    const s = []
    s.push(styles.input)
    if (!opened) {
      s.push(styles.closed)
    }
    return s
  }

  getListViewStyles = () => {
    const s = []
    s.push(styles.listView)
    return s
  }

  getSeparatorStyles = () => {
    const s = []
    s.push(styles.separator)
    return s
  }

  getOptionLabelStyles = (id: string) => {
    const { selected } = this.state
    const s = [styles.optionText]
    if (!!selected && id === selected.id) {
      //@ts-ignore
      s.push({ color: Col.Stocks })
    }
    return s
  }

  onItemPress = (item: SelectOption) => {
    this.setState({ selected: item, opened: false }, () => {
      this.props.onSelect(item)
    })
  }

  toggleOpen = () => {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  render() {
    const { options, placeHolder } = this.props
    const { opened, selected } = this.state
    const selectedText = selected ? selected.value : (placeHolder || '')
    return (
      <View style={styles.container}>
        <View style={this.getInputStyles()}>
          <Text style={styles.inputText} type={'sub'} >{selectedText}</Text>
        </View>
        <TouchableOpacity style={styles.inputIcon} onPress={this.toggleOpen} activeOpacity={0.7}>
          <SvgMaker name={opened ? 'arrowUp' : 'arrowDown'} />
        </TouchableOpacity>
        {opened &&
        <View style={this.getListViewStyles()}>
          <View style={this.getSeparatorStyles()} />
          <FlatList
            style={styles.list}
            data={options}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={styles.optionView}
                  onPress={() => this.onItemPress(item.item)}
                  activeOpacity={0.7}
                >
                  <Text type={'sub'} style={this.getOptionLabelStyles(item.item.id)}>{item.item.value}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
        }
      </View>
    )
  }
}

export default Select

const styles = StyleSheet.create({
  container: {
  },
  inputIcon: {
    position: 'absolute',
    right: 0,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 42,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderColor: Col.InputDefaultBorder,
    paddingHorizontal: 8,
    justifyContent: 'center'
  },
  closed: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  inputText: {
    fontFamily: "Roboto_500Medium",
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
  },
  optionView: {
    marginBottom: 12,
  },
  optionText: {
    letterSpacing: 1.25,
    lineHeight: 16,
  },
  listView: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: Col.InputDefaultBorder,
    paddingHorizontal: 8,
  },
  list: {
    maxHeight: 100
  },
  separator: {
    width: '100%',
    height: 1,
    borderColor: Col.InputDefaultBorder,
    borderTopWidth: 1,
    marginBottom: 12,
  }
});
