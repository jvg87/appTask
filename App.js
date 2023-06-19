import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

import firebase from './src/services/firebaseConnetction';

import Feather from 'react-native-vector-icons/Feather';

export default function App() {
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');
  const [keyTask, setKeyTask] = useState('');

  useEffect(() => {
    
    function getUser(){
      if(!user){
        return;
      }

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          const data = {
            key: childItem.key,
            nome: childItem.val().nome
          }
          setTasks(oldTasks => [...oldTasks, data]);
        })
      })
    }

    getUser();

  }, [user]);
  

  function handleAdd(){
    if (newTask === ''){
      return;
    }

    if (keyTask !== ''){
      firebase.database().ref('tarefas').child(user).child(keyTask).update({
        nome: newTask
      })
      .then(() => {
        const taskIndex = tasks.findIndex(item => item.key === keyTask);
        const taskClone = tasks;
        taskClone[taskIndex].nome = newTask

        setTasks([...taskClone]);
      })

      Keyboard.dismiss();
      setNewTask('');
      setKeyTask('');
      return;
    }

    const tarefas = firebase.database().ref('tarefas').child(user);
    const key = tarefas.push().key;

    tarefas.child(key).set({
      nome: newTask
    })
    .then(() => {
      const data = {
        key: key,
        nome: newTask
      };
      Keyboard.dismiss();
      setTasks(oldTasks => [...oldTasks, data]);
      
    })

setNewTask('');

}

  function handleDelete(key){
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(() => {
      const findTasks = tasks.filter(item => item.key !== key);
      setTasks(findTasks)
    })
  }

  function handleEdit(data){
    setKeyTask(data.key)
    setNewTask(data.nome);
    inputRef.current.focus();
    
  }

  function cancelEdit(){
    setKeyTask('');
    setNewTask('');
    Keyboard.dismiss();
  }

  if (!user){
    return <Login changeStatus={(user) => setUser(user)}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      {keyTask.length > 0 && (
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name='x-circle' color='#C93C33' size={20}/>
          </TouchableOpacity>
          <Text style={{marginLeft: 5, color:'#C93C33'}}>
            Você está editando uma tarefa!
          </Text>
        </View>
      )}
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder='O que vai fazer hoje?'
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
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
