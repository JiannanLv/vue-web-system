/*
 * @Description:
 * @Author: jiannan.lv
 * @Date: 2019-05-14 15:34:45
 * @LastEditTime: 2019-11-26 19:27:54
 * @LastEditors: jiannan.lv
 */
const navConfig = [
  {
    icon: 'iconfont iconshouye',
    path: '/home',
    name: '主页'
  },
  {
    icon: 'iconfont iconuserlist',
    path: '/user',
    name: '用户列表'
  },
  {
    icon: 'iconfont icontubiaoshu-copy',
    path: '/echarts',
    name: '图表'
  },
  {
    icon: 'iconfont iconcom',
    path: '/comcon',
    name: '公用组件'
  },
  {
    icon: 'iconfont icondata',
    path: '/mock',
    name: 'Mock数据'
  },
  {
    icon: 'iconfont icondrag',
    path: '',
    name: 'Canvas',
    extend: false,
    children: [
      {
        icon: 'iconfont icondrag',
        path: '/particleAnimator',
        name: '粒子动画'
      },
      {
        icon: 'iconfont icondrag',
        path: '/rain',
        name: '下雨'
      }
    ]
  }
];
export default navConfig;
