/**
 * API 基础配置
 */
export const API_BASE_URL = 'https://api.laoyouxing.com';

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  LAST_ROLE: 'lastRole',
  USER_INFO: 'userInfo',
  FONT_SIZE: 'fontSize',
  SOUND_ENABLED: 'soundEnabled',
};

/**
 * 页面路径常量
 */
export const PAGES = {
  ROLE_SELECT: '/pages/role-select/index',
  
  // 子女端
  CHILD_HOME: '/pages/child/home/index',
  CHILD_PRODUCT_DETAIL: '/pages/child/product-detail/index',
  CHILD_ORDER_CONFIRM: '/pages/child/order-confirm/index',
  CHILD_ORDERS: '/pages/child/orders/index',
  CHILD_ORDER_DETAIL: '/pages/child/order-detail/index',
  CHILD_FAMILY: '/pages/child/family/index',
  CHILD_FAMILY_EDIT: '/pages/child/family-edit/index',
  CHILD_PROFILE: '/pages/child/profile/index',
  
  // 出行人端
  TRAVELER_HOME: '/pages/traveler/home/index',
  TRAVELER_AI_COMPANION: '/pages/traveler/ai-companion/index',
  TRAVELER_SETTINGS: '/pages/traveler/settings/index',
};

/**
 * 适老化字体大小配置
 */
export const FONT_SIZES = {
  NORMAL: 'normal',
  LARGE: 'large',
  EXTRA_LARGE: 'extra-large',
};

/**
 * 订单状态文案
 */
export const ORDER_STATUS_TEXT = {
  pending: '待支付',
  paid: '已支付',
  canceled: '已取消',
  completed: '已完成',
};

/**
 * 行程强度文案
 */
export const INTENSITY_TEXT = {
  low: '轻松',
  medium: '适中',
  high: '较高',
};

/**
 * 活动水平文案
 */
export const ACTIVITY_LEVEL_TEXT = {
  low: '偏静态',
  medium: '适中',
  high: '活跃',
};

/**
 * 年龄段选项
 */
export const AGE_RANGE_OPTIONS = [
  { value: '50-59', label: '50-59岁' },
  { value: '60-69', label: '60-69岁' },
  { value: '70+', label: '70岁以上' },
];

/**
 * 常见健康状况选项
 */
export const HEALTH_CONDITIONS_OPTIONS = [
  { value: 'high_blood_pressure', label: '高血压' },
  { value: 'diabetes', label: '糖尿病' },
  { value: 'heart_disease', label: '心脏病' },
  { value: 'knee_problem', label: '膝盖问题' },
  { value: 'back_problem', label: '腰背问题' },
  { value: 'hearing_impairment', label: '听力障碍' },
  { value: 'vision_impairment', label: '视力障碍' },
];

/**
 * 关系选项
 */
export const RELATION_OPTIONS = [
  { value: '父亲', label: '父亲' },
  { value: '母亲', label: '母亲' },
  { value: '岳父', label: '岳父' },
  { value: '岳母', label: '岳母' },
  { value: '公公', label: '公公' },
  { value: '婆婆', label: '婆婆' },
  { value: '伯伯', label: '伯伯' },
  { value: '阿姨', label: '阿姨' },
  { value: '其他', label: '其他' },
];
