import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

const env = process.env.NODE_ENV;
const config = {
  input: 'src/main.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true
    }),
    nodeResolve(),
    commonjs()
  ]
};

if (env === 'es' || env === 'cjs') {
  config.output = { format: env };
}
export default config;
