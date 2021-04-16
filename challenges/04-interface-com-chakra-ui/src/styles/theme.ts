import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      "600": "#47585B",
      "500": "#999999",
      "400": "#CCCCCC",
      "300": "#dadada",
      "50": "#F5F8FA",
    },
    yellow: {
      "500": "#FFBA08",
      "300": "#FFDC83"
    }
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.600'
      },
      button: {
        cursor: 'pointer'
      },

      // Custom Swiper styles
      ".swiper-container": {
        width: '100%'
      },
      ".swiper-slide": {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      ".swiper-button-prev": {
        color: 'yellow.500',
        ml: ['2', '10']
      },
      ".swiper-button-next": {
        color: 'yellow.500',
        mr: ['2', '10']
      },
      ".swiper-pagination-bullet": {
        background: 'gray.500',
        width: ['8px', '16px'],
        height: ['8px', '16px']
      },
      ".swiper-pagination-bullet-active": {
        background: 'yellow.500',
        width: ['8px', '16px'],
        height: ['8px', '16px']
      }
    }
  },
})