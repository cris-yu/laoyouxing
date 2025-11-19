const { getMyTrips } = require('../../utils/request.js');

Page({
  data: {
    trips: [],
    loading: false
  },

  onLoad() {
    console.log('[Trip] 页面加载');
    this.loadTrips();
  },

  onShow() {
    console.log('[Trip] 页面显示');
    // 每次显示时刷新列表
    this.loadTrips();
  },

  /**
   * 加载行程列表
   */
  loadTrips() {
    this.setData({ loading: true });
    
    getMyTrips()
      .then(res => {
        console.log('[Trip] 加载到行程数量:', res.data.length);
        this.setData({
          trips: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.error('[Trip] 加载失败:', err);
        this.setData({ loading: false });
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
      });
  },

  /**
   * 跳转到行程详情
   */
  goToDetail(e) {
    const tripId = e.currentTarget.dataset.id;
    console.log('[Trip] 跳转到行程详情:', tripId);
    
    wx.navigateTo({
      url: `/pages/trip-detail/index?id=${tripId}`
    });
  }
});
