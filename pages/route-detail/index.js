Page({
  data: {
    routeId: '',
    route: null,
    loading: false
  },

  onLoad(options) {
    const routeId = options.id;
    this.setData({ routeId });
    console.log('[RouteDetail] 加载线路详情:', routeId);
    
    // TODO: 加载线路详情数据
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 一键咨询
  onConsult() {
    wx.showToast({
      title: '客服咨询功能开发中',
      icon: 'none'
    });
  },

  // 为父母预订
  onBook() {
    wx.showToast({
      title: '预订功能开发中',
      icon: 'none'
    });
  }
});
