Page({
  data: {
    listMiniApps: [{
        name: 'Travel Tracker',
        href: "/pages/travel-tracker/travel-tracker"
      },
      {
        name: "Calculadora",
        href: "/pages/calculator/calculator"
      }

    ]
  },
  onHandleClickCard(href) {
    my.navigateTo({
      url: href
    })
  },
  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // Page loading is complete
  },
  onShow() {
    // Page display
  },
  onHide() {
    // Page hidden
  },
  onUnload() {
    // Page is closed
  },
  onTitleClick() {
    // Title clicked
  },
  onPullDownRefresh() {
    // Page is pulled down
  },
  onReachBottom() {
    // Page is pulled to the bottom
  },
  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});