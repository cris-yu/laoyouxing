import { travelerApi, audioApi, helpApi } from '../../../utils/api';
import { TravelerTripInfo } from '../../../types/index';
import { PAGES, STORAGE_KEYS } from '../../../constants/index';

Page({
  data: {
    orderId: '',
    travelerName: '',
    tripInfo: {} as TravelerTripInfo,
    currentSegmentIndex: 0,
    audioContext: null as WechatMiniprogram.InnerAudioContext | null,
  },

  onLoad(options: any) {
    const { orderId, travelerName } = options;
    if (orderId && travelerName) {
      this.setData({
        orderId,
        travelerName: decodeURIComponent(travelerName),
      });
      this.loadTripInfo();
    } else {
      wx.showToast({
        title: '缺少行程信息',
        icon: 'none',
      });
    }

    // 应用字体大小设置
    this.applyFontSize();
  },

  onUnload() {
    // 停止音频播放
    if (this.data.audioContext) {
      this.data.audioContext.stop();
      this.data.audioContext.destroy();
    }
  },

  /**
   * 加载行程信息
   */
  async loadTripInfo() {
    wx.showLoading({ title: '加载中...' });

    try {
      const res = await travelerApi.trip(this.data.orderId, this.data.travelerName);
      
      if (res.data) {
        this.setData({
          tripInfo: res.data,
        });
      }

      wx.hideLoading();
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none',
      });
    }
  },

  /**
   * 应用字体大小设置
   */
  applyFontSize() {
    const fontSize = wx.getStorageSync(STORAGE_KEYS.FONT_SIZE) || 'large';
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    
    if (currentPage) {
      // 移除所有字体类
      const classList = ['normal-font', 'large-font', 'extra-large-font'];
      classList.forEach(cls => {
        // 微信小程序页面类名操作需要通过其他方式
      });
    }
  },

  /**
   * 拨打导游电话
   */
  callGuide() {
    if (this.data.tripInfo.guide) {
      wx.makePhoneCall({
        phoneNumber: this.data.tripInfo.guide.phone,
      });
    }
  },

  /**
   * 播放音频讲解
   */
  async playAudioGuide(e: any) {
    const segmentId = e.currentTarget.dataset.id;
    
    wx.showLoading({ title: '加载中...' });

    try {
      const res = await audioApi.guide(this.data.orderId, segmentId);
      
      wx.hideLoading();

      if (res.data) {
        const { audioUrl, script } = res.data;

        if (audioUrl) {
          // 播放音频文件
          this.playAudio(audioUrl);
        } else if (script) {
          // 使用 TTS 播放文本
          wx.showModal({
            title: '讲解内容',
            content: script,
            showCancel: false,
          });
        }
      }
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '加载讲解失败',
        icon: 'none',
      });
    }
  },

  /**
   * 播放音频
   */
  playAudio(url: string) {
    if (this.data.audioContext) {
      this.data.audioContext.stop();
    }

    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = url;
    innerAudioContext.play();

    innerAudioContext.onError((error) => {
      wx.showToast({
        title: '播放失败',
        icon: 'none',
      });
    });

    this.setData({
      audioContext: innerAudioContext,
    });
  },

  /**
   * 前往 AI 旅伴页面
   */
  goToAICompanion() {
    wx.navigateTo({
      url: `${PAGES.TRAVELER_AI_COMPANION}?orderId=${this.data.orderId}&travelerName=${encodeURIComponent(this.data.travelerName)}`,
    });
  },

  /**
   * 前往设置页面
   */
  goToSettings() {
    wx.navigateTo({
      url: PAGES.TRAVELER_SETTINGS,
    });
  },

  /**
   * 请求帮助
   */
  async requestHelp() {
    const result = await wx.showModal({
      title: '请求帮助',
      content: '确定要联系客服寻求帮助吗？我们会尽快与您联系。',
      confirmText: '确定',
      cancelText: '取消',
    });

    if (result.confirm) {
      wx.showLoading({ title: '提交中...' });

      try {
        await helpApi.create({
          orderId: this.data.orderId,
          travelerName: this.data.travelerName,
          locationLabel: '当前位置',
        });

        wx.hideLoading();
        wx.showToast({
          title: '已通知客服，请稍候',
          icon: 'success',
        });
      } catch (error) {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none',
        });
      }
    }
  },

  /**
   * 分享行程
   */
  onShareAppMessage() {
    return {
      title: `${this.data.travelerName}的${this.data.tripInfo.productName}`,
      path: `/pages/traveler/home/index?orderId=${this.data.orderId}&travelerName=${encodeURIComponent(this.data.travelerName)}`,
    };
  },
});
