import { productApi } from '../../../utils/api';
import { TripProduct } from '../../../types/index';
import { PAGES } from '../../../constants/index';

Page({
  data: {
    products: [] as TripProduct[],
    loading: false,
    refreshing: false,
    
    // 筛选条件
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

  onShow() {
    // 页面显示时可能需要刷新列表
  },

  /**
   * 加载产品列表
   */
  async loadProducts() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });

    try {
      const params: any = {};
      if (this.data.selectedCity) {
        params.departureCity = this.data.selectedCity;
      }
      if (this.data.selectedDate) {
        params.date = this.data.selectedDate;
      }
      if (this.data.selectedIntensity) {
        params.intensity = this.data.selectedIntensity;
      }

      const res = await productApi.list(params);
      
      if (res.data) {
        this.setData({
          products: res.data,
          loading: false,
          refreshing: false,
        });
      }
    } catch (error) {
      console.error('加载产品失败:', error);
      this.setData({
        loading: false,
        refreshing: false,
      });
    }
  },

  /**
   * 下拉刷新
   */
  onRefresh() {
    this.setData({ refreshing: true });
    this.loadProducts();
  },

  /**
   * 出发城市变更
   */
  onDepartureCityChange(e: any) {
    const index = e.detail.value;
    const city = this.data.departureCities[index];
    this.setData({ selectedCity: city });
    this.loadProducts();
  },

  /**
   * 日期变更
   */
  onDateChange(e: any) {
    this.setData({ selectedDate: e.detail.value });
    this.loadProducts();
  },

  /**
   * 强度变更
   */
  onIntensityChange(e: any) {
    const index = e.detail.value;
    const option = this.data.intensityOptions[index];
    this.setData({
      selectedIntensity: option.value,
      selectedIntensityText: option.label,
    });
    this.loadProducts();
  },

  /**
   * 跳转到详情页
   */
  goToDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `${PAGES.CHILD_PRODUCT_DETAIL}?id=${id}`,
    });
  },
});
