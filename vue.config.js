module.exports = {
  // 编译加base目录和Apache下的目录一致
  publicPath: '/protein/',
  devServer: {
    proxy: 'http://222.200.186.47'
  }
}
