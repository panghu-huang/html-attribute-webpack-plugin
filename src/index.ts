import { Plugin, Compiler } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { isObject } from './utils';

export interface HTMLAttributes {
  [attributeName: string]: string | boolean;
}

export type HtmlTagObject = HTMLWebpackPlugin.HtmlTagObject;

export type TagFunction = (tag: HtmlTagObject) => HTMLAttributes;

export interface Options {
  getAttributes: TagFunction;
  script: TagFunction | HTMLAttributes;
  style: TagFunction | HTMLAttributes;
}

const pluginName = 'HTMLAttributeWebpackPlugin';

export class HTMLAttributeWebpackPlugin implements Plugin {

  private readonly htmlWebpackPlugin: typeof HTMLWebpackPlugin;
  private readonly options: Options;

  constructor(
    htmlWebpackPlugin: typeof HTMLWebpackPlugin,
    options: Partial<Options> = {}
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin;
    this.options = this.formatOptions(options);
  }

  public apply(compiler: Compiler) {
    const htmlWebpackPlugin = this.htmlWebpackPlugin;

    compiler.hooks.compilation.tap(
      pluginName,
      compilation => {
        htmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
          pluginName,
          template => {
            template.assetTags.scripts = this.mergeAttributes(template.assetTags.scripts);
            template.assetTags.styles = this.mergeAttributes(template.assetTags.styles);
            return template;
          }
        );
      }
    );
  }

  private mergeAttributes(tags: HtmlTagObject[]): HtmlTagObject[] {
    const { getAttributes } = this.options;
    return tags.map(tag => {
      let attributes = getAttributes(tag);
      if (!attributes || typeof attributes !== 'object') {
        attributes = tag.attributes;
      }
      const tagName = tag.tagName as 'script' | 'style';
      const attributesOrFn = this.options[tagName];
      if (typeof attributesOrFn === 'function') {
        const newAttributes = attributesOrFn(tag);
        if (isObject(newAttributes)) {
          Object.assign(attributes, newAttributes);
        }
      } else if (isObject(attributesOrFn)) {
        Object.assign(attributes, attributesOrFn);
      }
      return {
        ...tag,
        attributes
      }
    });
  }

  private formatOptions(options: Partial<Options>) {
    const script = options.script || {};
    const style = options.style || {};
    const getAttributes = options.getAttributes || (tag => tag.attributes);
    return {
      script,
      style,
      getAttributes
    }
  }

}