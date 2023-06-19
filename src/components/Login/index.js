import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'

import firebase from '../../services/firebaseConnetction';
//https://www.behance.net/gallery/166936563/Sing-up

export default function Login({changeStatus}) {
  const [type, setType] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
    
    if (type === 'login'){
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid);
      })
      .catch((error) => {
        alert('Ops, parece que aconteceu algum erro!')
        console.log(error);
        return;
      })
    } else {
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        changeStatus(user.user.uid);
      })
      .catch((error) => {
        alert('Ops, parece que aconteceu algum erro!')
        console.log(error);
        return;
      })
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AppTask</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor='#5e5e5e'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Senha'
        placeholderTextColor='#5e5e5e'
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity 
          style={[styles.handleLogin, {backgroundColor: type === 'login' ? '#339FFE' : '#266191'}]}
          onPress={handleLogin}
        >
          <Text style={{fontSize: 17, color: '#fcfcfc'}}>
            { type === 'login' ? 'Acessar' : 'Registrar'}
          </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}
      >
        <Text style={{textAlign: 'center', color: '#266191', fontWeight: 'bold'}}>
          {type === 'login' ? 'Criar uma conta' : 'Ja possup uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#191919',
    paddingHorizontal:10
  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fcfcfc'
  },
  input: {
    marginBottom:20,
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    height: 45,
    padding: 10,
    color: '#fcfcfc',
    borderWidth: 1,
    borderColor: '#5e5e5e'
  },
  handleLogin:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: 'bold'
  }
})