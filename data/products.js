/**
 * 老友行 · 京津冀线路产品数据 (JavaScript版本)
 * 基于《老友行_京津冀线路产品文案合集.md》整理
 */

// 辅助函数：生成行程段ID
function generateSegmentId(day, index) {
  return `seg_${day}_${index}`;
}

const products = [
  // 1. 天津城市文化一日游
  {
    id: 'prod_tianjin_1day',
    name: '天津城市文化一日游（品质稳健版）',
    coverImage: 'https://via.placeholder.com/750x400/5B8FF9/FFFFFF?text=天津',
    priceFrom: 299,
    days: 1,
    departureCity: '北京',
    destinationCity: '天津',
    tags: ['城市文化', '老建筑', '美食', '适老化'],
    ageRange: '50-70岁',
    intensity: 'low',
    intensityDescription: '步行约5000-8000步，五大道以观光车为主，古文化街平地步行1-1.5小时',
    medicalLevel: 'near_hospital',
    medicalDescription: '全程在天津市区，周边有多家综合医院和社区卫生服务站',
    maxSingleRideHours: 1,
    description: '不赶、不坑、不累的城市轻旅行。从北京出发，带爸妈去看看租界建筑、海河风光和老天津味道。',
    itinerary: [
      {
        dayIndex: 1,
        title: '天津城市文化深度游',
        schedule: [
          {
            id: generateSegmentId(1, 1),
            time: '07:30-08:00',
            type: 'other',
            title: '北京集合出发',
            description: '指定地铁口/上车点集合，工作人员举"老友行"旗帜',
            isKey: true,
          },
          {
            id: generateSegmentId(1, 2),
            time: '08:00-09:00',
            type: 'transfer',
            title: '北京 → 天津',
            description: '乘高铁/城际前往天津，车上导游介绍当日行程与注意事项',
          },
          {
            id: generateSegmentId(1, 3),
            time: '09:30-11:30',
            type: 'sightseeing',
            title: '五大道观光',
            description: '乘观光车环线游览各式小洋楼，途中安排1-2处停靠点拍照',
            poiName: '五大道',
            isKey: true,
          },
          {
            id: generateSegmentId(1, 4),
            time: '12:00-13:00',
            type: 'meal',
            title: '天津特色午餐',
            description: '前往本地口碑餐厅，菜品荤素搭配，预留清淡菜适合中老年人口味',
          },
          {
            id: generateSegmentId(1, 5),
            time: '13:30-15:00',
            type: 'sightseeing',
            title: '古文化街悠闲漫步',
            description: '参观天津古文化街，感受牌楼、老字号与民俗文化',
            poiName: '古文化街',
            isKey: true,
          },
          {
            id: generateSegmentId(1, 6),
            time: '15:30-17:00',
            type: 'sightseeing',
            title: '海河风光带/意式风情区',
            description: '视季节和天气选择海河两岸轻松散步或意式风情区短暂停留',
            poiName: '海河风光带',
          },
          {
            id: generateSegmentId(1, 7),
            time: '17:00-18:00',
            type: 'transfer',
            title: '返程北京',
            description: '统一乘高铁/城际返回北京，抵达后就近地铁/公交返回家中',
            isKey: true,
          },
        ],
      },
    ],
    included: [
      '北京-天津往返交通（高铁/城际二等座或旅游大巴）',
      '天津市区旅游大巴费用（含司机餐补）',
      '五大道观光车费用',
      '午餐1次',
      '景点首道门票（如有）',
      '全程持证导游服务费',
      '老友行基础安心服务',
    ],
    excluded: [
      '个人消费（零食、土特产等）',
      '海河游船等自愿参与的自费项目',
      '旅游意外保险（可在小程序下单时自行勾选）',
    ],
    status: 'online',
  },

  // 2. 承德避暑山庄+外八庙2日游
  {
    id: 'prod_chengde_2days',
    name: '承德避暑山庄+外八庙2日文化避暑游',
    coverImage: 'https://via.placeholder.com/750x400/73D13D/FFFFFF?text=承德',
    priceFrom: 599,
    days: 2,
    departureCity: '北京',
    destinationCity: '承德',
    tags: ['历史文化', '皇家园林', '避暑', '宗教建筑'],
    ageRange: '55-70岁',
    intensity: 'medium',
    intensityDescription: 'D1避暑山庄以观光车+步行为主，地势相对平缓；D2外八庙存在台阶、坡道',
    medicalLevel: 'near_hospital',
    medicalDescription: '全程在承德市区及周边，有综合医院和急诊服务',
    maxSingleRideHours: 2,
    description: '清代皇家园林与宗教建筑双重体验。既避暑又长知识，适合爱历史、爱拍照的爸妈。',
    included: [
      '北京-承德往返交通（高铁二等座或旅游大巴）',
      '承德当地旅游大巴费用',
      '避暑山庄与外八庙首道门票',
      '住宿1晚（双人间）',
      '1早餐+2正餐',
      '全程持证导游服务费',
      '老友行安心服务',
    ],
    excluded: [
      '行程以外的个人消费',
      '单房差（如需住单人间）',
      '旅游意外保险（可在小程序中勾选）',
      '自愿参加的自费项目',
    ],
    status: 'online',
    itinerary: [],
  },

  // 3. 北戴河2日海边养生游
  {
    id: 'prod_beidaihe_2days',
    name: '北戴河2日舒适海边养生游',
    coverImage: 'https://via.placeholder.com/750x400/F6BD16/FFFFFF?text=北戴河',
    priceFrom: 499,
    days: 2,
    departureCity: '北京',
    destinationCity: '北戴河',
    tags: ['海边', '养生', '休闲', '散步'],
    ageRange: '50-70岁',
    intensity: 'low',
    intensityDescription: '以平地海边散步为主，每日步数可控制在5000-8000步',
    medicalLevel: 'near_hospital',
    medicalDescription: '北戴河区及秦皇岛市内有多家综合医院',
    maxSingleRideHours: 2,
    description: '看海、散步、睡好、吃好。非"打卡型"，是让爸妈真正休息两天。',
    included: [
      '往返交通（高铁/大巴）',
      '北戴河当地旅游大巴接驳',
      '住宿1晚（双人间）',
      '1早餐+2正餐',
      '景点首道门票（湿地/生态公园）',
      '全程导游服务费',
      '老友行安心服务',
    ],
    excluded: [
      '不在行程中的个人消费',
      '单房差',
      '旅游意外保险',
      '自愿参加的自费项目',
    ],
    status: 'online',
    itinerary: [],
  },

  // 4. 野三坡·百里峡2日游
  {
    id: 'prod_yesanpo_2days',
    name: '野三坡·百里峡2日轻户外分强度游',
    coverImage: 'https://via.placeholder.com/750x400/9270CA/FFFFFF?text=野三坡',
    priceFrom: 549,
    days: 2,
    departureCity: '北京',
    destinationCity: '野三坡',
    tags: ['峡谷', '轻户外', '山水', '分强度'],
    ageRange: '50-70岁',
    intensity: 'medium',
    intensityDescription: 'A线（轻松）/B线（进阶）可选，存在一定台阶和上下坡',
    medicalLevel: 'basic',
    medicalDescription: '景区附近有卫生院，严重情况需转送至保定市区医院',
    maxSingleRideHours: 3,
    description: '看山看水，但不"玩命爬山"。一团两条线，体力好和体力一般的爸妈都能找到自己的节奏。',
    included: [
      '往返旅游大巴费用',
      '百里峡景区门票+观光车费用',
      '住宿1晚（双人间）',
      '1早餐+2正餐',
      '全程导游、领队服务',
      '老友行安心服务',
    ],
    excluded: [
      '个人消费',
      '单房差',
      '旅游意外保险',
      '选择额外项目的自费支出',
    ],
    status: 'online',
    itinerary: [],
  },

  // 5. 白洋淀2日水乡游
  {
    id: 'prod_baiyangdian_2days',
    name: '白洋淀2日水乡生态休闲游',
    coverImage: 'https://via.placeholder.com/750x400/FF6B72/FFFFFF?text=白洋淀',
    priceFrom: 469,
    days: 2,
    departureCity: '北京',
    destinationCity: '白洋淀',
    tags: ['水乡', '生态', '乘船', '荷花'],
    ageRange: '50-75岁',
    intensity: 'low',
    intensityDescription: '坐船时间多，步行路段较短、以平地为主',
    medicalLevel: 'basic',
    medicalDescription: '景区附近有卫生院，严重情况需转送保定市区医院',
    maxSingleRideHours: 3,
    description: '坐船多、走路少，看芦苇、荷花和水乡人家。适合不爱爬山、喜欢静静看景拍照的爸妈。',
    included: [
      '往返旅游大巴费用',
      '白洋淀船票（含主船及必要摆渡）',
      '住宿1晚（双人间）',
      '1早餐+2正餐',
      '景点首道门票',
      '全程导游服务',
      '老友行安心服务',
    ],
    excluded: [
      '个人消费及未在"费用包含"中列明项目',
      '单房差',
      '旅游意外保险',
      '自愿参与的船上娱乐项目/增值体验',
    ],
    status: 'online',
    itinerary: [],
  },
];

/**
 * 根据ID获取产品详情
 */
function getProductById(id) {
  return products.find(p => p.id === id);
}

/**
 * 根据筛选条件获取产品列表
 */
function getProducts(filters) {
  filters = filters || {};
  let result = products.slice(); // 复制数组
  
  if (filters.intensity) {
    result = result.filter(p => p.intensity === filters.intensity);
  }
  
  if (filters.departureCity) {
    result = result.filter(p => p.departureCity === filters.departureCity);
  }
  
  if (filters.days) {
    result = result.filter(p => p.days === filters.days);
  }
  
  return result;
}

module.exports = {
  products: products,
  getProductById: getProductById,
  getProducts: getProducts,
};
