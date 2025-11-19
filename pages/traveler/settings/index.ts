import { Storage } from '../../../utils/storage';
import { STORAGE_KEYS, PAGES } from '../../../constants/index';

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

  /**
   * 加载设置
   */
  loadSettings() {
    const fontSize = Storage.get(STORAGE_KEYS.FONT_SIZE) || 'large';
    const soundEnabled = Storage.get(STORAGE_KEYS.SOUND_ENABLED) !== false;
    
    const fontSizeIndex = this.data.fontSizeOptions.findIndex(
      item => item.value === fontSize
    );

    this.setData({
      fontSizeIndex: fontSizeIndex >= 0 ? fontSizeIndex : 1,
      soundEnabled,
    });
  },

  /**
   * 字体大小变更
   */
  onFontSizeChange(e: any) {
    const index = e.detail.value;
    const fontSize = this.data.fontSizeOptions[index].value;

    this.setData({ fontSizeIndex: index });
    Storage.set(STORAGE_KEYS.FONT_SIZE, fontSize);

    wx.showToast({
      title: '设置已保存',
      icon: 'success',
    });

    // 刷新当前页面样式
    setTimeout(() => {
      wx.reLaunch({
        url: PAGES.TRAVELER_SETTINGS,
      });
    }, 1500);
  },

  /**
   * 声音开关变更
   */
  onSoundChange(e: any) {
    const enabled = e.detail.value;
    this.setData({ soundEnabled: enabled });
    Storage.set(STORAGE_KEYS.SOUND_ENABLED, enabled);

    wx.showToast({
      title: enabled ? '已开启声音' : '已关闭声音',
      icon: 'success',
    });
  },

  /**
   * 关于我们
   */
  showAbout() {
    wx.showModal({
      title: '关于老友行',
      content: '老友行 - 给爸妈的AI旅伴\n\n让每一次旅行都安心、舒心、贴心',
      showCancel: false,
    });
  },

  /**
   * 隐私政策
   */
  showPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们重视您的隐私保护，所有个人信息都经过加密存储，不会泄露给第三方。',
      showCancel: false,
    });
  },

  /**
   * 切换角色
   */
  async switchRole() {
    const result = await wx.showModal({
      title: '切换角色',
      content: '确定要切换为子女角色吗？',
    });

    if (result.confirm) {
      Storage.removeLastRole();
      wx.reLaunch({
        url: PAGES.ROLE_SELECT,
      });
    }
  },

  /**
   * 退出登录
   */
  async logout() {
    const result = await wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
    });

    if (result.confirm) {
      Storage.removeToken();
      Storage.removeLastRole();
      Storage.removeUserInfo();

      wx.reLaunch({
        url: PAGES.ROLE_SELECT,
      });
    }
  },
});
