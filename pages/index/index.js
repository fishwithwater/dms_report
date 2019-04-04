//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    fixContentRange: ["维修管道", "拆表测压", "冲洗管道", "换表校表", "开停水", "空跑", "修换表节", "修换阀门", "修换分水器", "修换消防栓", "重单", "其他"],
    breakContentRange: ["断裂", "腐朽", "老化", "砂眼", "其他"],
    reasonContentRange: ["自然爆管", "人为爆管", "正常漏水", "其他"],
    materialContentRange: ["钢", "球墨", "塑料", "铸铁", "砼", "其他"],
    fixContentIndex: 0,
    breakContentIndex: 0,
    reasonContentIndex: 0,
    materialContentIndex: 0
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow() {
    const date = new Date()
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDay() > 10 ? date.getDay() : '0' + date.getDay()}`
    const timeStr = `${date.getHours() > 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()}`
    console.log(dateStr)
    this.setData({
      date: dateStr,
      time: timeStr
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  selectFixContent(e) {
    this.setData({
      fixContentIndex: e.detail.value
    })
  },
  selectBreakContent(e) {
    this.setData({
      breakContentIndex: e.detail.value
    })
  },
  selectReasonContent(e) {
    this.setData({
      reasonContentIndex: e.detail.value
    })
  },
  selectMaterialContent(e) {
    this.setData({
      materialContentIndex: e.detail.value
    })
  },
  onGetLocation(e) {
    const addressDisAble = this.data.addressDisAble
    let that = this
    if (!addressDisAble) {
      that.setData({
        addressDisAble: true
      })
      wx.chooseLocation({
        success(e) {
          that.setData({
            address: e.address,
          })
          setTimeout(() => {
            that.setData({
              addressDisAble: false
            })
          }, 200)
        }
      })
    }
  },
  selectFixDate(e){
    this.setData({
      date:e.detail.value
    })
  },
  selectFixTime(e) {
    this.setData({
      time: e.detail.value
    })
  }
})