Page({
  data: {
    productId: '',
    product: {},
    loading: false,
    hasFamily: false,
    showAIModal: false,
    aiResult: {},
    familyProfiles: [],
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      this.setData({ productId: id });
      this.loadProduct(id);
    }
  },

  loadProduct(id) {
    console.log('加载产品详情:', id);
  },

  askAI() {
    console.log('请求AI建议');
  },

  closeAIModal() {
    this.setData({ showAIModal: false });
  },

  stopPropagation() {},

  goToConfirm() {
    wx.navigateTo({
      url: `/pages/child/order-confirm/index?productId=${this.data.productId}`,
    });
  },
});