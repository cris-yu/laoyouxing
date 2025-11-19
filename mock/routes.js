/**
 * 线路列表和详情的 Mock 数据
 * 适合中老年人的京津冀旅游线路
 */

// 线路列表数据
const routeList = [
  {
    id: 'route_001',
    name: '天津城市文化一日游',
    coverImage: 'https://via.placeholder.com/750x400/5B8FF9/FFFFFF?text=天津',
    priceFrom: 299,
    days: 1,
    departureCity: '北京',
    destinationCity: '天津',
    ageRange: '50-70岁',
    intensity: 'low', // low: 轻松, medium: 适中, high: 偏累
    intensityText: '轻松',
    hasShopping: false,
    shoppingText: '无购物',
    description: '不赶、不坑、不累的城市轻旅行',
    tags: ['城市文化', '老建筑', '美食']
  },
  {
    id: 'route_002',
    name: '承德避暑山庄+外八庙2日游',
    coverImage: 'https://via.placeholder.com/750x400/73D13D/FFFFFF?text=承德',
    priceFrom: 599,
    days: 2,
    departureCity: '北京',
    destinationCity: '承德',
    ageRange: '55-70岁',
    intensity: 'medium',
    intensityText: '适中',
    hasShopping: false,
    shoppingText: '无购物',
    description: '清代皇家园林与宗教建筑双重体验',
    tags: ['历史文化', '皇家园林', '避暑']
  },
  {
    id: 'route_003',
    name: '北戴河2日舒适海边养生游',
    coverImage: 'https://via.placeholder.com/750x400/F6BD16/FFFFFF?text=北戴河',
    priceFrom: 499,
    days: 2,
    departureCity: '北京',
    destinationCity: '北戴河',
    ageRange: '50-70岁',
    intensity: 'low',
    intensityText: '轻松',
    hasShopping: false,
    shoppingText: '无购物',
    description: '看海、散步、睡好、吃好',
    tags: ['海边', '养生', '休闲']
  },
  {
    id: 'route_004',
    name: '野三坡·百里峡2日轻户外游',
    coverImage: 'https://via.placeholder.com/750x400/9270CA/FFFFFF?text=野三坡',
    priceFrom: 549,
    days: 2,
    departureCity: '北京',
    destinationCity: '野三坡',
    ageRange: '50-70岁',
    intensity: 'medium',
    intensityText: '适中',
    hasShopping: false,
    shoppingText: '无购物',
    description: '看山看水，但不"玩命爬山"',
    tags: ['峡谷', '轻户外', '山水']
  },
  {
    id: 'route_005',
    name: '白洋淀2日水乡生态休闲游',
    coverImage: 'https://via.placeholder.com/750x400/FF6B72/FFFFFF?text=白洋淀',
    priceFrom: 469,
    days: 2,
    departureCity: '北京',
    destinationCity: '白洋淀',
    ageRange: '50-75岁',
    intensity: 'low',
    intensityText: '轻松',
    hasShopping: false,
    shoppingText: '无购物',
    description: '坐船多、走路少，看芦苇、荷花',
    tags: ['水乡', '生态', '乘船']
  }
];

// 线路详情数据
const routeDetails = {
  route_001: {
    id: 'route_001',
    name: '天津城市文化一日游',
    coverImage: 'https://via.placeholder.com/750x400/5B8FF9/FFFFFF?text=天津',
    priceFrom: 299,
    days: 1,
    departureCity: '北京',
    destinationCity: '天津',
    ageRange: '50-70岁',
    intensity: 'low',
    intensityText: '轻松',
    departureDate: '2024-12-01',
    gatherPlace: '北京西站南广场',
    gatherTime: '07:30',
    
    // 行程安排
    itinerary: [
      {
        day: 1,
        title: '天津城市文化深度游',
        items: [
          { time: '07:30-08:00', type: '集合', content: '北京西站南广场集合出发' },
          { time: '08:00-09:00', type: '交通', content: '乘高铁/城际前往天津' },
          { time: '09:30-11:30', type: '景点', content: '五大道观光车巡游 + 下车拍照' },
          { time: '12:00-13:00', type: '用餐', content: '天津特色午餐（含）' },
          { time: '13:30-15:00', type: '景点', content: '古文化街悠闲漫步' },
          { time: '15:30-17:00', type: '景点', content: '海河风光带/意式风情区' },
          { time: '17:00-18:00', type: '交通', content: '返程北京' }
        ],
        meals: { breakfast: false, lunch: true, dinner: false },
        hotel: null
      }
    ],
    
    // 服务信息
    included: [
      '北京-天津往返交通（高铁/城际二等座或旅游大巴）',
      '天津市区旅游大巴费用',
      '五大道观光车费用',
      '午餐1次',
      '景点首道门票',
      '全程持证导游服务费'
    ],
    excluded: [
      '个人消费（零食、土特产等）',
      '海河游船等自愿参与的自费项目',
      '旅游意外保险（可自行勾选）'
    ],
    hasShopping: false,
    hasOptionalItems: true,
    hasInsurance: true,
    
    // 医疗安全信息
    nearbyHospitals: [
      { name: '天津市第一中心医院', distance: '5公里' },
      { name: '天津医科大学总医院', distance: '8公里' }
    ],
    emergencyPhone: '400-888-6666'
  },
  
  route_002: {
    id: 'route_002',
    name: '承德避暑山庄+外八庙2日游',
    coverImage: 'https://via.placeholder.com/750x400/73D13D/FFFFFF?text=承德',
    priceFrom: 599,
    days: 2,
    departureCity: '北京',
    destinationCity: '承德',
    ageRange: '55-70岁',
    intensity: 'medium',
    intensityText: '适中',
    departureDate: '2024-12-05',
    gatherPlace: '北京东直门长途汽车站',
    gatherTime: '07:30',
    
    itinerary: [
      {
        day: 1,
        title: '北京 → 承德 · 避暑山庄',
        items: [
          { time: '07:30-08:00', type: '集合', content: '北京指定地点集合' },
          { time: '08:00-11:30', type: '交通', content: '乘高铁/大巴前往承德' },
          { time: '11:30-12:30', type: '用餐', content: '承德市区午餐' },
          { time: '13:00-17:00', type: '景点', content: '游览避暑山庄（宫殿区、湖区）' },
          { time: '18:00-19:00', type: '用餐', content: '晚餐' },
          { time: '19:30', type: '住宿', content: '入住承德市区酒店' }
        ],
        meals: { breakfast: false, lunch: true, dinner: true },
        hotel: '承德市区酒店（3-4星标准）'
      },
      {
        day: 2,
        title: '外八庙精华游 · 返程',
        items: [
          { time: '07:30-08:30', type: '用餐', content: '酒店早餐，退房' },
          { time: '09:00-12:00', type: '景点', content: '外八庙精华游（普宁寺、小布达拉宫）' },
          { time: '12:00-13:00', type: '用餐', content: '市区午餐' },
          { time: '15:00-17:00', type: '交通', content: '返程北京' }
        ],
        meals: { breakfast: true, lunch: true, dinner: false },
        hotel: null
      }
    ],
    
    included: [
      '北京-承德往返交通（高铁二等座或旅游大巴）',
      '承德当地旅游大巴费用',
      '避暑山庄与外八庙首道门票',
      '住宿1晚（双人间）',
      '1早餐+2正餐',
      '全程持证导游服务费'
    ],
    excluded: [
      '行程以外的个人消费',
      '单房差（如需住单人间）',
      '旅游意外保险'
    ],
    hasShopping: false,
    hasOptionalItems: false,
    hasInsurance: true,
    
    nearbyHospitals: [
      { name: '承德市中心医院', distance: '3公里' },
      { name: '承德医学院附属医院', distance: '5公里' }
    ],
    emergencyPhone: '400-888-6666'
  }
};

// 用户已报名的行程列表
const myTrips = [
  {
    id: 'trip_001',
    routeId: 'route_001',
    routeName: '天津城市文化一日游',
    departureDate: '2024-12-15',
    returnDate: '2024-12-15',
    status: 'upcoming', // upcoming: 未出行, ongoing: 出行中, completed: 已完成
    statusText: '未出行',
    guideName: '王师傅',
    guidePhone: '13800138000'
  },
  {
    id: 'trip_002',
    routeId: 'route_002',
    routeName: '承德避暑山庄+外八庙2日游',
    departureDate: '2024-12-20',
    returnDate: '2024-12-21',
    status: 'upcoming',
    statusText: '未出行',
    guideName: '李师傅',
    guidePhone: '13900139000'
  },
  {
    id: 'trip_003',
    routeId: 'route_003',
    routeName: '北戴河2日舒适海边养生游',
    departureDate: '2024-11-10',
    returnDate: '2024-11-11',
    status: 'completed',
    statusText: '已完成',
    guideName: '张师傅',
    guidePhone: '13700137000'
  }
];

// 行程详情数据
const tripDetails = {
  trip_001: {
    id: 'trip_001',
    routeId: 'route_001',
    routeName: '天津城市文化一日游',
    departureDate: '2024-12-15',
    returnDate: '2024-12-15',
    status: 'upcoming',
    statusText: '未出行',
    
    // 今日关键信息
    todayGatherTime: '07:30',
    todayGatherPlace: '北京西站南广场（靠近出租车候车区）',
    guideName: '王师傅',
    guidePhone: '13800138000',
    
    // 紧急联系人（子女）
    emergencyContact: {
      name: '张小明',
      relation: '儿子',
      phone: '13600136000'
    },
    
    // 每日行程
    dailySchedule: [
      {
        date: '2024-12-15',
        title: '天津城市文化深度游',
        items: [
          { time: '07:30', content: '北京西站南广场集合出发' },
          { time: '08:00', content: '乘高铁/城际前往天津' },
          { time: '09:30', content: '五大道观光车巡游' },
          { time: '12:00', content: '天津特色午餐' },
          { time: '13:30', content: '古文化街悠闲漫步' },
          { time: '15:30', content: '海河风光带散步' },
          { time: '17:00', content: '返程北京' }
        ]
      }
    ]
  },
  
  trip_002: {
    id: 'trip_002',
    routeId: 'route_002',
    routeName: '承德避暑山庄+外八庙2日游',
    departureDate: '2024-12-20',
    returnDate: '2024-12-21',
    status: 'upcoming',
    statusText: '未出行',
    
    todayGatherTime: '07:30',
    todayGatherPlace: '北京东直门长途汽车站（2号候车厅）',
    guideName: '李师傅',
    guidePhone: '13900139000',
    
    emergencyContact: {
      name: '李小红',
      relation: '女儿',
      phone: '13500135000'
    },
    
    dailySchedule: [
      {
        date: '2024-12-20',
        title: 'D1 北京 → 承德 · 避暑山庄',
        items: [
          { time: '07:30', content: '北京指定地点集合' },
          { time: '08:00', content: '乘高铁/大巴前往承德' },
          { time: '11:30', content: '承德市区午餐' },
          { time: '13:00', content: '游览避暑山庄（宫殿区、湖区）' },
          { time: '18:00', content: '晚餐' },
          { time: '19:30', content: '入住承德市区酒店' }
        ]
      },
      {
        date: '2024-12-21',
        title: 'D2 外八庙精华游 · 返程',
        items: [
          { time: '07:30', content: '酒店早餐，退房' },
          { time: '09:00', content: '外八庙精华游' },
          { time: '12:00', content: '市区午餐' },
          { time: '15:00', content: '返程北京' }
        ]
      }
    ]
  }
};

module.exports = {
  routeList,
  routeDetails,
  myTrips,
  tripDetails
};
