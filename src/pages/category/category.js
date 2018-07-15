import '../../modules/css/common.css'
import '../category/category.css'

import Vue from 'vue'
import axios from 'axios'
import url from '../../modules/js/api'

import Foot from '../../components/Foot.vue'

new Vue({
  el: '.one',
  data: {
    topLists: null,
    topIndex: 0, // 一级分类
    subData: null, // 二级分类
    rankData: null //二级分类第一个页面
  },
  created() {
    this.getTopList()
    this.getSubList(0)
  },
  methods: {
    getTopList() {
      axios.post(url.topList).then(res => {
        this.topLists = res.data.lists
      })
    },
    getSubList(index, id) {
      this.topIndex = index
      if (index === 0) {
        this.getRank()
      } else {
        axios.post(url.subList, {
          id
        }).then(res => {
          this.subData = res.data.data
        }) //根据id的不同 去获取不同的数据
      }
      console.log(index,id)
    },
    getRank() {
      axios.post(url.rank).then(res => {
        this.rankData = res.data.data
      })
    },
    toSearch(list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}` // 跳转页面的地址
    }
  },
  components: {
    Foot
  },
  filters: {
    number(price) {
      let priceStr = '' + price
      if (priceStr.indexOf('.') > -1) {
        let arr = priceStr.split('.')
        return arr[0] + '.' + (arr[1] + '0').substr(0, 2)
      } else {
        return priceStr + '.00'
      }
    }
  }
}, )
