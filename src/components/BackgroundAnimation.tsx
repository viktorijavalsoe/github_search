import React, { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import BackgroundImage from '../assets/background.png';
import BackgroundImage2 from '../assets/background2.png';
import Planet from '../assets/planet.png';


const animate = keyframes`
  0%, 20%, 40%, 60%, 80%, 100% {
    opacity: 0;
  }
  10%, 30%, 50%, 70%, 90%  {
    opacity: 1;
  }
`;


const backgroundMove = keyframes`
  0% {
    transform: scale(1);
  }
  100%  {
    transform: scale(2);
  }
`;


const Container = styled.div`
position: relative;
width: 100%;
height: 100vh;
overflow: hidden;
background-color: ${({ theme }): string => theme.background};
`;


const StarContainer = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
poinet-event: none;
animation: 8s ${animate} ease-in-out infinite, 16s ${backgroundMove} linear infinite;
&:first-of-type{
  animation-delay: 0s;
  background: url(${BackgroundImage});
}
&:nth-of-type(2){
  animation-delay: -1s;
  background: url(${BackgroundImage2});
}
&:nth-of-type(3){
  animation-delay: -2s;
  background: url(${BackgroundImage});
}
&:nth-of-type(4){
  animation-delay: -3s;
  background: url(${BackgroundImage2});
}
&:nth-of-type(5){
  animation-delay: -4s;
  background: url(${BackgroundImage2});
}
`;

const PlanetContainer = styled.div`
position: relative;
top: -35%;
right: -70%;
height: 700px;
width: 700px;
background: url(${Planet});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;

const TextContainer = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 2;
text-align: center;
`;


const BackgroundAnimation = ({ children }: {children: ReactNode}): JSX.Element => (
  <Container>
    <TextContainer>
      {children}
    </TextContainer>
    <StarContainer />
    <StarContainer />
    <StarContainer />
    <StarContainer />
    <StarContainer />
    <PlanetContainer />
  </Container>
);


export default BackgroundAnimation;
