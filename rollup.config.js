import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs'; // 你的包用到的第三方只有commonjs形式的包
import { terser } from 'rollup-plugin-terser'; // 压缩
import path from 'path';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js', // package.json 中 "module": "dist/index.esm.js"
      format: 'esm', // es module 形式的包， 用来import 导入， 可以tree shaking
      sourcemap: true
    }, {
      file: 'dist/index.cjs.js', // package.json 中 "main": "dist/index.cjs.js",
      format: 'cjs', // commonjs 形式的包， require 导入 
      sourcemap: true
    }, {
      file: 'dist/index.umd.js',
      name: 'GLWidget',
      format: 'umd', // umd 兼容形式的包， 可以直接应用于网页 script
      sourcemap: true
    }
  ],
  // 这个插件是有执行顺序的
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    commonjs(),
    terser(),
  ]
};
