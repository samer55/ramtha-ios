import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator ,createSwitchNavigator} from 'react-navigation-stack';
import { ScrollView, Text, View } from 'react-native';
import { gStyle } from '../constants';

// components
import NavigationBack from '../components/NavigationBack';
import Find from '../screens/Find';
import List from '../screens/List';
import Adsprofile from '../screens/Adsprofile';

// screens
import ContactScreen from '../screens/Contact';
import Prod from '../screens/Productsscreen';
import Notif from '../screens/Notif';

import HomeScreen from '../screens/HomeScreen';
import Product from '../screens/ProductScreen';
import Top from '../screens/Top';
import Notification from '../screens/Notification';
import Productpage from '../screens/Productpage';
import Productpages from '../screens/Productpages';

// icons
import SvgHome from '../components/icons/Svg.Home';

const HomeTabBarIcon = ({ focused }) => <SvgHome active={focused} />;
HomeTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Home Stack
// /////////////////////////////////////////////////////////////////////////////
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Notification:Notification,
  Top:Top,
  Find:Find,
  List:List,
  Productpage:Productpage,
Prod:Prod,
Productpages:Productpages,
Adsprofile:Adsprofile,
    Contact:ContactScreen,
Notif:Notif
  },
  {
    navigationOptions: {
      tabBarLabel: 'الاقسام',
      tabBarIcon: HomeTabBarIcon,


    }
  }
);

export default HomeStack;
