// pages/searchQ/searchQ.js

Page({

  data: {
    list:[],
    que:"",
    ans:[]
  },
  getQue(e){
    console.log(e.detail.value)
    this.setData({
      que:e.detail.value
    })

  },
  change(str){
    return String(str).replace(/[^A-Za-z0-9\u4e00-\u9FCB\u3400-\u4DB5]+/g,"")
  },
  search(){
    this.setData({
      que:this.change(this.data.que)
    })
    console.log(this.data.que)
    if(this.data.que==''){
        console.log("题目为空")
        return
    }

    wx.cloud.callFunction({
      name: "searchQues",
      data:{
        que:this.data.que
      }
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        ans:res.result.data
      })
    }
     
    )

   /*  var db=wx.cloud.database()
    console.log(db)
    db.collection("ShareQ").where({
      
      question:db.RegExp({
        regexp:".*"+this.data.que,
        options:"i"
      })
    }).get({
      success:res=>{
        console.log(res)
        this.setData({
          ans:res.data
        })
      }
    })
 */
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})