import { StyleSheet } from 'react-native';
const styles = 
StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  col:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 20,
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
  editCard:{
    backgroundColor: '#ccc',
  },
  image:{
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardActive:{
    shadowOpacity: 0,
    elevation: 0,
  },
  input:{
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    fontSize:15,
  },
  label:{
    fontSize: 20,
    margin: 10,
  },
  button:{
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'seagreen',
    margin: 10,
  },
  buttonLabel:{
    color: 'white',
    fontSize: 30,
  },

});

export default styles;