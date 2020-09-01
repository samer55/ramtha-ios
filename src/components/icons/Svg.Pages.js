import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';

const SvgPages = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return <MaterialCommunityIcons name="map" size={size} color={fill} />;
};

SvgPages.defaultProps = {
  active: false,
  size: 20
};

SvgPages.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgPages;
