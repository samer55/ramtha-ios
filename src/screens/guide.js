import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Text, View ,Image,Dimensions} from 'react-native';
import { useTheme } from 'react-navigation';
import { gStyle } from '../constants';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail,B,  Left, Body, Icon,Button ,Title,Right,Content} from 'native-base';

import AutoTypingText from 'react-native-auto-typing-text';
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");



const cards = [
  {
    text: 'Card One2',
    name: `اولا: لديك عدة ابواب يرسلها لك اصدقائك اختر الباب وافتحه لتكتشف`,
    image: require('../assets/guide/1.jpeg'),
  },
  {
    text: 'Card One2',
    name: `ثانيا : مجموعة تحديات وبوابات يرسلها لك اصدقائك لكي تتفاعل وتشاركها`,
    image: require('../assets/guide/2.jpeg'),
  },
  {
    text: 'Card One24',
    name: `ثالثا : ارسل باب سري لصديقك ويمكن ايضا ان ترسله بسريه لكي لا يعلم هويتك :)`,
    image: require('../assets/guide/3.jpeg'),
  },
  {
    text: 'Card One43',
    name: `رابعا : يمكنك ارسال تحدي للجميع لكي تبدأ تحدياتك الخاصة`,
    image: require('../assets/guide/4.jpeg'),
  },
  {
    text: 'Card Oner',
    name: `خامسا : يمكنك البحث عن اصدقائك وارسال طلب صداقة من خلال شاشة اكتب لاصدقائك`,
    image: require('../assets/guide/5.jpeg'),
  },
  {
    text: 'Carrd One',
    name: `سادسا : قم بالرد على صارحات وتحديات اصدقائك واقبل التحديات`,
    image: require('../assets/guide/6.jpeg'),
  },
];
// components
import Touch from '../components/Touch';

const Guide = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Container style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>
    <Header searchBar rounded style={{width: '100%',backgroundColor: gStyle.container[theme].backgroundColor}}>

             <Body>
               <Title style={gStyle.text[theme]}>What you need ?</Title>
             </Body>
             <Right>



               <Button  transparent onPress={()=>navigation.navigate('map')}>
<Text style={gStyle.text[theme]}>Skip</Text>
               </Button>
             </Right>
 </Header>
      <Content>
      </Content>

     </Container>
  );
};

Guide.navigationOptions = {
header:null
};

Guide.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default Guide;
