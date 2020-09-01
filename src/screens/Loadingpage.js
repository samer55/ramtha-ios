import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { observer,inject } from 'mobx-react'
import firebase from 'firebase'
@inject("appStore") @observer

export default class Loading extends React.Component {


  render() {
    return (
      <View style={styles.container}>
      <Image source={{uri:'https://cdn.dribbble.com/users/645440/screenshots/3162915/shopping-loader.gif'}} style={{height:250,width:250}} />
      <Text style={{fontFamily: 'Cairo-Bold',fontSize: 21}}>جاري النشر</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
