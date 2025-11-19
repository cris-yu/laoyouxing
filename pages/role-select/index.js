const { authApi } = require('../../utils/api');
const { Storage } = require('../../utils/storage');
const { PAGES } = require('../../constants/index');

Page({
  data: {
    loading: false,
  },

  async selectRole(e) {
    const role = e.currentTarget.dataset.role;
    
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    wx.showLoading({ title: '登录中...' });

    try {
      const loginRes = await wx.login();
      const code = loginRes.code;

      const res = await authApi.login(code, role);

      if (res.data) {
        const { token, user } = res.data;

        Storage.setToken(token);
        Storage.setLastRole(role);
        Storage.setUserInfo(user);

        const app = getApp();
        app.globalData.user = { ...user, token };
        app.globalData.lastRole = role;

        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
        });

        setTimeout(() => {
          if (role === 'child') {
            wx.reLaunch({ url: PAGES.CHILD_HOME });
          } else {
            wx.reLaunch({ url: PAGES.TRAVELER_HOME });
          }
        }, 1500);
      }
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none',
      });
      this.setData({ loading: false });
    }
  },
});
