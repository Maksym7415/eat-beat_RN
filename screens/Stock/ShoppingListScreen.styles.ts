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

  }
})
