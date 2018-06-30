// pages/my/editbook/editbook.js
var Cloud = require('../../../utils/av-weapp-min.js');
var bId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _This = this;
    bId = options.editid;
    // dId = options.changeid;
    // console.log(bId);
    var query = new Cloud.Query('Books');
    query.equalTo('objectId', bId);
    query.find().then(function (res) {
      console.log(res);
      res[0].attributes.objectId = res[0].id;//获取返回值里面的图书信息，并添加objectid值
      console.log(res[0].attributes.objectId);
      _This.setData({
        bookData: res[0].attributes
        // cataData: cataArr
      })
      console.log(res[0].attributes);
      
    })
  },
  onEditSubmit: function (ev) {
    var _This = this;
    // var dId = ev.currentTarget.dataset.bid;
    // console.log(ev.currentTarget.dataset);
    var book = new Cloud.Object.createWithoutData('Books', bId);
    console.log(bId);
      for (var attr in ev.detail.value) {
        book.set(attr, ev.detail.value[attr]);
      }
      //通过save方法提交到数据库
      book.save().then(function (res) {
        // console.log(res);
        wx.showToast({
          title: '更改成功',
          duration:1500
        })
      })
      wx.redirectTo({
        url: '../manage/manage'
      })
  },
  shuru: function (e) {
    this.setData({
      Num: e.detail.cursor,
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
