// pages/myHome/myHome.js
Page({
  data:{
    userinfo:''
  },
  onLoad(){
    var userinfo=wx.getStorageSync('userinfo')
    if (userinfo=='') {
      console.log("请登录")
      this.login()
    }else(
      this.setData({
        userinfo:userinfo
      })
    )
  }
  ,
  login(){
    wx.getUserProfile({
      desc: '请进行授权',
      success:res=>{
        console.log(res)
        var userinfo=res.userInfo
        wx.setStorageSync('userinfo', userinfo)
        this.setData({
          userinfo:userinfo
        })
      }
    })

  },
  logout(){
    this.setData({
      userinfo: ''
    })
    wx.setStorageSync('userinfo', null)
  }
})