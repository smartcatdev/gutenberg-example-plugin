module.exports = {
  entry: `${__dirname}/src/index.js`,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }, 
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@example': `${__dirname}/src`,
      '@wordpress': `${__dirname}/src/wordpress`
    }
  },
  output: {
    filename: 'block.bundle.js',
    path: `${__dirname}/build`,
  }
}