import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, Content, Form, Item, Input, Label,Button } from 'native-base';
import { firebaseApp } from '../../firebase'
import { ThemeContext } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import NavigationBack from '../components/NavigationBack';

// components
import Touch from '../components/Touch';

class Secure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      status:'',
      username:'',
      isDatePickerVisible: false,
      code:'',
      user:{},
      setDatePickerVisibility: false,
      Duration: '-------------',
      Additional: '-------------',
      spinner:false,
      init: true,
      errMsg: null,
      saveUpSuccess: false,
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    this.setState({spinner:true})
    firebaseApp.auth().onAuthStateChanged(user => {
if (user) {
firebaseApp.database().ref('users').child(user.uid).once('value')
       .then((snapshot) => {
      this.setState({username:snapshot.val().username})
      this.setState({user:user})

      this.setState({spinner:false})


       })

}
    })
  }
  static navigationOptions = ({ navigation,theme= useTheme() }) => ({
    headerLeft: <NavigationBack navigation={navigation} />,
    headerRight: <View style={{ flex: 1 }} />,
    headerTitleStyle: gStyle.headerTitleStyle,

  });
  hideDatePicker = () => {
    this.setState({ setDatePickerVisibility: false });
  };

  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.setState({ date: Moment(date).format('MMM Do YY') });

    this.hideDatePicker();
  };


render(){
  const {navigation}=this.props
  return (
    <ThemeContext.Consumer>
      {theme => (
    <ScrollView
      contentContainerStyle={gStyle.contentContainer}
      style={gStyle.container[theme]}
    >
    <Spinner
           visible={this.state.spinner}
           textContent={'Loading...'}
           textStyle={{color:'#fff'}}
         />
         <Text style={[gStyle.text[theme],gStyle.Title,{alignSelf: 'center'}]}>تغيير كلمة المرور</Text>
         <Text   style={[gStyle.text[theme]]}>{this.state.errMsg}</Text>

                 <Form style={{width:Dimensions.get('window').width-35}}>


                   <Item floatingLabel last>
                     <Label>كلمة المرور</Label>
                     <Input secureTextEntry={true} style={[gStyle.text[theme]]}  onChangeText={v=>{this.setState({password:v})}}/>
                   </Item>
                   <View
                     style={{
                       flex: 1,
                       padding: 20,
                       justifyContent: 'center',
                       alignItems: 'center',

                     }}
                   >
                     <Button
                       block
                       light
                       onPress={this._handleSave}
                       style={{ justifyContent: 'center', alignItems: 'center' }}
                     >
                       <Text style={[gStyle.button]}>تغيير</Text>
                     </Button>
                   </View>
                 </Form>

    </ScrollView>
  )}
</ThemeContext.Consumer>
  )
}
_handleSave = () => {
  console.log("USER EDIT SAVING...")

  if (this.state.password) {
    if (this.state.password.length < 6) {
      this.setState({ errMsg: "كلمة المرور يجب ان تكون على الاقل 6 احرف." })
    }
    else {
      this.setState({ errMsg: "جاري حفظ كلمة المرور الجديدة..." })
      this.state.user.updatePassword(this.state.password)
      .then(() => {
        this.setState({ errMsg: "تم تغيير كلمة المرور بنجاح!" })
      })
      .catch((error) => {
        this.setState({ errMsg: error.message })
      })
    }
  }
}

};

export default Secure;
