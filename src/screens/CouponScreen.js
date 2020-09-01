import React, { useState } from 'react';
import { ScrollView, Text, View,TouchableOpacity,Clipboard } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import Carousel from '../components/carousel';
import Trainer from '../components/Trainer';
import EventHour from '../components/EventHour';
var voucher_codes = require('voucher-code-generator');

// components
import NavigationBack from '../components/NavigationBack';

const Coupon = ({navigation}) => {
  const theme = useTheme();
const [coupon, useStates] = useState('')

function changes(value: string) {
  var d =voucher_codes.generate({
    length: 4,
    count: 1,


      charset:`${'samer'} ${'sukhni'}`

  });
const {data}=navigation.state.params.data
  useStates('2mon-'+d);
  Clipboard.setString(d.toString());
alert('Copied')
}

  return (
    <ScrollView
      contentContainerStyle={gStyle.contentContainer}
      style={gStyle.container[theme]}
    >

    <Text style={[gStyle.Title, gStyle.text[theme]]}>
      Coupon Screen
    </Text>
          <Carousel imageSrc="https://i.ibb.co/TwHW7MZ/iphone-xs-max-mockup-scene-2x-1.png" />
          <Text style={[gStyle.p, gStyle.text[theme]]}>
        {navigation.state.params.data.arabic?`  في هذا العرض ستحصل على ${navigation.state.params.data.title}
        ${navigation.state.params.data.description}  واستخدام البرومو كود الخاص بك`: ` The offer is user will get ${navigation.state.params.data.title}
        ${navigation.state.params.data.description}  and use your promo code when order`}


          </Text>
          <Text style={[gStyle.Title, gStyle.text[theme]]}>
            You will earn
          </Text>
          <View style={ [gStyle.promoContainer] }>
            <TouchableOpacity
            onPress={changes}
                >
                <Text style={ [gStyle.promoReveal,{backgroundColor: 'white',color:'black'}] }>
                  {navigation.state.params.data.earn} of subscription
                </Text>
            </TouchableOpacity>
        </View>
          <Text style={[gStyle.Title, gStyle.text[theme]]}>
            Your Coupon Code
          </Text>

          <View style={ [gStyle.promoContainer,gStyle.row[theme].backgroundColor ] }>
            <TouchableOpacity
            onPress={coupon?() => {Clipboard.setString(coupon.toString());
          alert('Copied')}:changes}
                >
                <Text  style={ gStyle.promoReveal }>
                    {navigation.state.params.data.pre}{navigation.state.params.code}
                </Text>
            </TouchableOpacity>
        </View>


          <Text style={[gStyle.Title, gStyle.text[theme]]}>
            Select Link to share
          </Text>
          <ScrollView horizontal={true} howsHorizontalScrollIndicator={false}>
          {navigation.state.params.data.links.map((data, index) => {
            return(
              <EventHour
                theme={theme}

                trainer="Copy"
                day={data.title}

                time={data.Link}
                onPress={()=>{  Clipboard.setString(data.Link.toString());
                alert('Copied')}}
              />
            )})}


          </ScrollView>
    </ScrollView>
  );
};

Coupon.navigationOptions = ({ navigation }) => ({
  headerLeft: <NavigationBack navigation={navigation} />,
  headerRight: <View style={{ flex: 1 }} />,
  headerTitleStyle: gStyle.headerTitleStyle,
  title: 'Class'
});

export default Coupon;
