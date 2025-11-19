Page({
  data: {
    products: [],
    loading: false,
    refreshing: false,
    departureCities: ['北京', '上海', '广州', '深圳', '成都', '杭州'],
    selectedCity: '',
    selectedDate: '',
    selectedIntensity: '',
    selectedIntensityText: '',
    intensityOptions: [
      { value: 'low', label: '轻松' },
      { value: 'medium', label: '适中' },
      { value: 'high', label: '较高' },
    ],
  },

  onLoad() {
    this.loadProducts();
  },

  loadProducts() {
    console.log('加载产品列表');
  },

  onRefresh() {
    this.setData({ refreshing: true });
    this.loadProducts();
  },

  onDepartureCityChange(e) {
    const index = e.detail.value;
    const city = this.data.departureCities[index];
    this.setData({ selectedCity: city });
    this.loadProducts();
  },

  onDateChange(e) {
    this.setData({ selectedDate: e.detail.value });
    this.loadProducts();
  },

  onIntensityChange(e) {
    const index = e.detail.value;
    const option = this.data.intensityOptions[index];
    this.setData({
      selectedIntensity: option.value,
      selectedIntensityText: option.label,
    });
    this.loadProducts();
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/child/product-detail/index?id=${id}`,
    });
  },
});