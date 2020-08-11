# HTMLAttributeWebpackPlugin

A Webpack plugin for add custom attributes to HTML tags

## Example
[webpack.config.ts](./example/webpack.config.ts)

## Usage

* Use CommonJs
```javascript
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { HTMLAttributeWebpackPlugin } = require('html-attribute-webpack-plugin')

const config = {
  // ...
  plugins: [
    new HTMLWebpackPlugin({
      template: 'path/to/your/template'
    }),
    new HTMLAttributeWebpackPlugin(
      HTMLWebpackPlugin,
      {
        getAttributes: tag => {
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
}
```

* Use TypeScript
```typescript
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { HTMLAttributeWebpackPlugin, HtmlTagObject } from 'html-attribute-webpack-plugin';

const config: webpack.Configuration = {
  // ...
  plugins: [
    new HTMLWebpackPlugin({
      template: 'path/to/your/template'
    }),
    new HTMLAttributeWebpackPlugin(
      HTMLWebpackPlugin,
      {
        getAttributes: (tag: HtmlTagObject) => {
          return {
            ...tag.attributes,
            name: tag.tagName
          }
        },,
        script: {
          crossorigin: 'anonymous'
        }
      }
    )
  ]
}
```