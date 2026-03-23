const budgetLabels = ['经济预算', '中预算', '中高预算', '高预算']

const routeProfiles = [
  {
    key: 'first-look',
    titleSuffix: '初次到访版',
    slugSuffix: 'first-look',
    tags: ['经典路线', '第一次去'],
    minAdjust: 0,
    maxAdjust: 0,
    budgetAdjust: 0,
    shortLead: '先把招牌体验看完整',
    summaryLine: '先用一条低犯错路线判断这个目的地是不是你的长期偏好。',
    focusHighlight: '核心地标串联',
    idealLine: '第一次接触这个目的地的人',
    tipLine: '第一趟不要把路程压太满，先保证核心体验完整。'
  },
  {
    key: 'photo-focus',
    titleSuffix: '摄影优先版',
    slugSuffix: 'photo-focus',
    tags: ['摄影强化', '出片'],
    minAdjust: 1,
    maxAdjust: 1,
    budgetAdjust: 1,
    shortLead: '把机位、光线和停留时间优先级拉高',
    summaryLine: '更适合想把视觉记忆做足的人。',
    focusHighlight: '日出日落拍摄窗口',
    idealLine: '更看重出片和视觉冲击的人',
    tipLine: '优先围绕光线安排时间，不要用普通观光节奏套摄影行程。'
  },
  {
    key: 'slow-pace',
    titleSuffix: '慢节奏版',
    slugSuffix: 'slow-pace',
    tags: ['慢旅行', '舒适节奏'],
    minAdjust: 1,
    maxAdjust: 2,
    budgetAdjust: 0,
    shortLead: '把节奏放慢，把城市和自然真正走进来',
    summaryLine: '适合不想赶路、想把感受密度做高的人。',
    focusHighlight: '留白时间和在地停留',
    idealLine: '不想每天像打卡一样推进行程的人',
    tipLine: '把每天的核心点压缩到一到两个，留时间给现场感受。'
  },
  {
    key: 'deep-stay',
    titleSuffix: '深度停留版',
    slugSuffix: 'deep-stay',
    tags: ['深度体验', '长期记忆'],
    minAdjust: 2,
    maxAdjust: 2,
    budgetAdjust: 1,
    shortLead: '把更多时间投到同一片区域，换取更完整的理解',
    summaryLine: '更适合已经确定喜欢这个方向、愿意多给几天的人。',
    focusHighlight: '延伸路线和次级景点',
    idealLine: '愿意多停留、想避免浅尝即止的人',
    tipLine: '深度版最怕每天都排满，最好给天气和临时变化留缓冲。'
  },
  {
    key: 'memory-boost',
    titleSuffix: '高记忆点版',
    slugSuffix: 'memory-boost',
    tags: ['高记忆点', '效率路线'],
    minAdjust: -1,
    maxAdjust: 0,
    budgetAdjust: 0,
    shortLead: '用更高效的路线把记忆点集中拉满',
    summaryLine: '适合假期有限，但又想把这条线的代表性体验抓到手的人。',
    focusHighlight: '高密度代表性体验',
    idealLine: '假期不长、想快速判断值不值得二刷的人',
    tipLine: '效率版的关键不是塞更多点，而是剔除低记忆度环节。'
  }
]

const destinationSeeds = [
  {
    slug: 'uyuni-salt-flats',
    title: '玻利维亚 · 天空之镜',
    country: '玻利维亚',
    location: '乌尤尼盐沼',
    region: '南美',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    bestTime: '12月到3月',
    days: [3, 4],
    budgetLevel: 2,
    tags: ['自然奇观', '长线旅行'],
    hook: '雨季的镜面反射会把天空和地面压成一条线',
    strength: '极端地貌和空间尺度感',
    highlights: ['雨后镜面倒影', '盐酒店体验', '越野车穿越盐沼', '火烈鸟栖息地'],
    tips: ['海拔较高，前两天行程不要安排太满', '反光极强，墨镜和防晒必须带齐'],
    audience: ['想拍出强视觉大片的人', '第一次做南美长线的人']
  },
  {
    slug: 'iceland-ring-road',
    title: '冰岛 · 极光公路',
    country: '冰岛',
    location: '环岛公路',
    region: '北欧',
    image: 'https://images.unsplash.com/photo-1539066834-3fa5469a1d1c?auto=format&fit=crop&w=1200&q=80',
    bestTime: '9月到3月',
    days: [6, 8],
    budgetLevel: 3,
    tags: ['极地风景', '自驾'],
    hook: '黑沙滩、冰川、瀑布和极光都能在一条线路里完成',
    strength: '高密度自然景观和连续移动中的惊喜',
    highlights: ['极光追逐', '蓝湖温泉', '黄金圈瀑布群', '黑沙滩和玄武岩海岸'],
    tips: ['冬季要密切关注天气和路况', '酒店和租车要尽量提前锁定'],
    audience: ['第一次认真感受北欧自然的人', '愿意自驾提升自由度的人']
  },
  {
    slug: 'kyoto-old-capital',
    title: '日本 · 京都古都',
    country: '日本',
    location: '京都',
    region: '东亚',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
    bestTime: '11月中旬到12月上旬',
    days: [4, 5],
    budgetLevel: 1,
    tags: ['城市漫游', '文化体验'],
    hook: '古寺、庭院和街巷能把季节感和审美体验叠在一起',
    strength: '稳定、细腻、容易建立好感的旅行节奏',
    highlights: ['清水寺夜枫', '南禅寺和永观堂', '岚山竹林与保津川', '町家咖啡馆慢逛'],
    tips: ['红叶季和樱花季酒店非常紧张', '热门寺院尽量早到或晚到'],
    audience: ['第一次独立出境的人', '更看重稳定体验和城市美学的人']
  },
  {
    slug: 'cappadocia-valleys',
    title: '土耳其 · 卡帕多奇亚',
    country: '土耳其',
    location: '卡帕多奇亚',
    region: '西亚',
    image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=80',
    bestTime: '4月到6月，9月到10月',
    days: [3, 4],
    budgetLevel: 2,
    tags: ['浪漫体验', '轻冒险'],
    hook: '热气球、洞穴酒店和岩石地貌组合出了极强的画面感',
    strength: '短时间内拿到高记忆点的效率',
    highlights: ['日出热气球', '洞穴酒店入住', '格雷梅露台观景', '地下城与峡谷步道'],
    tips: ['热气球很看天气，至少预留两个清晨', '景观酒店通常比追逐机位更省心'],
    audience: ['情侣和蜜月用户', '想在短时间拿到高记忆点的人']
  },
  {
    slug: 'chefchaouen-blue-city',
    title: '摩洛哥 · 蓝城巷道',
    country: '摩洛哥',
    location: '舍夫沙万',
    region: '北非',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
    bestTime: '3月到5月，9月到11月',
    days: [2, 3],
    budgetLevel: 1,
    tags: ['异域风情', '慢旅行'],
    hook: '蓝色街巷本身就是完整的旅行内容，不靠复杂攻略也能成立',
    strength: '色彩辨识度和轻量级漫游体验',
    highlights: ['蓝色街巷漫步', '山顶观景台看日落', '老城市场与手工艺', '里亚德民宿体验'],
    tips: ['适合住一晚，不建议当天往返', '老城石阶较多，行李尽量轻装'],
    audience: ['喜欢拍建筑与色彩的人', '不想天天赶大巴的人']
  },
  {
    slug: 'dolomites-alpine-loop',
    title: '意大利 · 多洛米蒂',
    country: '意大利',
    location: '多洛米蒂',
    region: '欧洲',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    bestTime: '6月到9月',
    days: [4, 6],
    budgetLevel: 2,
    tags: ['徒步', '山野风景'],
    hook: '高山、湖泊和木屋让轻徒步也能拥有很高的风景密度',
    strength: '体能门槛相对可控但风景回报很高',
    highlights: ['富内斯山谷', '刀锋三峰步道', '高山小木屋午餐', '湖区公路自驾'],
    tips: ['夏季最稳，缆车和山屋也更容易使用', '中短线步道就已经很出片'],
    audience: ['第一次做欧洲户外的人', '喜欢湖景和山路的人']
  },
  {
    slug: 'namibia-dunes',
    title: '纳米比亚 · 红沙海',
    country: '纳米比亚',
    location: '索苏斯弗雷',
    region: '非洲',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
    bestTime: '5月到10月',
    days: [5, 7],
    budgetLevel: 3,
    tags: ['荒野', '摄影'],
    hook: '红沙丘和白色盐盆的反差几乎天然适合做摄影主题旅行',
    strength: '极简地貌和尺度感带来的震撼',
    highlights: ['45号沙丘日出', '死亡谷白色盐盆', '星空露营', '荒野公路驾驶'],
    tips: ['线路分散，租车和补给规划很重要', '早晚温差很明显，要准备分层衣物'],
    audience: ['想走更小众非洲线路的人', '喜欢极简构图和极端地貌的人']
  },
  {
    slug: 'svaneti-mountains',
    title: '格鲁吉亚 · 高加索山村',
    country: '格鲁吉亚',
    location: '斯瓦涅季',
    region: '高加索',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    bestTime: '6月到9月',
    days: [4, 5],
    budgetLevel: 1,
    tags: ['小众目的地', '山野风景'],
    hook: '雪山、石塔和村落生活叠在一起，既有自然也有人味',
    strength: '小众感和在地生活感的平衡',
    highlights: ['梅斯蒂亚山村漫步', '中短线徒步看雪山', '石塔聚落和地方博物馆', '家庭旅馆晚餐'],
    tips: ['山区天气变化快，要留机动时间', '家庭旅馆通常比标准酒店更有体验'],
    audience: ['已经去过热门欧洲线的人', '喜欢村落与自然混合体验的人']
  },
  {
    slug: 'patagonia-w-trek',
    title: '智利 · 巴塔哥尼亚',
    country: '智利',
    location: '百内国家公园',
    region: '南美',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    bestTime: '11月到3月',
    days: [5, 7],
    budgetLevel: 3,
    tags: ['徒步', '长线旅行'],
    hook: '风、冰川和雪山把这条线路变成了很纯粹的户外记忆',
    strength: '高强度自然景观和明确的线路完成感',
    highlights: ['百内角峰观景', '冰川湖徒步', '山屋和营地体验', '强风下的山谷穿越'],
    tips: ['天气变化极快，保暖和防风必须做好', '热门季节营地和山屋需要提前订'],
    audience: ['想把徒步旅行做成核心主题的人', '已经有一点户外经验的人']
  },
  {
    slug: 'faroe-cliffs',
    title: '法罗群岛 · 海崖风暴',
    country: '法罗群岛',
    location: '托尔斯港周边',
    region: '北欧',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
    bestTime: '5月到9月',
    days: [4, 5],
    budgetLevel: 3,
    tags: ['海岛风景', '自驾'],
    hook: '海崖、草坡和低云形成了非常稳定的北大西洋氛围感',
    strength: '海岛线条感和天气变化带来的戏剧性',
    highlights: ['加萨达鲁尔瀑布', '悬崖步道和海鸟', '小镇港口慢逛', '山海公路驾驶'],
    tips: ['天气变化快，雨具和防风层很重要', '很多地方靠自驾串联，公共交通不够高效'],
    audience: ['喜欢海崖和公路风景的人', '想找更安静北欧线路的人']
  },
  {
    slug: 'lapland-glass-cabin',
    title: '芬兰 · 拉普兰极夜',
    country: '芬兰',
    location: '拉普兰',
    region: '北欧',
    image: 'https://images.unsplash.com/photo-1517821099601-9a13f2d1cfef?auto=format&fit=crop&w=1200&q=80',
    bestTime: '12月到3月',
    days: [4, 5],
    budgetLevel: 3,
    tags: ['极地风景', '冬季旅行'],
    hook: '玻璃屋、森林雪原和极光把冬季旅行的浪漫感拉得很满',
    strength: '冬季氛围和低温场景体验的完整性',
    highlights: ['玻璃屋极光夜', '雪地摩托与驯鹿雪橇', '森林桑拿', '冰雪村庄散步'],
    tips: ['保暖装备要认真准备，寒冷不是一句形容词', '圣诞前后价格高，越早订越稳'],
    audience: ['喜欢冬季氛围的人', '想把极光和雪地体验放在一起的人']
  },
  {
    slug: 'maldives-house-reef',
    title: '马尔代夫 · 居民岛与珊瑚礁',
    country: '马尔代夫',
    location: '阿里环礁',
    region: '印度洋',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
    bestTime: '11月到4月',
    days: [4, 6],
    budgetLevel: 2,
    tags: ['海岛度假', '潜水浮潜'],
    hook: '海水透明度高，轻松就能拿到很完整的度假氛围',
    strength: '休息感和水下体验的直给程度',
    highlights: ['居民岛慢住', '浮潜看珊瑚和海龟', '日落出海', '沙洲与浅海拍照'],
    tips: ['岛与岛之间转移要看船班时间', '浮潜装备自带和现场租借都要提前确认'],
    audience: ['想把休息感放第一位的人', '第一次认真浮潜的人']
  },
  {
    slug: 'madeira-cliff-trail',
    title: '葡萄牙 · 马德拉悬崖步道',
    country: '葡萄牙',
    location: '马德拉',
    region: '欧洲',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    bestTime: '4月到10月',
    days: [4, 6],
    budgetLevel: 2,
    tags: ['海岛风景', '徒步'],
    hook: '海崖、云海和花园山路让这座岛很适合做轻户外',
    strength: '海岛度假和徒步风景的混合效率',
    highlights: ['皮科鲁伊沃步道', '悬崖海岸公路', '丰沙尔老城', '天然火山泳池'],
    tips: ['岛上高低落差大，租车会方便很多', '热门步道天气不好时要及时调整'],
    audience: ['想把海和山放进同一趟旅行的人', '不想做高强度登山的人']
  },
  {
    slug: 'banff-lake-road',
    title: '加拿大 · 班夫湖区公路',
    country: '加拿大',
    location: '班夫与贾斯珀',
    region: '北美',
    image: 'https://images.unsplash.com/photo-1508261303786-1f64fe4e3ab2?auto=format&fit=crop&w=1200&q=80',
    bestTime: '6月到9月',
    days: [5, 7],
    budgetLevel: 2,
    tags: ['湖泊风景', '自驾'],
    hook: '湖色、雪山和森林公路组合出了很标准的北美国家公园记忆',
    strength: '视觉稳定度高，且公路串联逻辑很清晰',
    highlights: ['露易丝湖和梦莲湖', '冰原大道自驾', '湖边轻徒步', '班夫小镇温泉'],
    tips: ['夏季是热门时段，湖区停车位紧张', '想看好天气下的湖色要尽量早出发'],
    audience: ['第一次做北美自驾的人', '喜欢湖泊和山峰组合的人']
  },
  {
    slug: 'peru-cusco-valley',
    title: '秘鲁 · 库斯科圣谷',
    country: '秘鲁',
    location: '库斯科与圣谷',
    region: '南美',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    bestTime: '5月到10月',
    days: [4, 6],
    budgetLevel: 2,
    tags: ['文化体验', '长线旅行'],
    hook: '古印加遗迹和山谷地形让文化体验也能同时拥有很强风景密度',
    strength: '历史感和山地场景的叠加',
    highlights: ['马丘比丘', '欧雁台与盐田', '库斯科老城', '高原铁路和山谷村落'],
    tips: ['高海拔适应要优先考虑', '圣谷比直接住高处更适合第一晚过渡'],
    audience: ['喜欢文明遗迹的人', '想把南美文化线和风景线结合的人']
  },
  {
    slug: 'jordan-wadi-rum',
    title: '约旦 · 佩特拉与瓦迪拉姆',
    country: '约旦',
    location: '佩特拉与瓦迪拉姆',
    region: '西亚',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    bestTime: '3月到5月，10月到11月',
    days: [4, 5],
    budgetLevel: 2,
    tags: ['沙漠景观', '文明遗迹'],
    hook: '石城遗迹和红色沙漠组合出了很强的史诗感',
    strength: '遗迹与荒漠双主线带来的反差',
    highlights: ['佩特拉古城', '瓦迪拉姆四驱穿越', '沙漠营地星空', '峡谷日落'],
    tips: ['日照强烈，补水和遮阳比想象中更重要', '佩特拉步行量不小，鞋要选对'],
    audience: ['喜欢历史和地貌一起看的用户', '想体验沙漠营地的人']
  },
  {
    slug: 'bali-ubud-rice',
    title: '印尼 · 乌布与梯田',
    country: '印度尼西亚',
    location: '巴厘岛乌布',
    region: '东南亚',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    bestTime: '4月到10月',
    days: [4, 6],
    budgetLevel: 1,
    tags: ['疗愈度假', '城市漫游'],
    hook: '稻田、丛林酒店和手作生活让这条线更像恢复状态的旅行',
    strength: '休息感和生活方式体验的融合',
    highlights: ['德格拉朗梯田', '乌布市集与咖啡馆', '丛林泳池酒店', '瑜伽与香薰体验'],
    tips: ['热门网红点容易堵车，最好错峰出发', '住在乌布周边通常比海边更适合慢节奏'],
    audience: ['想用旅行恢复状态的人', '喜欢生活方式内容的人']
  },
  {
    slug: 'slovenia-julian-lakes',
    title: '斯洛文尼亚 · 湖区与阿尔卑斯',
    country: '斯洛文尼亚',
    location: '布莱德与特里格拉夫',
    region: '欧洲',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    bestTime: '5月到9月',
    days: [4, 5],
    budgetLevel: 1,
    tags: ['湖泊风景', '轻徒步'],
    hook: '湖、山和小镇的比例非常舒服，很适合想找低压力欧洲线路的人',
    strength: '风景稳定度高而且执行门槛不高',
    highlights: ['布莱德湖晨景', '博希尼湖和牧场', '山谷公路', '卢布尔雅那老城'],
    tips: ['湖区适合租车但路况并不复杂', '不用每天跑很远，近距离切换就够丰富'],
    audience: ['第一次做欧洲小国线路的人', '更喜欢舒服而不是刺激的人']
  },
  {
    slug: 'scotland-isle-skye',
    title: '苏格兰 · 天空岛风景线',
    country: '英国',
    location: '天空岛',
    region: '欧洲',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    bestTime: '5月到9月',
    days: [4, 5],
    budgetLevel: 2,
    tags: ['公路旅行', '山海风景'],
    hook: '悬崖、山谷和阴天光线把天空岛的气质拉得很统一',
    strength: '戏剧化天气和山海地貌形成的连续氛围',
    highlights: ['老人峰与仙女池', '海岸悬崖公路', '波特里小镇', '高地山谷停车观景'],
    tips: ['天气不好并不代表不值得拍，反而更像苏格兰', '住宿点尽量早订，旺季房源紧张'],
    audience: ['喜欢公路旅行的人', '偏爱阴天、海风和山谷感的人']
  },
  {
    slug: 'mexico-oaxaca-color',
    title: '墨西哥 · 瓦哈卡色彩线',
    country: '墨西哥',
    location: '瓦哈卡',
    region: '北美',
    image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=80',
    bestTime: '10月到3月',
    days: [4, 5],
    budgetLevel: 1,
    tags: ['文化体验', '美食'],
    hook: '手工艺、建筑色彩和地方饮食让这座城市很适合做内容型旅行',
    strength: '文化浓度高且不需要靠长距离移动支撑',
    highlights: ['老城建筑与广场', '市场和 mole 料理', '手工艺村落', '山顶遗址日落'],
    tips: ['城市本身节奏不快，适合用步行和短途车移动', '地方节庆期间体验更强但人也会更多'],
    audience: ['喜欢地方文化和饮食的人', '想把城市旅行做得有内容的人']
  },
  {
    slug: 'nepal-annapurna-foothills',
    title: '尼泊尔 · 安娜普尔纳山前',
    country: '尼泊尔',
    location: '博卡拉与安娜普尔纳山前',
    region: '南亚',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    bestTime: '10月到11月，3月到4月',
    days: [5, 7],
    budgetLevel: 1,
    tags: ['徒步', '山野风景'],
    hook: '雪山近到像贴在天际线上，非常适合第一次认真感受喜马拉雅',
    strength: '高山景观与低门槛线路的结合',
    highlights: ['博卡拉湖边晨景', '山前村落徒步', '观景台看雪山日出', '茶屋路线体验'],
    tips: ['山地天气变化快，步道安排要留冗余', '虽然门槛不算高，但鞋和保暖层不能省'],
    audience: ['想试试山地线路但不想从最难开始的人', '喜欢雪山和村落感的人']
  },
  {
    slug: 'new-zealand-south-island',
    title: '新西兰 · 南岛公路',
    country: '新西兰',
    location: '南岛',
    region: '大洋洲',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    bestTime: '11月到4月',
    days: [7, 9],
    budgetLevel: 2,
    tags: ['公路旅行', '湖泊风景'],
    hook: '雪山、湖泊、峡湾和星空能在一条公路线里连成连续高潮',
    strength: '大景观密度和成熟的自驾友好度',
    highlights: ['米尔福德峡湾', '皇后镇户外体验', '特卡波观星', '湖区雪山公路'],
    tips: ['南岛最好按片区分段，不要过度贪大求全', '热门季节租车和住宿价格波动很明显'],
    audience: ['想做高完成度自驾的人', '喜欢把自然景观当主菜的人']
  },
  {
    slug: 'norway-lofoten',
    title: '挪威 · 罗弗敦群岛',
    country: '挪威',
    location: '罗弗敦群岛',
    region: '北欧',
    image: 'https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?auto=format&fit=crop&w=1200&q=80',
    bestTime: '6月到9月，2月到3月',
    days: [5, 6],
    budgetLevel: 3,
    tags: ['海岛风景', '摄影'],
    hook: '渔村、海湾和锯齿状山峰让这里非常适合做北欧摄影线',
    strength: '极强的地形辨识度和沿海公路体验',
    highlights: ['红色渔屋和港湾', '海岸公路驾驶', '山海徒步', '午夜阳光或极光'],
    tips: ['天气和光线都很重要，最好给景色留两手准备', '岛上交通不复杂，但距离比想象中更长'],
    audience: ['喜欢海边山峰组合的人', '想拍出强烈北欧气质的人']
  }
]

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max)
}

function formatDuration([baseMin, baseMax], profile) {
  const min = Math.max(1, baseMin + profile.minAdjust)
  const max = Math.max(min, baseMax + profile.maxAdjust)

  return min === max ? `${min}天` : `${min}到${max}天`
}

function formatBudget(baseLevel, profile) {
  return budgetLabels[clamp(baseLevel + profile.budgetAdjust, 0, budgetLabels.length - 1)]
}

function buildTravel(seed, profile, id) {
  const duration = formatDuration(seed.days, profile)

  return {
    id,
    slug: `${seed.slug}-${profile.slugSuffix}`,
    name: `${seed.title} · ${profile.titleSuffix}`,
    country: seed.country,
    location: seed.location,
    region: seed.region,
    image: seed.image,
    shortDesc: `${profile.shortLead}，在${seed.location}你会更容易把${seed.strength}这件事看完整。`,
    summary: `${seed.hook}，${profile.summaryLine}`,
    fullDesc: `${seed.title}的核心优势是${seed.strength}。这一版路线不是把景点简单叠加，而是围绕“${seed.hook}”重新组织节奏，让你在${duration}里先把最容易留下记忆的部分体验完整。如果你对这个方向还没有把握，这一版会比盲目堆更多点更稳妥。`,
    bestTime: seed.bestTime,
    duration,
    budget: formatBudget(seed.budgetLevel, profile),
    tags: [...new Set([...seed.tags, ...profile.tags])],
    idealFor: [profile.idealLine, ...seed.audience].slice(0, 3),
    highlights: [profile.focusHighlight, ...seed.highlights.slice(0, 3)],
    tips: [profile.tipLine, ...seed.tips.slice(0, 2)]
  }
}

export const travels = destinationSeeds.slice(0, 20).flatMap((seed, seedIndex) =>
  routeProfiles.map((profile, profileIndex) =>
    buildTravel(seed, profile, seedIndex * routeProfiles.length + profileIndex + 1)
  )
)

export const travelTags = ['全部', ...new Set(travels.flatMap((travel) => travel.tags))]

export function getTravelBySlug(slug) {
  return travels.find((travel) => travel.slug === slug)
}

export function getRandomTravel(source = travels) {
  if (!source.length) {
    return null
  }

  return source[Math.floor(Math.random() * source.length)]
}

export function getRelatedTravels(slug, limit = 3) {
  const currentTravel = getTravelBySlug(slug)

  if (!currentTravel) {
    return []
  }

  return travels
    .filter((travel) => travel.slug !== slug)
    .sort((left, right) => {
      const leftScore = left.tags.filter((tag) => currentTravel.tags.includes(tag)).length
      const rightScore = right.tags.filter((tag) => currentTravel.tags.includes(tag)).length

      if (leftScore === rightScore) {
        return left.id - right.id
      }

      return rightScore - leftScore
    })
    .slice(0, limit)
}
