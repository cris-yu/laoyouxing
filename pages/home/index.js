const { getRouteList } = require('../../utils/request.js');

Page({
  data: {
    routes: [],
    loading: false,
    
    // 筛选条件
    departureCities: ['全部', '北京', '天津', '石家庄'],
    selectedCityIndex: 0,
    selectedCity: '',
    
    dayOptions: ['全部', '1天', '2天', '3天'],
    selectedDayIndex: 0,
    selectedDays: '',
    
    priceRanges: ['全部', '0-300元', '300-600元', '600元以上'],
    selectedPriceIndex: 0,
    selectedPriceMin: '',
    selectedPriceMax: ''
  },

  /**
   * 页面加载
   */
  onLoad() {
    console.log('[Home] 页面加载');
    this.loadRoutes();
  },

  /**
   * 页面显示
   */
  onShow() {
    console.log('[Home] 页面显示');
  },

  /**
   * 加载线路列表
   */
  loadRoutes() {
    console.log('[Home] 开始加载线路列表');
    this.setData({ loading: true });
    
    const params = {};
    if (this.data.selectedCity) {
      params.departureCity = this.data.selectedCity;
    }
    if (this.data.selectedDays) {
      params.days = this.data.selectedDays;
    }
    if (this.data.selectedPriceMin) {
      params.priceMin = this.data.selectedPriceMin;
    }
    if (this.data.selectedPriceMax) {
      params.priceMax = this.data.selectedPriceMax;
    }
    
    getRouteList(params)
      .then(res => {
        console.log('[Home] 加载到线路数量:', res.data.length);
        this.setData({
          routes: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.error('[Home] 加载失败:', err);
        this.setData({ loading: false });
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
      });
  },

  /**
   * 出发地筛选
   */
  onCityChange(e) {
    const index = parseInt(e.detail.value);
    const city = index === 0 ? '' : this.data.departureCities[index];
    
    this.setData({
      selectedCityIndex: index,
      selectedCity: city
    });
    
    this.loadRoutes();
  },

  /**
   * 天数筛选
   */
  onDayChange(e) {
    const index = parseInt(e.detail.value);
    let days = '';
    
    if (index > 0) {
      days = index; // 1天->1, 2天->2, 3天->3
    }
    
    this.setData({
      selectedDayIndex: index,
      selectedDays: days
    });
    
    this.loadRoutes();
  },

  /**
   * 价格筛选
   */
  onPriceChange(e) {
    const index = parseInt(e.detail.value);
    let priceMin = '';
    let priceMax = '';
    
    switch(index) {
      case 1: // 0-300元
        priceMin = 0;
        priceMax = 300;
        break;
      case 2: // 300-600元
        priceMin = 300;
        priceMax = 600;
        break;
      case 3: // 600元以上
        priceMin = 600;
        priceMax = '';
        break;
    }
    
    this.setData({
      selectedPriceIndex: index,
      selectedPriceMin: priceMin,
      selectedPriceMax: priceMax
    });
    
    this.loadRoutes();
  },

  /**
   * 跳转到线路详情
   */
  goToDetail(e) {
    const routeId = e.currentTarget.dataset.id;
    console.log('[Home] 跳转到线路详情:', routeId);
    
    wx.navigateTo({
      url: `/pages/route-detail/index?id=${routeId}`
    });
  }
});
