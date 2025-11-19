const { products, getProducts } = require('../../../data/products.js');

console.log('[Home] 模块加载 - products 总数:', products ? products.length : 0);
console.log('[Home] 模块加载 - getProducts 函数:', typeof getProducts);

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
    console.log('[Home] onLoad 触发');
    console.log('[Home] 初始 products 数据:', this.data.products);
    this.loadProducts();
  },

  loadProducts() {
    console.log('[Home] 开始加载产品');
    this.setData({ loading: true });
    
    // 使用筛选条件
    const filters = {};
    
    if (this.data.selectedCity) {
      filters.departureCity = this.data.selectedCity;
      console.log('[Home] 筛选城市:', this.data.selectedCity);
    }
    
    if (this.data.selectedIntensity) {
      filters.intensity = this.data.selectedIntensity;
      console.log('[Home] 筛选强度:', this.data.selectedIntensity);
    }
    
    // 获取过滤后的产品列表
    const filteredProducts = getProducts(filters);
    console.log('[Home] 加载到产品数量:', filteredProducts.length);
    console.log('[Home] 产品列表:', filteredProducts);
    
    this.setData({
      products: filteredProducts,
      loading: false,
      refreshing: false,
    });
    
    console.log('[Home] 页面数据更新完成');
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