Page({
  data: {
    tripId: '',
    trip: null,
    loading: false
  },

  onLoad(options) {
    const tripId = options.id;
    this.setData({ tripId });
    console.log('[TripDetail] 加载行程详情:', tripId);
    
    // TODO: 加载行程详情数据
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 一键联系导游
  callGuide() {
    wx.makePhoneCall({
      phoneNumber: '13800138000'
    });
  },

  // 一键联系子女
  callFamily() {
    wx.makePhoneCall({
      phoneNumber: '13600136000'
    });
  },

  // 紧急联系
  callEmergency() {
    wx.showActionSheet({
      itemList: ['120急救', '110报警', '旅行社值班电话'],
      success: (res) => {
        const phones = ['120', '110', '400-888-6666'];
        wx.makePhoneCall({
          phoneNumber: phones[res.tapIndex]
        });
      }
    });
  }
});
