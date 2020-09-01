import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import { Ionicons } from 'react-native-vector-icons';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from 'react-native-vector-icons';

const SvgShare = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return <MaterialCommunityIcons name="tag-multiple" size={size} color={fill} />;
};

SvgShare.defaultProps = {
  active: false,
  size: 20
};

SvgShare.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgShare;
