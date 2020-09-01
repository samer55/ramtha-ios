import { observable, autorun } from 'mobx'
import { AsyncStorage } from 'react-native';

class AppStore {
  constructor() {
   isAuthenticating = true

   AsyncStorage.getItem('place').then((value) => {
   this.place =value.length>0?value:'Ramtha'
   });
 }
  @observable username = ''
  @observable name = ''
  @observable place = 'Ramtha'
  @observable saveduid = ['ddd']

   @observable user = {}
   @observable post_count = 0
   @observable Requests_count = 0
   @observable Saved_count = 0
   @observable name = ''
   @observable email = ''
   @observable Admin = false
   @observable currentopened = []

   @observable order_count = 0
   @observable chat_count = 0
   @observable new_messages = 0
   @observable current_page = ''
   @observable current_puid = ''
@observable type = ''
@observable profileimg = ''
@observable counter = 0;
  increment() { this.counter++;
  console.log("increment", this.counter); }
@observable isTeacher = false
change() { this.arabic =true }
@observable arabic = null
@observable map = null
}

const appStore = new AppStore()

/*
autorun(() => {
  console.log(appStore)
})
*/

export default appStore
