import React from 'react';
import {
  Icon,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text
} from 'react-native';
import { gStyle, images } from '../constants';

import { grey5 } from '../components/config/colors';
import { margin, padding, borderRadius } from '../components/config/spacing';
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  ProviderPropType,
  UrlTile
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 39.455872;
const LONGITUDE = -75.717271;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ContactScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  get mapType() {
    // MapKit does not support 'none' as a base map
    return this.props.provider === PROVIDER_DEFAULT
      ? MAP_TYPES.satellite
      : MAP_TYPES.satellite;
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          mapType={'mutedStandard'}
          style={styles.map}
          initialRegion={region}
        >
          <MapView.Marker
            style={{ width: 20, height: 20 }}
            coordinate={this.state.region}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text style={gStyle.Title}>Contact Info</Text>
            <Text style={[gStyle.det, gStyle.text['light']]}>
              Info@opentiq.com
            </Text>
            <Text style={[gStyle.det, gStyle.text['light']]}>
              +1(510) 957 8080
            </Text>
            <Text style={[gStyle.det, gStyle.text['light']]}>
              USA,651 N broad St,Delaware City, Delaware
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
});

export default ContactScreen;
