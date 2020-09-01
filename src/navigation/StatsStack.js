import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import StatsScreen from '../screens/StatsScreen';
import ContactScreen from '../screens/Contact';
import Find from '../screens/Find';
import Startnew from '../screens/Startnew';
import Notification from '../screens/Notification';
import Friends from '../screens/Friends';
import Terms from '../screens/terms';
import Contactpage from '../screens/Contactpage';
import Contactus from '../screens/Contactus';

// icons
import SvgStats from '../components/icons/Svg.Stats';

const StatsTabBarIcon = ({ focused }) => <SvgStats active={focused} />;
StatsTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Stats Stack
// /////////////////////////////////////////////////////////////////////////////
const StatsStack = createStackNavigator(
  {Notification:Notification,
    Stats: Find,
    Contactus:Contactus,
    Contactpage:Contactpage,
    Friends:Friends,
Terms:Terms,
    Write:Startnew,

  },
  {
    navigationOptions: {
      tabBarLabel: 'المزيد',
      tabBarIcon: StatsTabBarIcon
    }
  }
);

export default StatsStack;
