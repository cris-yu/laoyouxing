import { productApi, familyApi, aiApi } from '../../../utils/api';
import { TripProduct, FamilyProfile, AITripAdvisorResponse } from '../../../types/index';
import { PAGES } from '../../../constants/index';

Page({
  data: {
    productId: '',
    product: {} as TripProduct,
    loading: false,
    hasFamily: false,
    showAIModal: false,
    aiResult: {} as AITripAdvisorResponse,
    familyProfiles: [] as FamilyProfile[],
  },

  onLoad(options: any) {
    const { id } = options;
    if (id) {
      this.setData({ productId: id });
      this.loadProduct(id);
      this.checkFamilyProfiles();
    }
  },

  /**
   * 加载产品详情
   */
  async loadProduct(id: string) {
    this.setData({ loading: true });
    wx.showLoading({ title: '加载中...' });

    try {
      const res = await productApi.detail(id);
      if (res.data) {
        this.setData({
          product: res.data,
          loading: false,
        });
      }
      wx.hideLoading();
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '加载失败',
        icon: 'none',
      });
    }
  },

  /**
   * 检查是否有家人档案
   */
  async checkFamilyProfiles() {
    try {
      const res = await familyApi.list();
      if (res.data && res.data.length > 0) {
        this.setData({
          hasFamily: true,
          familyProfiles: res.data,
        });
      }
    } catch (error) {
      console.error('加载家人档案失败:', error);
    }
  },

  /**
   * 询问 AI
   */
  async askAI() {
    if (this.data.familyProfiles.length === 0) {
      wx.showToast({
        title: '请先添加家人档案',
        icon: 'none',
      });
      return;
    }

    // 如果有多个家人档案，显示选择器
    if (this.data.familyProfiles.length > 1) {
      const items = this.data.familyProfiles.map(p => p.name);
      wx.showActionSheet({
        itemList: items,
        success: (res) => {
          const profile = this.data.familyProfiles[res.tapIndex];
          this.requestAIAdvice(profile.id);
        },
      });
    } else {
      this.requestAIAdvice(this.data.familyProfiles[0].id);
    }
  },

  /**
   * 请求 AI 建议
   */
  async requestAIAdvice(familyProfileId: string) {
    wx.showLoading({ title: 'AI 分析中...' });

    try {
      const res = await aiApi.tripAdvisor({
        productId: this.data.productId,
        familyProfileId,
      });

      wx.hideLoading();

      if (res.data) {
        this.setData({
          aiResult: res.data,
          showAIModal: true,
        });
      }
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: 'AI 分析失败，请重试',
        icon: 'none',
      });
    }
  },

  /**
   * 关闭 AI 弹窗
   */
  closeAIModal() {
    this.setData({ showAIModal: false });
  },

  /**
   * 阻止冒泡
   */
  stopPropagation() {
    // 阻止事件冒泡
  },

  /**
   * 前往订单确认页
   */
  goToConfirm() {
    wx.navigateTo({
      url: `${PAGES.CHILD_ORDER_CONFIRM}?productId=${this.data.productId}`,
    });
  },
});
