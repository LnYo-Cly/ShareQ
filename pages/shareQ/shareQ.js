
// pages/shareQ/shareQ.js
var que=''
var ans=''
Page({
  data:{
    list:[],
    total:''
  },
//页面加载
  onLoad(){

    wx.cloud.database().collection('ShareQ').get()
    .then(res=>{
        console.log("加载成功",res)
        this.setData({
         list:res.data,
         total:res.data.length
        })
    })
    .catch(res=>{
        console.error("加载失败",res)
    })
  },
  change(str){
    return String(str).replace(/[^A-Za-z0-9\u4e00-\u9FCB\u3400-\u4DB5]+/g,"")
  },
  //添加题库
  addQue(){

    que=this.change(que)
    console.log("当前输入的问题",que)
    if (que=='') {
      wx.showToast({
        title: '题目输入错误，请重试',
        duration: 1500,
        icon:'none',
      })
      return 
    }else if (ans=='') {
      wx.showToast({
        title: '答案输入错误，请重试',
        duration: 1500,
        icon:'none',
      })
      return
    }else{
    var db=wx.cloud.database()

    db.collection("ShareQ").where({
      
      question:db.RegExp({
        regexp:".*"+que,
        options:"i"
      })
    }).get({
      success:res=>{
        
       
        if (res.data.length==0) {
          console.log("还没有这个题目")
            wx.cloud.database().collection('ShareQ').add({
              data:{
                question:que,
                answer:ans
              }
            })
            .then(res =>{
        
              wx.showToast({
                title: '添加成功',
                duration: 1000,
                icon:"none"
              })
              wx.cloud.database().collection('ShareQ').get()
             .then(res=>{
                console.log("加载成功",res)
                this.setData({
                
                 total:res.data.length
                })
            })
            })
            .catch({
        
            })
            
          
        }else{
          wx.showToast({
            title: '添加失败，该题可能已经存在',
            duration: 1500,
            icon: 'none',
          })
        }
      },
      fail:res=>{
        console.log("成功，没有这个题目",res)
        
      }
      
    })
  }
    
   return
  },
  //获取题目框内容
  getQue(e){
    console.log(e.detail.value)
    que= e.detail.value
  },
  //获取答案框内容
  getAns(e){
    console.log(e.detail.value)
    ans= e.detail.value
  }
})