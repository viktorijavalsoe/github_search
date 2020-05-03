import { css } from 'styled-components';

const breakpoints: {[key: string]: number} = {
  xs: 30,
  sm: 48,
  md: 62,
  lg: 75,
};

const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]): string => css`
      @media (max-width: ${breakpoints[label]}em) {
         ${css(literals, ...placeholders)};
      }
   `.join('');
  return acc;
}, {} as Record<keyof typeof breakpoints, (l: TemplateStringsArray, ...p: any[])=> string>);

export default media;
