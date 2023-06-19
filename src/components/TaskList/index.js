import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function TaskList({data}) {
  return (
    <View style={styles.container}>
      <Text>{data.key} {data.nome}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})