import { StyleSheet } from 'react-native';
import { Spacing } from '../../components/Config';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: '500',
    lineHeight: 24
  },
  modalLabel: {
    marginBottom: 10,
  },
  modalContent: {
    marginTop: 40
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
  addButtonHolder: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonsHolder: {
    paddingHorizontal: 16,
    height: 80,
    width: '100%',
  },
  emptyHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
