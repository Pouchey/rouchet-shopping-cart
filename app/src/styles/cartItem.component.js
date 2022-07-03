import { StyleSheet } from 'react-native';
const styles = 
StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'gray',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  label:{
    flex: 1,
    fontSize: 20,
    fontStyle: 'italic',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  text:{
    fontSize: 20,
    color: 'red',
    marginLeft: 10,
  },
  bold:{
    fontWeight: 'bold',
  },
  content:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
  },
  rightAction: {
    width: 200,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderTopWidth: 1,
  },
  deleteAction: {
    backgroundColor: 'red',
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAction: {
    backgroundColor: 'seagreen',
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAction:{
    fontSize: 20,
    color: 'white',
  }


});
export default styles;