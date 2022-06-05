
import { StyleSheet } from 'react-native';
const styles = 
StyleSheet.create({
  selectorBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorTextInput:{
    height: 50,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    marginLeft:10,
    marginRight:10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
  },
  selectorButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
  },
  selectorButtonText: {
    fontSize: 25,
    color: 'white',
  },
  selectorButtonActive: {
    backgroundColor: 'seagreen',
  },


});

export default styles;