const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./**/*.html'],

  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    ...(process.env.NODE_ENV === 'production'
      ? [purgecss, require('cssnano')]
      : []),
    require('autoprefixer'),
  ],
};
