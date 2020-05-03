import { DefaultTheme } from 'styled-components';
import media from './media';


const theme: DefaultTheme = {
  primary: '#53ABA6',
  highLight: '#EB8EB5',
  background: '#071B2B',
  detail: '#A7AFB4',
  white: '#FFFFFF',
  accent: '#F8DE92',
  fonts: {
    heading: 'Bebas Neue',
    body: 'Roboto',
  },
  fontSizes: ['12px', '16px', '20px', '24px', '32px', '48px', '64px'],
  space: ['8px', '16px', '24px', '32px', '40px', '48px', '64px', '96px'],
  xs: media.xs,
  sm: media.sm,
  md: media.md,
  lg: media.lg,
};

export default theme;
