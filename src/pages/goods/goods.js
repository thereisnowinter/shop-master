import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css' 



import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from '../../modules/js/api'
import mixin from '../../modules/js/mixin'
import Swiper from '../../components/Swiper.vue'


let detailTab = ['商品详情', '本店成交']
let { id } = qs.parse(location.search.substr(1))



new Vue({
  el: '.three',
  data: {
    details: null,
    detailTab,
    tabIndex: 0,
    dealLists: null,
    swipeLists: [],
    showSku: false,
    skuType: 1,
    skuNum: 1,
    isAddCart: false,
    showAddMessage: false
  },
  created() {
    this.getDetails()
  },
  methods: {
    getDetails() {
      axios.post(url.details, { id }).then(res => {
        // 先修改数据结构，再赋值
        let data = res.data.data
        data.skuList.forEach(sku => {
          let lists = []
          sku.lists.forEach(item => {
            lists.push({
              active: false,
              tag: item
            })
          })
          sku.lists = lists
        })

        this.details = data
        this.details.imgs.forEach(item => {
          this.swipeLists.push({
            clickUrl: '',
            image: item
          })
        })
      })
    },
    changeTabIndex(index) {
      this.tabIndex = index
      if (index) {
        this.getDeal()
      }
    },
    getDeal() {
      axios.post(url.deal, { id }).then(res => {
        this.dealLists = res.data.data.lists
      })
    },
    chooseSku(type) {
      this.showSku = true
      this.skuType = type
    },
    chooseTag(item, index, arr) {
      if (item.active) {
        item.active = false
      } else {
        arr.forEach((cur, i) => {
          cur.active = i === index
        })
      }
    },
    changeSkuNum(num) {
      if (num < 0 && this.skuNum === 1) return
      this.skuNum += num
    },
    addCart() {
      axios(url.cartAdd, {id, number: this.skuNum}).then(res => {
        if(res.data.status === 200 ){
          this.isAddCart = true
          this.showSku = false
          this.showAddMessage = true
          setTimeout(() => {
            this.showAddMessage = false
          },1000)
        }
      })
    }
  },
  components: {
    Swiper
  },
  watch: {
    showSku(val) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  },
  mixins: [mixin]
})