import { StyleSheet } from 'react-native';
const styles = 
StyleSheet.create({
  container: {
    
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text:{
    flex: 1,
    fontSize: 20,
    fontStyle: 'italic',
    marginLeft: 10,
    textTransform: 'capitalize',
  }
});
export default styles;