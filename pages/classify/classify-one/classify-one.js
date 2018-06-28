// pages/classify/classify-one/classify-one.js
var Cloud = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _This = this;
    var bId = options.id;
    // console.log(bId);
    var query  = new Cloud.Query('Books');
    query.equalTo('objectId',bId);
    query.find().then(function(res){
      console.log(res);
      res[0].attributes.objectId = res[0].id;//获取返回值里面的图书信息，并添加objectid值
      var cataArr = res[0].attributes.catalogue.split('$'); //获取目录数据并转换为数组格式
      console.log(cataArr);
      _This.setData({
      bookData:res[0].attributes,
      cataData:cataArr
      })
    })
    
  },
  onTabTap:function(ev){
    var bool = ev.currentTarget.dataset.bool;
    bool = JSON.parse(bool); //将字符串类型的bool转换成bool型
    console.log(typeof bool);
    this.setData({
      isActive:bool
    })
  },

  onAddTap:function(ev){
    var data = ev.currentTarget.dataset;
    console.log(data);
    var book = new Cloud.Object.createWithoutData('Books',data.id);
    var newData = this.data.bookData;
    var msg = '';
    //方法1:
    var bool = !data.add;
    console.log(bool);
    book.set('isAdd', bool);
    msg = bool?'加入书桌成功' : '移出书桌成功';
    newData.isAdd = bool;
    this.setData({
      bookData:newData
    })
    // 方法2:
    // if(data.add){  //判断按钮点击前的isAdd的状态
    //   book.set('isAdd',false);
    //   newData.isAdd = false;
    //   msg='移出书桌成功';
    //   this.setData({
    //     bookData:newData
    //   })
    // }else{
    //   book.set('isAdd',true);
    //   newData.isAdd = true;
    //   msg='加入书桌成功';
    // }
    book.save().then(function(){
      wx.showToast({
        title: msg,
      })
    })
  },

/* ----------------点击收藏---------------------------*/
  onCollectTap: function (ev) {
    var cdata = ev.currentTarget.dataset;
    console.log(cdata);
    var book = new Cloud.Object.createWithoutData('Books', cdata.coid);
    var newData = this.data.bookData;
    var msg = '';
    //方法1:
    console.log(newData);
    var bool = !cdata.cadd;
    console.log(bool);
    book.set('isCollected', bool);
    msg = bool ? '收藏成功' : '取消收藏';
    newData.isCollected = bool;
    this.setData({
      bookData: newData
    })
    console.log(newData);
    book.save().then(function () {
      wx.showToast({
        title: msg,
      })
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
