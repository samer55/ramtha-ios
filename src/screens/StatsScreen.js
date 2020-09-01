import React from 'react';
import { ScrollView, Text,View,Dimensions } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle,colors } from '../constants';
import Result from '../components/Bmistatus/index';
import Trainer from '../components/Trainer';

const StatsScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={gStyle.contentContainer}
      style={gStyle.container[theme]}
    >
    <View style={{flex:1,width: Dimensions.get('window').width-34,alignSelf: 'center',padding: 23,backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det]}>First</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme],{fontSize:21 }]}>Select offer you want to share</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme]]}>There is many offer that we have, Select the one you want to share & Earn</Text>
  </View>
    </View>


    <View style={{flex:1,width: Dimensions.get('window').width-34,alignSelf: 'center',padding: 23,backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det]}>Second</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme],{fontSize:21 }]}>Copy & Share Promo code</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme]]}>Copy promo code for each Promotion and offer it to let people get the offer & you earn</Text>
  </View>
    </View>



    <View style={{flex:1,width: Dimensions.get('window').width-34,alignSelf: 'center',padding: 23,backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det]}>Third</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme],{fontSize:21 }]}>Select Links for each offer to share</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme]]}>Every offer we provide links for share select links from the offer you want to share & Past it in your ads</Text>
  </View>
    </View>


    <View style={{flex:1,width: Dimensions.get('window').width-34,alignSelf: 'center',padding: 23,backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det]}>Finally</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme],{fontSize:21 }]}>They earn & you earn</Text>
  </View>
  <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: gStyle.cards[theme].backgroundColor,marginVertical: 5}}>
  <Text style={[gStyle.det,gStyle.text[theme]]}>When they subscribe & use your promo code they earn the offer & you earn Commission, you can transfer your money when you reach $50</Text>
  </View>
    </View>
    </ScrollView>
  );
};

StatsScreen.navigationOptions = {
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'How it works'
};

export default StatsScreen;
