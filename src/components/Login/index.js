import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40,
    paddingHorizontal:10
  },
  input: {
    marginBottom:10,
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    height: 45,
    padding: 10,
    color: '#fcfcfc',
    borderWidth: 1,
    borderColor: '#5e5e5e'
  }
})