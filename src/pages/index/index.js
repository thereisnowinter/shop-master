import '../../modules/css/common.css'
import '../index/index.css'

import Vue from 'vue'
import axios from 'axios'
import url from '../../modules/js/api.js'
import Foot from '../../components/Foot.vue'
import Swiper from '../../components/Swiper.vue'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

new Vue({
  el:'.app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize:6,
    loading: false,// false 可以加载
    allLoaded: false, // 没有完全加载
    bannerLists: null
  },
  created() {
    this.getlists()
    this.getBanner() 
  },
  methods: {
    getlists() {
      if(this.allLoaded) return // 全部加载完成
      this.loading = true // 不能再次请求
      axios.post(url.hotLists,{
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res =>{
        let currentLists = res.data.lists
        if(currentLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if(this.lists) { // 数据更新
          this.lists = this.lists.concat(currentLists)
        } else{
          this.lists = currentLists
        }
        this.loading = false // 请求结束 就可以请求
        this.pageNum++
      }) 
    },
    getBanner() {
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    }
  },
  components: {
    Foot,
    Swiper
  }
})

