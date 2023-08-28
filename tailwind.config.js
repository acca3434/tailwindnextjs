const pxToRem = (px, base = 16) => `${px / base}rem`
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => index + start)
const getPxr = (end) => range(1, end).map((_, i) => pxToRem(i))
const pxr10 = getPxr(10)
const pxr100 = getPxr(100)
const pxr200 = getPxr(200)
const pxr500 = getPxr(500)
const config = {
  screens: {
      mobile: '360px', // @media (min-width: 360px)
      foldable: '523px', // @media (min-width: 523px)
      tablet: '768px', // @media (min-width: 768px)
      'under-foldable': { max: '522px' }, // @media (max-width: 522px)
      'under-tablet': { max: '767px' }, // @media (max-width: 767px)
      'under-mobile': { max: '359px' }, // @media (max-width: 359px)
      'small-pc': { max: '1440px' }, // @media (max-width: 1200px)
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
      fontFamily: {
          NanumGothic: ['NanumGothic'],
          NanumSquare: ['NanumSquare'],
      },
      fontWeight: {
          tiny: '200',
          normal: '400',
          bold: '800',
      },
    extend: {
        spacing: pxr500,
        fontSize: pxr100,
        borderWidth: pxr10,
        lineHeight: pxr100,
        minWidth: pxr200,
        minHeight: pxr100,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
