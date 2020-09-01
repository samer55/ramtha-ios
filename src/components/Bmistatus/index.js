import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  LabelResult,
  CardResult,
  TextNomal,
  TextNumber,
  TextBMI,
  DescriptionResult
} from './styles';

import {
  Image,
  ScrollView,
  Text,
  Platform,
  View,
  Dimensions
} from 'react-native';
export default function Result() {
  return (
    <>
      <Container>
      <ScrollView>
        <LabelResult>Result</LabelResult>

        <CardResult>
          <TextNomal>Overweight</TextNomal>
          <TextNumber>32</TextNumber>
          <DescriptionResult>sdfsdfsdfsfsdf</DescriptionResult>
        </CardResult>

          </ScrollView>
      </Container>

    </>
  );
}

Result.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func
  }).isRequired
};
