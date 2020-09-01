import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { gStyle } from '../constants';

// icons
import SvgCircleLeft from './icons/Svg.CircleLeft';

const NavigationHome = ({ navigation }) => (
  <TouchableOpacity
    accessible
    accessibilityLabel="go back"
    accessibilityComponentType="button"
    accessibilityTraits="button"
    activeOpacity={gStyle.activeOpacity}
    onPress={() => navigation.navigate('loading')}
    style={{ paddingHorizontal: 16, paddingVertical: 8 }}
  >
    <SvgCircleLeft active />
  </TouchableOpacity>
);

NavigationHome.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default NavigationHome;
