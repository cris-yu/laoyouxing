Page({
  data: {
    userInfo: {
      avatarUrl: 'https://via.placeholder.com/200x200/667eea/ffffff?text=头像',
      nickname: '张大爷'
    },
    
    // 紧急联系人列表
    emergencyContacts: [],
    
    // 常用出发地
    favoriteCities: []
  },

  onLoad() {
    console.log('[Profile] 页面加载');
    this.loadUserData();
  },

  onShow() {
    console.log('[Profile] 页面显示');
    this.loadUserData();
  },

  /**
   * 加载用户数据
   */
  loadUserData() {
    // 从本地存储加载数据
    try {
      const contacts = wx.getStorageSync('emergencyContacts') || [];
      const cities = wx.getStorageSync('favoriteCities') || [];
      
      this.setData({
        emergencyContacts: contacts,
        favoriteCities: cities
      });
    } catch (e) {
      console.error('[Profile] 加载用户数据失败:', e);
    }
  },

  /**
   * 添加/编辑紧急联系人
   */
  goToAddContact() {
    wx.navigateTo({
      url: '/pages/contact-edit/index'
    });
  },

  /**
   * 编辑联系人
   */
  editContact(e) {
    const index = e.currentTarget.dataset.index;
    const contact = this.data.emergencyContacts[index];
    
    wx.navigateTo({
      url: `/pages/contact-edit/index?index=${index}&name=${contact.name}&relation=${contact.relation}&phone=${contact.phone}`
    });
  },

  /**
   * 删除联系人
   */
  deleteContact(e) {
    const index = e.currentTarget.dataset.index;
    const contact = this.data.emergencyContacts[index];
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除联系人"${contact.name}"吗？`,
      confirmText: '删除',
      confirmColor: '#f44336',
      success: (res) => {
        if (res.confirm) {
          const contacts = this.data.emergencyContacts;
          contacts.splice(index, 1);
          
          this.setData({ emergencyContacts: contacts });
          
          // 保存到本地存储
          wx.setStorageSync('emergencyContacts', contacts);
          
          wx.showToast({
            title: '已删除',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 设置常用出发地
   */
  setCities() {
    const cities = this.data.favoriteCities;
    const allCities = ['北京', '天津', '石家庄', '廊坊', '保定', '唐山'];
    
    wx.showActionSheet({
      itemList: allCities,
      success: (res) => {
        const selectedCity = allCities[res.tapIndex];
        
        if (!cities.includes(selectedCity)) {
          cities.push(selectedCity);
          this.setData({ favoriteCities: cities });
          wx.setStorageSync('favoriteCities', cities);
          
          wx.showToast({
            title: '已添加',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '已存在该城市',
            icon: 'none'
          });
        }
      }
    });
  },

  /**
   * 删除常用出发地
   */
  deleteCity(e) {
    const index = e.currentTarget.dataset.index;
    const cities = this.data.favoriteCities;
    cities.splice(index, 1);
    
    this.setData({ favoriteCities: cities });
    wx.setStorageSync('favoriteCities', cities);
  },

  /**
   * 关于我们
   */
  goToAbout() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  /**
   * 用户协议
   */
  goToAgreement() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  /**
   * 隐私政策
   */
  goToPrivacy() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  }
});
