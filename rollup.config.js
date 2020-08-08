import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
};

export default config;