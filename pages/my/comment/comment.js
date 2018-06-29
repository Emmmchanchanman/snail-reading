var Cloud = require('../../../utils/av-weapp-min.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Num: 0,
    n: 0,
    m: 'null',
    bookid: '',
    comment: [
      { name: '内容精彩' },
      { name: '感同身受' },
      { name: '无与伦比' },
      { name: '语法精妙' },
      { name: '很感人' },
      { name: '思路很独到' },
      { name: '无语' },
      { name: '不推荐阅读' },
      { name: '干货满满' }
    ]
  },
  choose: function (e) {
    console.log("m"+e.currentTarget.dataset.m)
    this.setData({
      m: e.currentTarget.dataset.m,
    })
    
  },
  like: function (e) {
    console.log(e.currentTarget.dataset.num + 1)
    this.setData({
      n: e.currentTarget.dataset.num + 1,
    })
  },
  shuru: function (e) {
    this.setData({
      Num: e.detail.cursor,
    })
  },
  formsubmit: function (e) {
    var book = new Cloud.Object.createWithoutData('Books', this.data.bookid);
    book.set('bookComment', e.detail.value.catalogue);
    book.set('bookxing', this.data.n);
    book.save().then(function (res) {
      console.log(res);
    })
    wx.showToast({
      title: '评论成功',
      icon: 'none'
    })
    wx.redirectTo({
      url: '../manage/manage'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    that.setData({
      bookid: id
    })
    var query = new Cloud.Query('Books');
    query.equalTo('objectId', id);
    query.find().then(function (res) {
      var arr = [];
      var len = res.length;
      for (var i = 0; i < len; i++) {
        res[i].attributes.objectId = res[i].id//在原始数据包中添加图书id
        arr.push(res[i].attributes)
        console.log(res);
      }
      that.setData({
        bookData: arr,
        // oldComment:arr[0].bookComment
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})
