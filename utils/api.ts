import { get, post, put } from './request';
import {
  User,
  FamilyProfile,
  TripProduct,
  Order,
  TripRuntime,
  HelpRequest,
  AITripAdvisorRequest,
  AITripAdvisorResponse,
  AICompanionRequest,
  AICompanionResponse,
  TravelerTripInfo,
  OrderPreview,
  PaymentParams,
  AudioGuide,
} from '../types/index';

/**
 * 认证相关 API
 */
export const authApi = {
  // 小程序登录
  login(code: string, role: 'child' | 'traveler') {
    return post<{ token: string; user: User }>('/api/auth/login', { code, role }, false);
  },

  // 获取当前用户
  me() {
    return get<User>('/api/auth/me');
  },
};

/**
 * 家人档案相关 API
 */
export const familyApi = {
  // 获取家人列表
  list() {
    return get<FamilyProfile[]>('/api/family');
  },

  // 创建家人档案
  create(data: Partial<FamilyProfile>) {
    return post<FamilyProfile>('/api/family', data);
  },

  // 更新家人档案
  update(id: string, data: Partial<FamilyProfile>) {
    return put<FamilyProfile>(`/api/family/${id}`, data);
  },

  // 获取家人档案详情
  detail(id: string) {
    return get<FamilyProfile>(`/api/family/${id}`);
  },
};

/**
 * 产品相关 API
 */
export const productApi = {
  // 获取产品列表
  list(params?: {
    departureCity?: string;
    date?: string;
    intensity?: 'low' | 'medium' | 'high';
  }) {
    return get<TripProduct[]>('/api/products', params);
  },

  // 获取产品详情
  detail(id: string) {
    return get<TripProduct>(`/api/products/${id}`);
  },
};

/**
 * AI 相关 API
 */
export const aiApi = {
  // AI 行程顾问
  tripAdvisor(data: AITripAdvisorRequest) {
    return post<AITripAdvisorResponse>('/api/ai/trip-advisor', data);
  },

  // AI 旅伴问答
  travelCompanion(data: AICompanionRequest) {
    return post<AICompanionResponse>('/api/ai/travel-companion', data);
  },
};

/**
 * 订单相关 API
 */
export const orderApi = {
  // 预览订单
  preview(data: {
    productId: string;
    departureDate: string;
    travelers: Array<{ familyProfileId: string }>;
  }) {
    return post<OrderPreview>('/api/orders/preview', data);
  },

  // 创建订单
  create(data: {
    productId: string;
    departureDate: string;
    travelers: Array<{
      familyProfileId?: string;
      name: string;
      isPrimary: boolean;
      phone?: string;
      idNumber?: string;
    }>;
    totalPrice: number;
  }) {
    return post<{ orderId: string; payment: PaymentParams }>('/api/orders', data);
  },

  // 订单列表
  list(params?: { status?: string }) {
    return get<Order[]>('/api/orders', params);
  },

  // 订单详情
  detail(id: string) {
    return get<{ order: Order; runtime: TripRuntime | null }>(`/api/orders/${id}`);
  },
};

/**
 * 行程实时状态 API
 */
export const tripApi = {
  // 获取行程实时状态
  runtime(orderId: string) {
    return get<TripRuntime>(`/api/trip-runtime/${orderId}`);
  },
};

/**
 * 出行人端相关 API
 */
export const travelerApi = {
  // 获取行程信息
  trip(orderId: string, travelerName: string) {
    return get<TravelerTripInfo>('/api/traveler/trip', { orderId, travelerName });
  },
};

/**
 * 音频讲解 API
 */
export const audioApi = {
  // 获取景点讲解
  guide(orderId: string, segmentId: string) {
    return get<AudioGuide>('/api/audio-guide', { orderId, segmentId });
  },
};

/**
 * 求助相关 API
 */
export const helpApi = {
  // 创建求助请求
  create(data: {
    orderId: string;
    travelerName: string;
    locationLabel?: string;
    travelerPhone?: string;
  }) {
    return post<{ helpRequestId: string }>('/api/help-request', data);
  },
};
