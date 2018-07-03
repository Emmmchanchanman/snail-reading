// pages/my/manage/manage.js
var Cloud = require('../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _This = this;
    //创建查询对象
    var query = new Cloud.Query('Books');
    var query1 = new Cloud.Query('Books');
    query1.equalTo('isCollected', true);
    query1.find().then(function (res) {
      console.log(res);
      var carr = [];
      var Len = res.length;
      for (var i = 0; i < Len; i++) {
        res[i].attributes.isCheck = false;
        res[i].attributes.objectId = res[i].id;
        carr.push(res[i].attributes);
      }
      console.log("\n\ncarr");
      console.log(carr);
      _This.setData({
        colData: carr
      })
    })
    //执行查询
    query.find().then(function(res) {
      // console.log(res);
      //处理查询结果数据包
      var arr = [];
      var Len = res.length;
      var date = new Date();
      for (var i = 0; i < Len; i++) {
        res[i].attributes.whetherCheck = false;
        res[i].attributes.isShow = false;
        res[i].attributes.objectId = res[i].id; //在原始数据包中的attributes中添加一个图书的objectId
        date = res[i].createdAt;
        res[i].attributes.createdAt = date.toLocaleDateString();
        arr.push(res[i].attributes)
      }
      // console.log(arr);
      _This.setData({
        booksData: arr
      })
    })
    wx.setNavigationBarTitle({
      title: '图书管理'
    })

  },
  onShowTap: function(ev) {
    var iId = ev.currentTarget.dataset.iconid;
    console.log(iId);    
    var bookdata = this.data.booksData;
    console.log(bookdata); 
    for (var i = 0; i < bookdata.length; i++) {
      if (bookdata[i].objectId == iId) {
        // console.log(bookdata[i].objectId); 
        // console.log(bookdata[0].whetherCheck); 
        bookdata[i].isShow = !bookdata[i].isShow;
        // console.log(bookdata[0].whetherCheck); 

      }
    }
    // console.log(bookdata);

    this.setData({
      booksData: bookdata
    })

  },
  /*-------------------点击跳转编辑页面------------------------------ */
  onEditTap: function(ev) {
    var bId = ev.currentTarget.dataset.editid;

    var book = new Cloud.Object.createWithoutData('Books', bId);
    var bookdata = this.data.booksData;
    for (var i = 0; i < bookdata.length; i++) {
      if (bookdata[i].whetherCheck && bookdata[i].objectId == bId) {
        console.log("success" + bookdata[i].whetherCheck);
        console.log("success" + bookdata[i].objectId);
        wx.navigateTo({
          url: '../editbook/editbook?editid=' + bId
        })
      }
      else if (!bookdata[i].whetherCheck && bookdata[i].objectId == bId) {
        console.log(bookdata[i].whetherCheck);
        console.log(bookdata[i].objectId);
        wx.showToast({
          title: '没有选中编辑对象',
          icon: 'none'
        })
      }
    }
    book.save().then(function (res) {
      console.log(res);

    })
   

  },

  /*-------------------切换页面------------------------------ */

  onTabTap: function(ev) {
    var bool = ev.currentTarget.dataset.bool;
    bool = JSON.parse(bool); //将字符串类型的bool转换成bool型
    console.log(typeof bool);
    this.setData({
      isActive: bool
    })
  },

  /*-------------------所有图书点击删除------------------------------ */
  onDelTap: function(ev) {
    var data = ev.currentTarget.dataset.id;
    var book = new Cloud.Object.createWithoutData('Books', data);
    var bookdata = this.data.booksData;
    
    for (var i = 0; i <bookdata.length; i++) {
      if (bookdata[i].whetherCheck && bookdata[i].objectId == data) {
        console.log("success"+bookdata[i].whetherCheck);
        console.log("success"+bookdata[i].objectId);
        
        wx.showModal({
          title: '提示',
          content: '是否删除',
          success: function(res) {
            if (res.confirm) {
              book.destroy().then(function(success) {
                wx.showToast({
                  title: '删除成功'
                })
              }, function(error) {});
              console.log('用户点击确定');
              wx.redirectTo({
                url: 'manage'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        
      }
      else if(!bookdata[i].whetherCheck && bookdata[i].objectId == data){
        console.log(bookdata[i].whetherCheck);
        console.log(bookdata[i].objectId);
        wx.showToast({
          title: '没有选中删除对象',
          icon:'none'
        })
      }
    }
    book.save().then(function(res) {    
      console.log(res);
      
    })

  },

  /*-------------------------------所有图书勾框框---------------------------------*/
  onCheckTap: function(ev) {
    var cId = ev.currentTarget.dataset.checkid;
    // console.log(cId);    
    var bookdata = this.data.booksData;
    // console.log(bookdata); 
    for (var i = 0; i < bookdata.length; i++) {
      if (bookdata[i].objectId == cId) {
        // console.log(bookdata[i].objectId); 
        // console.log(bookdata[0].whetherCheck); 
        bookdata[i].whetherCheck = !bookdata[i].whetherCheck;
        // console.log(bookdata[0].whetherCheck); 

      }
    }
    // console.log(bookdata);

    this.setData({
      booksData: bookdata
    })
  },

  /*------------------收藏icon----------------------- */
  onCheckIconTap: function (ev) {
    var n = ev.currentTarget.dataset.num;
    var deskdata = this.data.colData; 
    deskdata[n].isCheck = !deskdata[n].isCheck;
    this.setData({
      colData: deskdata
    })
  },


  /*-------------------收藏删除-------------------- */
  onDelIconTap: function () {
    var _This = this;
    //找到书桌中所有被勾选的图书ID
    var delArr = [];
    var deskdata = this.data.colData;
    var Len = deskdata.length;
    for (var i = 0; i < Len; i++) {
      if (deskdata[i].isCheck) {
        delArr.push(deskdata[i].objectId);
      }
    }
    console.log(delArr);
    //  存储待更新的对象
    var obj = [];

    for (var i = 0; i < delArr.length; i++) {
      var book = new Cloud.Object.createWithoutData('Books', delArr[i]);
      book.set('isCollected', false);
      obj.push(book);
    }
    Cloud.Object.saveAll(obj).then(function (res) {
      console.log("del" + res);
      //var deleted=[];
      for (var i = 0; i < res.length; i++) {
        var bId = res[i].id;
        for (var j = 0; j < Len; j++) {
          if (deskdata[j].objectId == bId) {
            //  deskdata[j].isAdd = false;
            console.log(deskdata[j])
            deskdata.splice(j, 1);
          }
        }
        // deleted.push(res[i].id)
      }
      _This.setData({
        colData: deskdata
      })
      console.log(_This.data.colData);
    })
  },

  comment: function (e) {//评论
    var bookid = e.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '../comment/comment?id=' + bookid,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
