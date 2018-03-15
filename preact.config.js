import path from "path"



export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  let babelConfig = rule.options
  babelConfig.plugins.push('relay')

  config.module.loaders.push({
    test: /\.mp3$/,
    include: path.resolve(__dirname, "./src/assets"),
    loader: 'file-loader'
  })
}
