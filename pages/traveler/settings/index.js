Page({
  data: {
    fontSizeOptions: [
      { value: 'normal', label: '标准' },
      { value: 'large', label: '大字体（推荐）' },
      { value: 'extra-large', label: '超大字体' },
    ],
    fontSizeIndex: 1,
    soundEnabled: true,
  },

  onLoad() {
    this.loadSettings();
  },

  loadSettings() {
    console.log('加载设置');
  },

  onFontSizeChange(e) {
    const index = e.detail.value;
    this.setData({ fontSizeIndex: index });
    wx.showToast({
      title: '设置已保存',
      icon: 'success',
    });
  },

  onSoundChange(e) {
    const enabled = e.detail.value;
    this.setData({ soundEnabled: enabled });
    wx.showToast({
      title: enabled ? '已开启声音' : '已关闭声音',
      icon: 'success',
    });
  },

  showAbout() {
    wx.showModal({
      title: '关于老友行',
      content: '老友行 - 给爸妈的AI旅伴',
      showCancel: false,
    });
  },

  showPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们重视您的隐私保护',
      showCancel: false,
    });
  },

  async switchRole() {
    const result = await wx.showModal({
      title: '切换角色',
      content: '确定要切换为子女角色吗？',
    });

    if (result.confirm) {
      wx.reLaunch({
        url: '/pages/role-select/index',
      });
    }
  },

  async logout() {
    const result = await wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
    });

    if (result.confirm) {
      wx.reLaunch({
        url: '/pages/role-select/index',
      });
    }
  },
});