export const ColorOptions = {
  light: {
    white: '#fff',
    black: '#121212',
    primary: '#fff',
    secondary: '#121212',
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
    'border-1': 'rgba(18, 18, 18, 0.2)',
    'gray-20': '#E8E9E4',
    // Green
    green: '#73D491',
    'green-1': '#20994B',
    // Blue
    blue: '#2663FF',
    'blue-50': '#245AE7',
    'blue-100': '#2150CC',
    // yellow
    'yellow-1': '#E1F25C',
    'yellow-2': '#B5E529',
    // text-color or bg-color
    'text-1': '#626262',
    'text-2': '#959595',
    'text-3': '#121212',
    'text-4': '#20201E',
    'text-5': '#D7D6D9',
    'text-6': '#58595B',
    'text-7': '#2B51DA',
    'text-8': '#f6f7f3'
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
    'gray-20': '#E8E9E4',
    'border-1': 'rgba(18, 18, 18, 0.2)',
    // Green
    green: '#73D491',
    'green-1': '#20994B',
    // Blue
    blue: '#2663FF',
    'blue-50': '#245AE7',
    'blue-100': '#2150CC',
    // yellow
    'yellow-1': '#E1F25C',
    'yellow-2': '#B5E529',
    // text-color or bg-color
    'text-1': '#626262',
    'text-2': '#959595',
    'text-3': '#121212',
    'text-4': '#20201E',
    'text-5': '#D7D6D9',
    'text-6': '#58595B',
    'text-7': '#2B51DA',
    'text-8': '#f6f7f3'
  }
}

export type IThemeColor = typeof ColorOptions.light & typeof ColorOptions.dark

export default ColorOptions
