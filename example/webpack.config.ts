import webpack from 'webpack';
import * as path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { HTMLAttributeWebpackPlugin, HtmlTagObject } from '../src';

const resolve = (...paths: string[]) => path.resolve(__dirname, ...paths);

const config: webpack.Configuration = {
  mode: 'none',
  entry: resolve('./example.js'),
  output: {
    path: resolve('./dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: resolve('./index.html'),
      minify: false
    }),
    new HTMLAttributeWebpackPlugin(
      HTMLWebpackPlugin,
      {
        getAttributes: (tag: HtmlTagObject) => {
          return {
            ...tag.attributes,
            name: tag.tagName
          }
        },
        script: {
          crossorigin: 'anonymous'
        }
      }
    )
  ]
};

export default config;