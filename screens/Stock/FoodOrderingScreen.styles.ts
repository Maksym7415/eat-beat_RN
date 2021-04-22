import { StyleSheet } from 'react-native';
import { Col } from '../../components/Config';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  total: {
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  picker: {
    borderBottomColor: Col.Disabled,
    borderBottomWidth: 1,
  },
  list: {
    backgroundColor: Col.White
  },
  listContent: {
    paddingHorizontal: 16,
  },
  description: {
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 30,
  },
  descriptionText: {
    color: Col.Back
  },
  notFoundText: {
    marginLeft: 8,
  },
  selectShopHolder: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  productItemHolder: {
    width: '100%',
    minHeight: 48,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 4,
    flexDirection: 'row',
    backgroundColor: Col.Background
  },
  productAmount: {
    paddingLeft: 2,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Col.Stocks,
    borderRadius: 16,
  },
  buttonsHolder: {
    paddingHorizontal: 16,
    height: 80,
    width: '100%',
  },

})
