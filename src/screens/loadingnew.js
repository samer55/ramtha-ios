import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet,Image } from 'react-native'
import { firebaseApp } from '../../firebase'

export default class Loadingnew extends React.Component {
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {

      this.props.navigation.navigate(user?'SettingsStacks':'Signup')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri:'https://loading.io/icon/fcmayv'}} style={{height:500,width:500}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
