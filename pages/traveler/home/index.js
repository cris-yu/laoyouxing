Page({
  data: {
    orderId: '',
    travelerName: '',
    tripInfo: {},
    currentSegmentIndex: 0,
    audioContext: null,
  },

  onLoad(options) {
    const { orderId, travelerName } = options;
    if (orderId && travelerName) {
      this.setData({
        orderId,
        travelerName: decodeURIComponent(travelerName),
      });
      this.loadTripInfo();
    }
  },

  loadTripInfo() {
    console.log('加载行程信息');
  },

  callGuide() {
    if (this.data.tripInfo.guide) {
      wx.makePhoneCall({
        phoneNumber: this.data.tripInfo.guide.phone,
      });
    }
  },

  playAudioGuide(e) {
    console.log('播放音频讲解');
  },

  goToAICompanion() {
    wx.navigateTo({
      url: `/pages/traveler/ai-companion/index?orderId=${this.data.orderId}&travelerName=${encodeURIComponent(this.data.travelerName)}`,
    });
  },

  goToSettings() {
    wx.navigateTo({
      url: '/pages/traveler/settings/index',
    });
  },

  async requestHelp() {
    const result = await wx.showModal({
      title: '请求帮助',
      content: '确定要联系客服寻求帮助吗？',
    });

    if (result.confirm) {
      wx.showToast({
        title: '已通知客服',
        icon: 'success',
      });
    }
  },

  onShareAppMessage() {
    return {
      title: `${this.data.travelerName}的${this.data.tripInfo.productName}`,
      path: `/pages/traveler/home/index?orderId=${this.data.orderId}&travelerName=${encodeURIComponent(this.data.travelerName)}`,
    };
  },
});