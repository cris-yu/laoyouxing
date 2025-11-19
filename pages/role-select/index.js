const { authApi } = require('../../utils/api');
const { Storage } = require('../../utils/storage');
const { PAGES } = require('../../constants/index');

// 开发模式：跳过真实登录，直接使用模拟数据
const DEV_MODE = true;

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
      // 开发模式：跳过真实API调用
      if (DEV_MODE) {
        // 使用模拟数据
        const mockUser = {
          id: 'user_' + Date.now(),
          role: role,
          nickname: role === 'child' ? '子女用户' : '出行人',
          avatarUrl: '',
        };
        const mockToken = 'mock_token_' + Date.now();

        Storage.setToken(mockToken);
        Storage.setLastRole(role);
        Storage.setUserInfo(mockUser);

        const app = getApp();
        app.globalData.user = { ...mockUser, token: mockToken };
        app.globalData.lastRole = role;

        wx.hideLoading();
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1000,
        });

        setTimeout(() => {
          if (role === 'child') {
            wx.reLaunch({ url: PAGES.CHILD_HOME });
          } else {
            wx.reLaunch({ url: PAGES.TRAVELER_HOME });
          }
        }, 1000);
        
        return;
      }

      // 生产模式：真实API调用
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
