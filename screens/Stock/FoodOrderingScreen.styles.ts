import { StyleSheet } from 'react-native';
import { Col } from '../../components/Config';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    backgroundColor: Col.White
  },
  listContent: {
    paddingHorizontal: 16,
  },
  description: {
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  descriptionText: {
    color: Col.Back
  }
})
