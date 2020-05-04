/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';

const StyledBurger = styled.button<StyledBurgerProps>`
    position: absolute;
    top: ${({ theme }) : string => theme.space[2]};
    right: ${({ theme }) : string => theme.space[2]};
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: ${({ theme }): string => theme.space[3]};
    height: ${({ theme }): string => theme.space[3]};
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: ${(props): string => (props.open ? '6' : '2')};  
    &:active {
        outline: none;
    }
    div {
        height: 4px;
        background: ${(props) : string => (props.open ? props.theme.highLight : props.theme.accent)};
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
        :first-child {
            width: ${({ theme }) : string => theme.space[3]};
            transform:  ${(props): string => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
        }
        :nth-child(2) {
            width: ${({ theme }) : string => theme.space[2]};
            margin-left: auto;
            opacity: ${(props): string => (props.open ? '0' : '1')};
            transform: ${(props): string => (props.open ? 'translateX(20px)' : 'translateX(0)')};
        }
        :nth-child(3) {
            width: ${({ theme }) => theme.space[3]};
            transform: ${(props): string => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
        }
    }
`;

type StyledBurgerProps = {
  open: boolean;
};

const Hamburger = ({ open, setOpen } : {open: boolean, setOpen: ((open: boolean)=> void) }): JSX.Element => (
  <StyledBurger
    open={open}
    onClick={() => setOpen(!open)}
  >
    <div />
    <div />
    <div />
  </StyledBurger>
);

export default Hamburger;
