// 用户与家人档案类型定义
export interface User {
  id: string;
  openId: string;
  unionId?: string;
  role: "child" | "traveler" | null;
  nickname?: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

export interface FamilyProfile {
  id: string;
  userId: string;
  name: string;
  relation: string;
  gender?: "male" | "female" | "other";
  ageRange: "50-59" | "60-69" | "70+";
  healthConditions: string[];
  activityLevel: "low" | "medium" | "high";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// 线路产品类型定义
export interface TripSegment {
  id: string;
  time: string;
  type: "transfer" | "sightseeing" | "meal" | "rest" | "other";
  title: string;
  description: string;
  poiName?: string;
  poiId?: string;
  latitude?: number;
  longitude?: number;
  isKey?: boolean;
  hasAudioGuide?: boolean;
}

export interface TripDay {
  dayIndex: number;
  title: string;
  schedule: TripSegment[];
}

export interface TripProduct {
  id: string;
  name: string;
  coverImage: string;
  priceFrom: number;
  days: number;
  departureCity: string;
  destinationCity: string;
  tags: string[];
  ageRange: string;
  intensity: "low" | "medium" | "high";
  intensityDescription: string;
  medicalLevel: "near_clinic" | "near_hospital" | "basic";
  medicalDescription: string;
  maxSingleRideHours: number;
  itinerary: TripDay[];
  description: string;
  included: string[];
  excluded: string[];
  status: "online" | "offline";
}

// 订单类型定义
export interface OrderTraveler {
  id: string;
  familyProfileId?: string;
  name: string;
  phone?: string;
  idNumber?: string;
  isPrimary: boolean;
}

export interface Order {
  id: string;
  orderNo: string;
  childUserId: string;
  productId: string;
  productSnapshot: TripProduct;
  departureDate: string;
  status: "pending" | "paid" | "canceled" | "completed";
  totalPrice: number;
  travelers: OrderTraveler[];
  createdAt: string;
  paidAt?: string;
}

// 行程实时状态
export interface TripRuntime {
  orderId: string;
  currentDayIndex: number;
  currentSegmentIndex: number;
  status: "not_started" | "in_progress" | "finished";
  lastUpdateAt: string;
  summaryText: string;
  currentLocationLabel?: string;
}

// 求助事件
export interface HelpRequest {
  id: string;
  orderId: string;
  travelerName: string;
  travelerPhone?: string;
  createdAt: string;
  status: "open" | "in_progress" | "resolved";
  lastUpdateAt: string;
  notes?: string;
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

// 全局状态类型
export interface GlobalUser {
  id: string;
  role: "child" | "traveler" | null;
  nickname?: string;
  avatarUrl?: string;
  phone?: string;
  token?: string;
}

export interface GlobalState {
  user: GlobalUser | null;
  lastRole: "child" | "traveler" | null;
}

// AI相关类型
export interface AITripAdvisorRequest {
  productId: string;
  familyProfileId: string;
}

export interface AITripAdvisorResponse {
  suitability: "ok" | "mostly_ok" | "not_recommended";
  headline: string;
  details: string[];
  adviceForChild: string;
}

export interface AICompanionRequest {
  orderId: string;
  travelerId: string;
  question: string;
}

export interface AICompanionResponse {
  answerText: string;
  shouldSpeak: boolean;
}

// 出行人端行程信息
export interface TravelerTripInfo {
  orderId: string;
  travelerName: string;
  productName: string;
  todayTitle: string;
  todaySegments: TripSegment[];
  nextReminderTime: string;
  guide: {
    name: string;
    phone: string;
  };
}

// 订单预览
export interface OrderPreview {
  totalPrice: number;
  items: Array<{
    type: string;
    amount: number;
  }>;
}

// 支付参数
export interface PaymentParams {
  nonceStr: string;
  timeStamp: string;
  package: string;
  signType: string;
  paySign: string;
}

// 音频讲解
export interface AudioGuide {
  title: string;
  script: string;
  audioUrl?: string;
}
