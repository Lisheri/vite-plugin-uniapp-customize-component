import { Options } from './uniappCustomizeComponent';
const UniappCustomizeComponent = (options: Options = {}) => {
  options = Object.keys(options).reduce((prev: Options, item: string) => {
    return {
      ...prev,
      [`${item}.json`]: options[item]
    }
  }, {});
  const name: string = 'vite-plugin-vue-uniapp-customize-component';
  return {
    name,
    // 在文件写入结束时调用
    generateBundle(_code: any, bundle: any) {
      Object.keys(bundle).forEach(name => {
        if (Object.keys(options).includes(name)) {
          const usingComponentsOption = options[name];
          const appJson = JSON.parse(bundle[name].source)
          appJson.usingComponents = {
            ...(appJson.usingComponents || {}),
            ...usingComponentsOption
          }
          bundle[name].source = JSON.stringify(appJson);
        }
      })
    }
  };
};
export default UniappCustomizeComponent;
