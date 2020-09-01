import React from 'react';
import { ScrollView, Text, View,Dimensions,Linking } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Button } from 'native-base';

// components
import NavigationBack from '../components/NavigationBack';

const Transfer = ({navigation}) => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={gStyle.contentContainer}
      style={gStyle.Centercont[theme]}
    >
      <Text style={[gStyle.text[theme],gStyle.Title]}>Transfer : {navigation.state.params.balance}$</Text>
      <Text style={[gStyle.text[theme],gStyle.Title]}>Secret Code :  {navigation.state.params.code}</Text>
      <Text style={[gStyle.text[theme],gStyle.Title,{fontSize: 17}]}>Provide us with this secret code when you contact us</Text>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('window').width
        }}
      >
        <Button
          block
          light
          onPress={ ()=>{ Linking.openURL('http://m.me/opentiq')}}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={[gStyle.button]}>Contact for transfer</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

Transfer.navigationOptions = ({ navigation }) => ({
  headerLeft: <NavigationBack navigation={navigation} />,
  headerRight: <View style={{ flex: 1 }} />,
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Transfer'
});

export default Transfer;
