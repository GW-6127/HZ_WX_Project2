Page({
  data: {
    safeTop: 20, 
    services: [
      { id: 1, name: '就诊陪同', desc: '', backgroundImage: 'https://example.com/service1-bg.jpg' },
      { id: 2, name: '代挂号', desc: '', backgroundImage: 'https://example.com/service2-bg.jpg' },
      { id: 3, name: '代取报告', desc: '', backgroundImage: 'https://example.com/service3-bg.jpg' },
      { id: 4, name: '预约检查', desc: '', backgroundImage: 'https://example.com/service4-bg.jpg' },
      { id: 5, name: '专车服务', desc: '', backgroundImage: 'https://example.com/service5-bg.jpg' }
    ],
    banners: [
      'https://example.com/banner1.jpg',
      'https://example.com/banner2.jpg',
      'https://example.com/banner3.jpg'
    ]
  },
  onLoad() {
      wx.getWindowInfo({
          success: (res) => {
              this.setData({ safeTop: res.safeArea.top + 20 });
          },
          fail: (err) => {
              console.error('获取窗口信息失败', err);
          }
      });

      // 调用接口获取轮播图数据
      wx.request({
          url: 'http://localhost:3000/getBanners',
          method: 'GET',
          success: (res) => {
              if (res.data.success) {
                  this.setData({
                      banners: res.data.data
                  });
              }
          },
          fail: (err) => {
              console.error('获取轮播图数据失败', err);
          }
      });

      // 调用接口获取 service-item 底图 URL
      wx.request({
          url: 'http://localhost:3000/getServiceItemBackground',
          method: 'GET',
          success: (res) => {
              if (res.data.success) {
                  this.setData({
                      serviceItemBackground: res.data.data.backgroundImageUrl
                  });
              }
          },
          fail: (err) => {
              console.error('获取底图 URL 失败', err);
          }
      });
  },
  swiperChange(e) {
      console.log('当前轮播图索引：', e.detail.current);
  },
  goToBannerDetail() {
      wx.navigateTo({
          url: '/pages/banner/detail'
      });
  }
});