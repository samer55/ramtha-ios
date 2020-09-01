import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle, colors } from '../constants';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import { Form, Item, Picker, Icon } from 'native-base';
import { Button } from 'native-base';

// components
import Touch from '../components/Touch';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ThemeContext } from 'react-navigation';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '-------------',
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      Duration: '-------------',
      Additional: '-------------'
    };
  }
  onValueChange2(value: string) {
    this.setState({
      Additional: value
    });
  }
  onValueChange1(value: string) {
    this.setState({
      Duration: value
    });
  }
  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true });
  };

  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({ date: Moment(date).format('MMM Do YY') });

    this.hideDatePicker();
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <ScrollView
            contentContainerStyle={gStyle.contentContainer}
            style={gStyle.container[theme]}
          >
            <DateTimePickerModal
              isDarkModeEnabled={true}
              isVisible={this.state.setDatePickerVisibility}
              mode="date"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,

                width: Dimensions.get('window').width
              }}
            >
              <Text style={[gStyle.Title, gStyle.text[theme]]}>
                Booking details
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'row',
                width: Dimensions.get('window').width
              }}
            >
              <Text style={[gStyle.det, gStyle.text[theme]]}>Date Start</Text>
              <Text style={[gStyle.selected, gStyle.text[theme]]}>
                {this.state.date}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'row',
                width: Dimensions.get('window').width
              }}
            >
              <Text style={[gStyle.det, gStyle.text[theme]]}>Duration</Text>
              <Text style={[gStyle.selected, gStyle.text[theme]]}>
                {this.state.Duration}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'row',
                width: Dimensions.get('window').width
              }}
            >
              <Text style={[gStyle.det, gStyle.text[theme]]}>
                Additional Offers
              </Text>
              <Text style={[gStyle.selected, gStyle.text[theme]]}>
                {this.state.Additional}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                marginLeft: 10,
                marginRight: 10,
                width: Dimensions.get('window').width - 30,
                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'row'
              }}
            >
              <Text style={[gStyle.selected, gStyle.text[theme]]}>
                Booking Total
              </Text>
              <Text style={[gStyle.selected, gStyle.text[theme]]}>34$</Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',

                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
                width: Dimensions.get('window').width - 30
              }}
            >
              <Text style={[gStyle.selected, gStyle.text[theme]]}>
                Additional Total
              </Text>
              <Text style={[gStyle.selected, gStyle.text[theme]]}>3$</Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',

                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
                width: Dimensions.get('window').width - 30
              }}
            >
              <Text style={[gStyle.det, gStyle.text[theme]]}>Total</Text>
              <Text style={[gStyle.selected, gStyle.text[theme]]}>3$</Text>
            </View>
            <View
              style={{
                borderBottomColor: gStyle.text[theme].color,
                marginVertical: 5,
                width: Dimensions.get('window').width,
                borderBottomWidth: 0.2
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginVertical: 10,
                marginHorizontal: 10,

                width: Dimensions.get('window').width
              }}
            >
              <Text style={[gStyle.det, gStyle.text[theme]]}>
                Select Date Start :
              </Text>
            </View>
            <Button
              bordered
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: gStyle.text[theme].color,
                padding: 15,
                marginHorizontal: 20
              }}
              onPress={this.showDatePicker}
            >
              <Text style={gStyle.text[theme]}>Select Date Start</Text>
            </Button>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginVertical: 10,
                marginHorizontal: 10,

                width: Dimensions.get('window').width
              }}
            >
              <Text style={[gStyle.det, gStyle.text[theme]]}>Duration :</Text>
            </View>

              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select Duration"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  textStyle={gStyle.text[theme]}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.Duration}
                  onValueChange={this.onValueChange1.bind(this)}
                >
                  <Picker.Item label="1 Months" value="1 Months" />
                  <Picker.Item label="2 Months" value="2 Months" />
                  <Picker.Item label="3 Months" value="3 Months" />
                  <Picker.Item label="6 Months" value="6 Months" />
                </Picker>
              </Item>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginVertical: 10,
                marginHorizontal: 10,

                width: Dimensions.get('window').width
              }}
            >
              <Text style={[gStyle.det, gStyle.text[theme]]}>
                Additional Offer :
              </Text>
            </View>


              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select an Additional offers"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  textStyle={gStyle.text[theme]}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.Additional}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Sauna" value="Sauna" />
                  <Picker.Item label="Body Test" value="Body Test" />
                  <Picker.Item label="Special coach" value="Special coach" />
                  <Picker.Item label="Consulting" value="Consulting" />
                </Picker>
              </Item>
          
            <View
              style={{
                flex: 1,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('window').width
              }}
            >
              <Button
                block
                light
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={[gStyle.button]}>Book now</Text>
              </Button>
            </View>
          </ScrollView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Booking;
