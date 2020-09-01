import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import MultiLevel2Screen from '../screens/MultiLevel2Screen';
import Nearby from '../screens/Nearby';
import Productpage from '../screens/Productpage';
import Productpages from '../screens/Productpages';

// icons
import SvgPages from '../components/icons/Svg.Pages';

const MultiTabBarIcon = ({ focused }) => <SvgPages active={focused} />;
MultiTabBarIcon.propTypes = {
  // required
  focused: PropTypes.bool.isRequired
};

// Multi Stack
// /////////////////////////////////////////////////////////////////////////////
const MultiStack = createStackNavigator(
  {
    MultiLevel2: Nearby,
    Productpage:Productpage,
    Productpages:Productpages,


  },
  {
    navigationOptions: {
      tabBarLabel: 'الخريطة',
      tabBarIcon: MultiTabBarIcon
    }
  }
);

export default MultiStack;
