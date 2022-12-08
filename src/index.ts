import { Options, Platform } from "./uniappCustomizeComponent";

// 插件本体
const UniappCustomizeComponent = (
  options: Options = {},
  platform: Platform = "wx"
) => {
  options = Object.keys(options).reduce((prev: Options, item: string) => {
    return {
      ...prev,
      [`${item}.json`]: options[item],
      [`${item}.${platform}ml`]: options[item],
    };
  }, {});
  const name: string = "vite-plugin-vue-uniapp-customize-component";
  return {
    name,
    // 在文件写入结束时调用
    generateBundle(_options: any, bundle: any) {
      Object.keys(bundle).forEach((bundleName) => {
        if (Object.keys(options).includes(bundleName)) {
          const currentBundle = bundle[bundleName];
          if (bundleName.includes("json")) {
            // 处理配置文件
            const usingComponentsOption = options[bundleName];
            const appJson = JSON.parse(currentBundle.source);
            appJson.usingComponents = {
              ...(appJson.usingComponents || {}),
              ...usingComponentsOption,
            };
            currentBundle.source = JSON.stringify(appJson);
          } else {
            // 处理组件标签属性
            const tags = Object.keys(options[bundleName]);
            tags.forEach((tag) => {
              const reg = new RegExp(`\\<${tag}[\\s\\S]*?((/>|</${tag}>)`, "g");
              currentBundle.source = currentBundle.source.replace(
                reg,
                (str: string) => {
                  if (!str.includes('u-t="m"')) {
                    // 构建出来没有u-t="m"属性
                    const targetProps = 'u-t="m"';
                    const resourcePropsArr = str.split(" ");
                    resourcePropsArr.splice(2, 0, targetProps);
                    return resourcePropsArr.join(" ");
                  }
                  return str;
                }
              );
            });
          }
        }
      });
    },
  };
};
export default UniappCustomizeComponent;
