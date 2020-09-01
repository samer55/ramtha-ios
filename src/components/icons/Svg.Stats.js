import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const SvgStats = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return (
   <Ionicons name="ios-more" size={size} color={fill} />
  );
};

SvgStats.defaultProps = {
  active: false,
  size: 20
};

SvgStats.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgStats;
