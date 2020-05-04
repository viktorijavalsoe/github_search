import styled from 'styled-components';

export const StyledH1 = styled.h1`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes[5]};
    margin: 0;
`;

export const StyledH2 = styled.h2`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    font-weight: 300;
`;
export const StyledParagraph = styled.p`
    font-family: ${({ theme }) => theme.fonts.body};
`;
