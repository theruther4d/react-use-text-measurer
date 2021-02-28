import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

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
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      babel({
        extensions: ['.tsx'],
        babelHelpers: 'runtime',
        plugins: [['@babel/transform-runtime', {useESModules: true}]],
      }),
    ],
  },
];
