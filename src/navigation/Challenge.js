import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator ,createSwitchNavigator} from 'react-navigation-stack';
import { ScrollView, Text, View ,Image} from 'react-native';
import { gStyle } from '../constants';

// components
import NavigationBack from '../components/NavigationBack';
import Find from '../screens/Find';

// screens
import ContactScreen from '../screens/Contact';

import HomeScreen from '../screens/HomeScreen';
import Product from '../screens/ProductScreen';
import OpenStore from '../screens/OpenStore';
// icons
import SvgPages from '../components/icons/Svg.Pages';


// Home Stack
// /////////////////////////////////////////////////////////////////////////////
const Challenge = createStackNavigator(
  {
    NewChallenge: OpenStore,
  },
  {
    navigationOptions: {
      tabBarLabel: 'اعلن',
   tabBarIcon: ({tintColor}) => (
      <View
        style={{
          position: 'absolute',
          bottom: 5, // space from bottombar
          height: 58,
          width: 58,
          borderRadius: 58,
          borderBottomWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderRightColor: 'transparent',
          borderLeftColor: 'transparent',
          borderBottomColor: 'transparent',
          backgroundColor: '#800020',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./pen.png')}
          style={{
            width: 30,
            height: 30,
            tintColor: '#f1f6f9',
            alignContent: 'center',
          }}
        />
      </View>
    ),
    }
  }
);

export default Challenge;
