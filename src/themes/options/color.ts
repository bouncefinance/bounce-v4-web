export const ColorOptions = {
  light: {
    white: '#fff',
    black: '#171717',
    primary: '#fff',
    secondary: '#171717',
    text: '#171717',
    success: '#73D491',
    warn: '#EBBC42',
    error: '#EB4242',

    // Gray
    'gray-900': '#171717',
    'gray-800': '#404040',
    'gray-700': '#878A8E',
    'gray-600': '#908E96',
    'gray-500': '#B3B7C8',
    'gray-400': '#C5C5C5',
    'gray-300': '#D8DBE7',
    'gray-200': '#E6E6E6',
    'gray-100': '#EBECEF',
    'gray-50': '#F5F5F5',
    'gray-30': '#EDEDED',

    // Green
    green: '#73D491',
    'green-1': '#20994B',
    // Blue
    blue: '#2663FF',
    'blue-50': '#245AE7',
    'blue-100': '#2150CC',
    // yellow
    'yellow-1': '#E1F25C',
    'yellow-2': '#C8F056',
    // text-color or bg-color
    'text-1': '#626262',
    'text-2': '#959595',
    'text-3': '#121212',
    'text-4': '#20201E',
    'text-5': '#D7D6D9',
    'text-6': '#58595B',
    'text-7': '#2B51DA'
  },
  dark: {
    white: '#000',
    black: '#fff',
    primary: '#292422',
    secondary: '#292422',
    text: '#C1BFB3',
    success: '#73D491',
    warn: '#EBBC42',
    error: '#EB4242',
    'gray-900': '#171717',
    'gray-800': '#404040',
    'gray-700': '#878A8E',
    'gray-600': '#908E96',
    'gray-500': '#B3B7C8',
    'gray-400': '#C5C5C5',
    'gray-300': '#D8DBE7',
    'gray-200': '#E6E6E6',
    'gray-100': '#EBECEF',
    'gray-50': '#F5F5F5',
    'gray-30': '#EDEDED',

    // Green
    green: '#73D491',
    'green-1': '#20994B',
    // Blue
    blue: '#2663FF',
    'blue-50': '#245AE7',
    'blue-100': '#2150CC',
    // yellow
    'yellow-1': '#E1F25C',
    'yellow-2': '#C8F056',
    // text-color or bg-color
    'text-1': '#626262',
    'text-2': '#959595',
    'text-3': '#121212',
    'text-4': '#20201E',
    'text-5': '#D7D6D9',
    'text-6': '#58595B',
    'text-7': '#2B51DA'
  }
}

export type IThemeColor = typeof ColorOptions.light & typeof ColorOptions.dark

export default ColorOptions
