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
import Notif from '../screens/Notif';

// screens
import ContactScreen from '../screens/Contact';

import HomeScreen from '../screens/HomeScreen';
import Product from '../screens/ProductScreen';
import Searchall from '../screens/Searchall';
import Productpage from '../screens/Productpage';

// icons
import SvgHome from '../components/icons/Svg.Home';
import SvgShare from '../components/icons/Svg.Search';
import Productpages from '../screens/Productpages';

const HomeTabBarIcon = ({ focused }) => <SvgShare active={focused} />;
HomeTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Home Stack
// /////////////////////////////////////////////////////////////////////////////
const HomeStack = createStackNavigator(
  {
    Searchall:Searchall,
    Home: HomeScreen,
  Productpage:Productpage,
  List:List,
  Notif:Notif,
  Productpages:Productpages,

Adsprofile:Adsprofile,

    Product:Product,
    Contact:ContactScreen,

  },
  {
    navigationOptions: {
      tabBarLabel: 'العروض والاعلانات',
      tabBarIcon: HomeTabBarIcon
    }
  }
);

export default HomeStack;
