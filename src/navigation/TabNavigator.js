import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { colors } from '../constants';
import { createStackNavigator} from 'react-navigation-stack';
import PropTypes from 'prop-types';

import {  createSwitchNavigator } from 'react-navigation';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Loadingnew from '../screens/loadingnew';
import FindSecret from '../screens/FindSecret';
import AddFriend from '../screens/AddFriend';
import Guide from '../screens/guide';
import Forget from '../screens/forget';
import Startnew from '../screens/Startnew';
import OfferService from '../screens/OfferService';
import Hire from '../screens/Hire';
import OpenStore from '../screens/OpenStore';
import Specialoffer from '../screens/Specialoffer';
import Startscreen from '../screens/Startscreen';
import Nearby from '../screens/Nearby';

import Mappickers from '../screens/Mappickers';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
// navigation stacks
import HomeStack from './HomeStack';
import MultiStack from './MultiStack';
import StatsStack from './StatsStack';
import SettingsStack from './SettingsStack';
import Challenge from './Challenge';
import Search from './Search';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import List from '../screens/List';
import SvgPages from '../components/icons/Svg.Pages';

const MultiTabBarIcon = ({ focused }) => <SvgPages active={focused} />;
MultiTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

const TabNavigator = createBottomTabNavigator(
  {

  StatsStack,
    SettingsStack,

      Ch:Challenge,
Near:MultiStack,
        Search,
    HomeStack,
  },
  {
    initialRouteName: 'Search',
    tabBarOptions: {
      activeTintColor: {
        light: colors.darkColor,
        dark: colors.grey
      },
      inactiveTintColor: {
        light: colors.grey,
        dark: colors.white20
      }
    }
  }
);
const HomeStacks = createStackNavigator(
  {
    Stats: FindSecret,
    Startnew:Startnew,



  },

);
const Guides = createStackNavigator(
  {
    Guide: Startscreen,
    List:List,
    OfferService:OfferService,
    Hire:Hire,
    OpenStore:OpenStore,
    Specialoffer:Specialoffer
  },

  {
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
);

const Switch = createSwitchNavigator({
  start: {
    screen: Guides,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Home: {
    screen: TabNavigator
  },
  loading: {
    screen: Loadingnew,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Add: {
    screen: AddFriend,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

  map: {
    screen: Mappickers,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Guide: {
    screen:Guides,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

New:{
  screen: Startnew
},
  Write: {
    screen: HomeStacks
  },
});

const App = createAppContainer(Switch);

export default App;
