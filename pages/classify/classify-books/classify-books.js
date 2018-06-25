// pages/classify/classify-books/classify-books.js
var Cloud = require('../../../utils/av-weapp-min.js');
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
    // console.log(options);
    var _This = this;
    var bookId = options.id||'1';
    //创建查询对象
    var query = new Cloud.Query('Books');
    //指定查询条件，classify指LeanCloud数据表中每条数据的分类字段名
    //bookId是从分类主页面获取过来的被点击元素的ID号
    query.equalTo('classify',bookId);
    //执行查询
    query.find().then(function(res){
      // console.log(res);
      //处理查询结果数据包
      var arr=[];
      var Len = res.length;
      for(var i=0;i<Len;i++){
        res[i].attributes.objectId = res[i].id; //在原始数据包中的attributes中添加一个图书的objectId
        //过滤数据后放入新的数组
        arr.push(res[i].attributes)
      }
      console.log(arr);
      _This.setData({
        booksData:arr
      })
    })
  },
  onBookTap:function(ev){

    var bId = ev.currentTarget.dataset.id;
    // console.log(bId);
    wx.navigateTo({
      url: '../classify-one/classify-one?id='+bId,
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
