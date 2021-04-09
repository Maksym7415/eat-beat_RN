import { StyleSheet } from 'react-native';
import { Col } from '../../components/Config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    height: 80,
    width: '100%',
  },
  modalContent: {
    padding: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalButton: {
    minWidth: 70,
    color: Col.Stocks,
    paddingHorizontal: 8,
    paddingVertical: 10,
    textAlign: 'center',
  },
  modalProductHolder: {
    flexDirection: 'row',
  },
  modalProductImageHolder: {
    width: 40,
    height: 40,
    backgroundColor: Col.Light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalProductTitleHolder: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalProductImage: {
    width: 40,
    height: 40,
  },
})
