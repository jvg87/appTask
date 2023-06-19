import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

let tasks = [
  {key: '1', nome:'Comprar leite'},
  {key: '2', nome:'Pagar conta'},
]

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');

  function handleDelete(key){
    alert(key);
  }

  function handleEdit(data){
    console.log(data);
  }

  if (!user){
    return <Login changeStatus={(user) => setUser(user)}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder='O que vai fazer hoje?'
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.btnAdd}>
          <Text style={styles.textBtnAdd}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}      
        keyExtractor={(item) => item.key}
        renderItem={({item})=> (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    paddingTop: 35,
    paddingHorizontal: 10,
  },
  containerTask:{
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginBottom:10,
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    height: 45,
    padding: 10,
    color: '#fcfcfc',
    borderWidth: 1,
    borderColor: '#5e5e5e',
    fontSize: 17,
    marginRight: 10
  },
  btnAdd: {
    backgroundColor:'#339FFE',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  textBtnAdd: {
    fontSize:22
  }
});
