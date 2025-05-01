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
    ],
    buttonImages: [
      'https://example.com/button1-a.jpg',
      'https://example.com/button2-a.jpg',
      'https://example.com/button3-a.jpg',
      'https://example.com/button4-a.jpg'
    ],
    originalImages: [
      'https://example.com/button1-a.jpg',
      'https://example.com/button2-a.jpg',
      'https://example.com/button3-a.jpg',
      'https://example.com/button4-a.jpg'
    ],
    activeButtonIndex: -1
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
  },
  goToPage1(e) {
    this.switchButtonImage(e);
    wx.navigateTo({
      url: '/pages/page1/index'
    });
  },
  goToPage2(e) {
    this.switchButtonImage(e);
    wx.navigateTo({
      url: '/pages/page2/index'
    });
  },
  goToPage3(e) {
    this.switchButtonImage(e);
    wx.navigateTo({
      url: '/pages/page3/index'
    });
  },
  goToPage4(e) {
    this.switchButtonImage(e);
    wx.navigateTo({
      url: '/pages/page4/index'
    });
  },
  switchButtonImage(e) {
    const index = e.currentTarget.dataset.index;
    const buttonImages = this.data.buttonImages;
    const originalImages = this.data.originalImages;
    const activeButtonIndex = this.data.activeButtonIndex;

    // 恢复之前激活的按钮图片
    if (activeButtonIndex !== -1) {
      buttonImages[activeButtonIndex] = originalImages[activeButtonIndex];
    }

    // 切换当前点击的按钮图片
    buttonImages[index] = buttonImages[index].includes('-a.jpg') ? buttonImages[index].replace('-a.jpg', '-b.jpg') : originalImages[index];

    this.setData({
      buttonImages,
      activeButtonIndex: index
    });
  }
});