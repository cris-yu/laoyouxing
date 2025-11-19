App({
  globalData: {
    user: null,
    lastRole: null,
  },

  onLaunch() {
    console.log('老友行小程序启动');
    
    const token = wx.getStorageSync('token');
    const lastRole = wx.getStorageSync('lastRole');

    if (token && lastRole) {
      this.navigateToHomePage(lastRole);
    } else {
      wx.reLaunch({ url: '/pages/role-select/index' });
    }
  },

  navigateToHomePage(role) {
    if (role === 'child') {
      wx.reLaunch({ url: '/pages/child/home/index' });
    } else if (role === 'traveler') {
      wx.reLaunch({ url: '/pages/traveler/home/index' });
    }
  },

  onShow(options) {
    console.log('小程序显示', options);
  },

  onHide() {
    console.log('小程序隐藏');
  },

  onError(msg) {
    console.error('小程序错误:', msg);
  },
});
