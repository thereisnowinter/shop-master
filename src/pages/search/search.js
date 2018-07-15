import '../../modules/css/common.css'
import './search.css' 

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from '../../modules/js/api'
import mixin from '../../modules/js/mixin'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)


let {keyword, id} = qs.parse(location.search.substr(1))

new Vue({
  el: '.two',
  data: {
    searchList: null,
    keyword,
    show: true
  },
  created() {
    this.getsearchList()
  },
  methods: {
    getsearchList() {
      axios.post(url.searchList, {keyword, id}).then(res => {
        this.searchList = res.data.lists
      })
    },
    // move(){
    //   if(document.body.scrollTop > 40) {
    //     console.log(document.body.scrollTop)
    //     this.show = true
    //   } else {
    //     this.show = false
    //   }
    // },
    toTop() { //引用库
      window.scrollTo(0,0)
    }
  },
  mixins: [mixin]
})