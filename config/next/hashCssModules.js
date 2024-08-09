// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const loaderUtils = require('loader-utils')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// based on https://github.com/vercel/next.js/blob/992c46e63bef20d7ab7e40131667ed3debaf67de/packages/next/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent.ts
const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, '/')}#className:${exportName}`
      ),
      'md4',
      'base64',
      6
    )
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/^(-?\d|--)/, '_$1')

function hashCssModules(config, { dev }) {
  const rules = config.module.rules
    .find((rule) => typeof rule.oneOf === 'object')
    .oneOf.filter((rule) => Array.isArray(rule.use))

  if (!dev)
    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader?.includes('css-loader') &&
          !moduleLoader.loader?.includes('postcss-loader')
        )
          // eslint-disable-next-line no-param-reassign
          moduleLoader.options.modules.getLocalIdent = hashOnlyIdent

        // earlier below statements were sufficient:
        // delete moduleLoader.options.modules.getLocalIdent;
        // moduleLoader.options.modules.localIdentName = '[hash:base64:6]';
      })
    })

  return config
}

module.exports = { hashCssModules }
