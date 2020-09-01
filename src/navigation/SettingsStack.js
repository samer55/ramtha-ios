import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Loadingnew from '../screens/loadingnew';
import {  createSwitchNavigator } from 'react-navigation';
import Forget from '../screens/forget';
import Newnot from '../screens/Newnot';

// screens
import SettingsScreen from '../screens/SettingsScreen';
import Secure from '../screens/Secure';
import Share from '../screens/Share';
import EditPro from '../screens/EditPro';
import Contactus from '../screens/Contactus';
import Uprofile from '../screens/Uprofile';
import Myads from '../screens/Myads';
import Fav from '../screens/Fav';
import Newcat from '../screens/Newcat';
import Productpage from '../screens/Productpage';
import Premium from '../screens/Premium';
import OpenStore from '../screens/OpenStore';
import Terms from '../screens/terms';

// icons
import SvgCog from '../components/icons/Svg.Cog';

const SettingsTabBarIcon = ({ focused }) => <SvgCog active={focused} />;
SettingsTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};
import List from '../screens/List';
import Productpages from '../screens/Productpages';

// Settings Stack
// /////////////////////////////////////////////////////////////////////////////
const SettingsStacks = createStackNavigator(
  {
    Home:Uprofile,
    Settings: SettingsScreen,
    Secure:Secure,
    Newcat:Newcat,
    List:List,
Myads:Myads,
Terms:Terms,
Editads:OpenStore,
Premium:Premium,
    Share:Share,
    Newnot:Newnot,
    Productpage:Productpage,
    Contactus:Contactus,
    EditPro:EditPro,
Fav:Fav
  }
);
const Signupss = createStackNavigator(
  {
    Signup:Signup,

Terms:Terms,
  }
);
const SettingsStack = createSwitchNavigator({

  loading: {
    screen: Loadingnew,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },

  Signup: {
    screen: Signupss,
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
  SettingsStacks: {
    screen: SettingsStacks,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  Forget: {
    screen: Forget,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
},
{
  navigationOptions: {
    tabBarLabel:'الملف الشخصي',
    tabBarIcon: SettingsTabBarIcon
  }
});

export default SettingsStack;
