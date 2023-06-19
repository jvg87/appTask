import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';


export default function TaskList({data, deleteItem, editItem}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginRight: 10}} onPress={() => deleteItem(data.key)}>
        <Feather name='trash' color='#C93C33' size={20}/>
      </TouchableOpacity>
      <View style={{paddingRight: 10}}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={{color: '#fcfcfc', paddingRight: 10, fontSize: 17}}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 20
  }
})