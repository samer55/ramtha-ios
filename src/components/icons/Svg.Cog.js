import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'react-navigation';
import { colors } from '../../constants';
import { Ionicons } from 'react-native-vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';

const SvgCog = ({ active, size }) => {
  const theme = useTheme();
  const fill = active
    ? colors.activeTintColor[theme]
    : colors.inactiveTintColor[theme];

  return (
  <FontAwesome name="user" size={size} color={fill} />
  );
};

SvgCog.defaultProps = {
  active: false,
  size: 20
};

SvgCog.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgCog;
