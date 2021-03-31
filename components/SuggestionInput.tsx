import React from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Col } from './Config';
import { Text } from './custom/Typography';
import SvgMaker from './SvgMaker';

export interface SuggestionInputOption {
  id: string
  value: string
}

interface SuggestionInputProps {
  errorMessage?: string
  readonly?: boolean
  highlight?: boolean
  highlightColor?: string
  defaultValue: string
  onSelectOption: (option: SuggestionInputOption) => void
  onChangeText: (text: string) => void
}

interface SuggestionInputState {
  opened: boolean
  selected: string
  options: SuggestionInputOption[]
}

class SuggestionInput extends React.PureComponent<SuggestionInputProps, SuggestionInputState> {

  state: SuggestionInputState = {
    opened: false,
    options: [],
    selected: null
  }

  getInputStyles = () => {
    const { highlight, highlightColor } = this.props;
    const { opened } = this.state;
    const s = []
    s.push(styles.input)
    if (highlight && !!highlightColor) {
      s.push({
        borderColor: highlightColor
      })
    }
    s.push(styles.inputText)
    if (!opened) {
      s.push(styles.closed)
    }
    return s
  }

  getListViewStyles = () => {
    const { highlight, highlightColor } = this.props;
    const s = []
    s.push(styles.listView)
    if (highlight && !!highlightColor) {
      s.push({
        borderColor: highlightColor
      })
    }
    return s
  }

  getSeparatorStyles = () => {
    const { highlight, highlightColor } = this.props;
    const s = []
    s.push(styles.separator)
    if (highlight && !!highlightColor) {
      s.push({
        borderColor: highlightColor
      })
    }
    return s
  }

  getOptionLabelStyles = (id: string) => {
    const { highlight, highlightColor } = this.props;
    const { selected } = this.state
    const s = [styles.optionText]
    if (highlight && highlightColor) {
      if (id === selected) {
        //@ts-ignore
        s.push({ color: Col.Stocks })
      }
    }
    return s
  }

  setOptions = (options: SuggestionInputOption[], callback?: Function) => {
    this.setState({ options }, () => {
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  onItemPress = (item: SuggestionInputOption) => {
    this.setState({ selected: item.id, opened: false }, () => {
      this.props.onSelectOption(item)
    })
  }

  toggleOpen = () => {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  render() {
    const { readonly, onChangeText, defaultValue, errorMessage } = this.props
    const { options, opened, selected } = this.state
    const textInputValue = selected ? options.find(i => i.id === selected).value : defaultValue
    return (
      <View style={styles.container}>
        <TextInput
          editable={!readonly}
          style={this.getInputStyles()}
          onChangeText={onChangeText}
          defaultValue={textInputValue}
        />
        {!!errorMessage &&
          <Text type={'cap'} style={{color: Col.Error}}>{errorMessage}</Text>
        }
        {options.length > 0 &&
          <TouchableOpacity style={styles.inputIcon} onPress={this.toggleOpen} activeOpacity={0.7}>
            <SvgMaker name={opened ? 'arrowUp' : 'arrowDown'} />
          </TouchableOpacity>
        }
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

export default SuggestionInput

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
