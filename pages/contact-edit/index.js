Page({
  data: {
    index: -1, // -1表示新增，>=0表示编辑
    name: '',
    relation: '',
    phone: ''
  },

  onLoad(options) {
    if (options.index !== undefined) {
      // 编辑模式
      this.setData({
        index: parseInt(options.index),
        name: options.name || '',
        relation: options.relation || '',
        phone: options.phone || ''
      });
    }
  },

  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },

  onRelationInput(e) {
    this.setData({ relation: e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  onSave() {
    const { index, name, relation, phone } = this.data;
    
    if (!name || !relation || !phone) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    
    // 获取现有联系人列表
    let contacts = wx.getStorageSync('emergencyContacts') || [];
    
    if (index === -1) {
      // 新增
      contacts.push({ name, relation, phone });
    } else {
      // 编辑
      contacts[index] = { name, relation, phone };
    }
    
    // 保存
    wx.setStorageSync('emergencyContacts', contacts);
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
    
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
