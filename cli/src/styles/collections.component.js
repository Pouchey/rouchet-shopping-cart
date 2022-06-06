import { StyleSheet } from 'react-native';
const styles = 
StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  card:{
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 2,
    backgroundColor: 'white',
  },
  addCard:{
    backgroundColor: '#ccc',
  },
  image:{
    width: 150,
    height: 150,
  },
  buttonActive:{
    shadowOpacity: 0,
    elevation: 0,
  }

});

export default styles;