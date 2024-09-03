const webpack = require('webpack');

module.exports = {
  publicPath: '/',  // 静的ファイルのURLパス
  outputDir: '../dist',  // ビルド結果を出力するディレクトリ
  assetsDir: 'static',     // ビルドされたCSSやJSファイルが配置されるサブディレクトリ
  indexPath: '../templates/index.html',    // ビルドされたindex.htmlの出力先
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      })
    ]
  }
}
