// pages/desk/desk.js
var Cloud = require('../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   activeIndex:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _This = this;
    var query = new Cloud.Query('Books');
    query.equalTo('isAdd',true);
    query.find().then(function(res){
      // console.log(res);      
      var arr=[];
      var Len = res.length;
      for(var i=0;i<Len;i++){
        res[i].attributes.isCheck = false;
        res[i].attributes.objectId = res[i].id;
        arr.push(res[i].attributes);
      }
      // console.log(arr);
      _This.setData({
        deskData:arr
      })
    })
  },
  onShowTap:function(){
    this.setData({
      isShow:true
    })
  },
  onHideTap: function () {
    this.setData({
      isShow: false
    })
  },
  onChange:function(ev){
    // console.log(ev);
    var i = ev.detail.current;  //获取轮播组件中，当前可见的图片序号
    this.setData({
      activeIndex:i
    })
  },
  onCheckTap:function(ev){
    var n = ev.currentTarget.dataset.num;
    var deskdata = this.data.deskData;
    deskdata[n].isCheck = !deskdata[n].isCheck;
    this.setData({
      deskData:deskdata
    })
  },
  onDelTap:function(){
    var _This = this;
    //找到书桌中所有被勾选的图书ID
    var delArr=[];
    var deskdata = this.data.deskData;
    var Len = deskdata.length;
    for(var i=0;i<Len;i++){
      if(deskdata[i].isCheck){
        delArr.push(deskdata[i].objectId);
      }
    }
    console.log(delArr);
    //  存储待更新的对象
     var obj=[];

     for(var i=0;i<delArr.length;i++){
       var book = new Cloud.Object.createWithoutData('Books', delArr[i]);
       book.set('isAdd',false);
       obj.push(book);
     }
     Cloud.Object.saveAll(obj).then(function(res){
        console.log("del"+res);
        //var deleted=[];
        for(var i=0;i<res.length;i++){
          var bId = res[i].id;
          for(var j=0;j<Len;j++){
            if(deskdata[j].objectId == bId){
            //  deskdata[j].isAdd = false;
            console.log(deskdata[j])
              deskdata.splice(j,1);
            }
          }
         // deleted.push(res[i].id)
        }
        _This.setData({
          deskData:deskdata
        })
        console.log(_This.data.deskData);
     })
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
