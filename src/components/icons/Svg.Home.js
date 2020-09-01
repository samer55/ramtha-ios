import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import { Ionicons } from 'react-native-vector-icons';
import  Feather  from 'react-native-vector-icons/Feather';

const SvgHome = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return <Feather name="grid" size={size} color={fill} />;
};

SvgHome.defaultProps = {
  active: false,
  size: 20
};

SvgHome.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgHome;
