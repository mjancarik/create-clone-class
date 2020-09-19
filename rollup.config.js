import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import run from '@rollup/plugin-run';

const watchMode = process.env.ROLLUP_WATCH === 'true';

const config = {
  input: 'src/main.js',
  treeshake: {
    moduleSideEffects: 'no-external',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    watchMode &&
      run({
        execArgv: ['-r', 'source-map-support/register'],
      }),
  ],
  watch: {
    include: 'src/**',
  },
  output: [
    {
      file: `./dist/createCloneClass.js`,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: `./dist/createCloneClass.cjs`,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: `./dist/createCloneClass.mjs`,
      format: 'esm',
      exports: 'named',
    },
  ],
};

export default config;
