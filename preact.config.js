import path from "path"



export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  let babelConfig = rule.options
  babelConfig.plugins.push('relay')
  rule.options.plugins.push('transform-regenerator')
  rule.options.plugins.push(["transform-runtime", {
    "helpers": false,
    "polyfill": false,
    "regenerator": true
  }])

  config.module.loaders.push({
    test: /\.mp3$/,
    include: path.resolve(__dirname, "./src/assets"),
    loader: 'file-loader'
  })
}
