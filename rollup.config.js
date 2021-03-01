import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import externalDeps from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/index.tsx',
    external: ['react', 'react-dom'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.umd.js',
        name: 'UseTextMeasurer',
        format: 'umd',
        sourcemap: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      externalDeps({
        includeDependencies: true,
      }),
      resolve(),
      babel({
        extensions: ['.tsx'],
        babelHelpers: 'runtime',
        plugins: [['@babel/transform-runtime', {useESModules: true}]],
      }),
      commonjs(),
    ],
  },
];
