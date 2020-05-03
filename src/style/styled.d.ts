import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string,
    highLight: string,
    background: string,
    white: string,
    detail: string,
    accent: string,
    fonts: {
      heading: string;
      body:string;
    };
    fontSizes: Array<string>;
    space: Array<string>;
    xs: Function;
    sm: Function;
    md: Function;
    lg: Function;
  }
}
