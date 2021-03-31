import React from 'react';
import { Keyboard, Pressable, StyleSheet, View, Image, TextInput } from 'react-native';
import { Col, Spacing } from './Config';
import server from '../server';
import { Text } from './custom/Typography';
import SuggestionInput, { SuggestionInputOption } from './SuggestionInput';
import { Button } from './MyComponents';

import { RecipeIngredient } from './interfaces';
import Select, { SelectOption } from './Select';

interface SearchIngredientsProps {
  title?: string
  toEdit?: RecipeIngredient
  onPressOk: (ingredient: RecipeIngredient) => void
  onPressCancel: () => void
}

interface SearchIngredientsState {
  initComplete: boolean
  searchLoading: boolean
  searchEnabled: boolean
  searchComplete: boolean
  searchQuery: string
  selectedIngredient: RecipeIngredient
  selectedIngredientUnits: string
  selectedIngredientAmount: number
  selectedIngredientAmountError: boolean
  searchResults: RecipeIngredient[]
  searchError: string
}

class SearchIngredients extends React.Component<SearchIngredientsProps, SearchIngredientsState> {
  static getDerivedStateFromProps(
    props: SearchIngredientsProps,
    state: SearchIngredientsState
  ): SearchIngredientsState {
    if (!state.initComplete) {
      state.initComplete = true
      if (!!props.toEdit) {
        state.selectedIngredient = props.toEdit
        state.selectedIngredientUnits = props.toEdit.unit
        state.selectedIngredientAmount = props.toEdit.amount
        state.searchQuery = props.toEdit.name
        state.searchComplete = true
      }
    }
    return state
  }
  state: SearchIngredientsState = {
    initComplete: false,
    searchLoading: false,
    searchEnabled: false,
    searchComplete: false,
    searchQuery: null,
    selectedIngredient: null,
    selectedIngredientUnits: null,
    selectedIngredientAmount: 1,
    selectedIngredientAmountError: false,
    searchResults: [],
    searchError: null
  }

  private suggestionInputRef: React.RefObject<SuggestionInput> = React.createRef()

  onChangeSearchText = (text: string) => {
    const enableSearch = text && text.length >= 3
    this.setState({
      searchQuery: text,
      searchEnabled: enableSearch,
      searchComplete: false,
      searchError: null
    })
  }

  onSelectIngredient = (option: SuggestionInputOption) => {
    const ingredient = this.state.searchResults.find(item => item.id === Number(option.id))
    if (ingredient) {
      this.setState({selectedIngredient: ingredient})
    }
  }

  onSelectUnits = (option: SelectOption) => {
    this.setState({ selectedIngredientUnits: option.id })
  }

  onChangeAmount = (amount: string) => {
    const castedToNumber = Number(amount)
    if (!!amount && !isNaN(castedToNumber) && castedToNumber < 10000) {
      this.setState({ selectedIngredientAmount: Number(amount), selectedIngredientAmountError: false })
    } else {
      this.setState({ selectedIngredientAmountError: true })
    }
  }

  onRunSearch = () => {
    this.setState({ searchLoading: true, searchError: null }, async () => {
      const result = await server.searchIngredients({ name: this.state.searchQuery })
      this.setState({searchResults: result}, () => {
        if (this.state.searchResults.length) {
          const options = this.state.searchResults.map((ingredient) => {
            return { id: '' + ingredient.id, value: ingredient.name }
          })
          if (this.suggestionInputRef && this.suggestionInputRef.current) {
            this.suggestionInputRef.current.setOptions(options, () => {
              Keyboard.dismiss()
              this.suggestionInputRef.current.toggleOpen()
            })
          }
          this.setState({ searchLoading: false, searchComplete: true })
        } else {
          this.setState({searchLoading: false, searchError: 'Nothing found'})
        }
      })
    })
  }

  onPressOk = () => {
    Keyboard.dismiss()
    const { selectedIngredient, selectedIngredientAmount, selectedIngredientUnits } = this.state
    const { onPressOk } = this.props
    const ingredient = { ...selectedIngredient }
    ingredient.amount = selectedIngredientAmount
    ingredient.unit = selectedIngredientUnits
    onPressOk(ingredient)
  }

  getPossibleUnits = (): SelectOption[] => {
    const { selectedIngredient } = this.state
    const unitsOptions: SelectOption[] = []
    if (selectedIngredient && selectedIngredient.possibleUnits) {
      selectedIngredient.possibleUnits.forEach((unit) => {
        unitsOptions.push({id: unit, value: unit})
      })
    } else {
      // STUB
      unitsOptions.push({id: 'g', value: 'g'})
    }
    return unitsOptions
  }

  render() {
    const { title, toEdit, onPressCancel } = this.props
    const {
      searchLoading,
      searchEnabled,
      searchComplete,
      searchQuery,
      selectedIngredient,
      selectedIngredientUnits,
      selectedIngredientAmount,
      selectedIngredientAmountError,
      searchError
    } = this.state

    const okButtonEnabled = !!selectedIngredientUnits && !selectedIngredientAmountError
    const editMode = !!toEdit

    return (
      <View style={styles.container}>
        <Text type={'h6'} style={styles.modalTitle}>{title || 'Search ingredients'}</Text>
        <View style={styles.modalContent}>
          <Text type={'label'} style={styles.modalLabel}>Name</Text>
          <View style={styles.modalInputHolder}>
            {!!selectedIngredient &&
              <View style={styles.modalInputImageHolder}>
                <Image source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/${selectedIngredient.image}`}} style={styles.ingredientImage}/>
              </View>
            }
            <SuggestionInput
              ref={this.suggestionInputRef}
              errorMessage={searchError}
              readonly={editMode}
              highlight={searchEnabled && !searchComplete}
              highlightColor={searchError ? Col.Error : Col.Stocks}
              defaultValue={searchQuery}
              onChangeText={this.onChangeSearchText}
              onSelectOption={this.onSelectIngredient}
            />
          </View>
          {!!selectedIngredient &&
            <View style={styles.modalUnitsRowHolder}>
              <View style={styles.modalUnitsHolder}>
                <Text type={'label'} style={styles.modalLabel}>Unit</Text>
                <Select
                  selected={editMode ? selectedIngredientUnits : undefined}
                  options={this.getPossibleUnits()}
                  onSelect={this.onSelectUnits}
                  placeHolder={'Choose'}
                />
              </View>
              <View style={styles.modalAmountHolder}>
                <Text type={'label'} style={styles.modalLabel}>Amount</Text>
                <TextInput
                  style={[styles.input, styles.inputText, selectedIngredientAmountError ? styles.error : {}]}
                  keyboardType={'numeric'}
                  onChangeText={this.onChangeAmount}
                  defaultValue={'' + selectedIngredientAmount}
                />
              </View>
            </View>
          }
          {searchComplete === false &&
            <Button
              clicked={searchLoading}
              deactivate={!searchEnabled}
              label={'Search'}
              isShow={true}
              style={{backgroundColor: Col.Stocks}}
              onPress={this.onRunSearch}
            />
          }
        </View>
        <View style={styles.modalButtons}>
          <Pressable onPress={onPressCancel}>
            <Text type="sub" style={{ color: Col.Black }}>
              CANCEL
            </Text>
          </Pressable>
          <Pressable onPress={this.onPressOk} disabled={!okButtonEnabled}>
            <Text type="sub" style={{ color: okButtonEnabled ? Col.Black : Col.Disabled }}>
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

export default SearchIngredients

const styles = StyleSheet.create({
  container: {
  },
  error: {
    borderColor: Col.Error,
  },
  modalTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: '500',
    lineHeight: 24
  },
  modalUnitsRowHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  modalUnitsHolder: {
    width: '45%'
  },
  modalAmountHolder: {
    width: '45%'
  },
  modalInputHolder: {
    flexDirection: 'row',
    minHeight: 60,
  },
  ingredientImage: {
    width: 42,
    height: 42,
  },
  modalInputImageHolder: {
    width: 42,
    height: 42,
    marginRight: 8,
    backgroundColor: Col.Background
  },
  modalLabel: {
    marginBottom: 10,
  },
  modalContent: {
    marginTop: 40,
  },
  modalButtons: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.small,
    marginTop: Spacing.large,
    justifyContent: "space-around",
  },
  suggestionInputOption: {

  },
  input: {
    height: 42,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Col.InputDefaultBorder,
    paddingHorizontal: 8,
    justifyContent: 'center'
  },
  inputText: {
    fontFamily: "Roboto_500Medium",
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
  },

})
