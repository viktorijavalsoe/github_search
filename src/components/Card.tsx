import React, { useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/named
import Star from '../assets/star.png';
import { IRepository } from '../interfaces/IRepository';
import ButtonIcon from './ButtonIcon';
import StyledLink from './StyledLink';

const Wrapper = styled.div`
  display: flex;
  align-items: center; 
  h3{
    color: ${({ theme }): string => theme.accent};
    font-family: ${({ theme }): string => theme.fonts.heading};
    text-align: left;
    font-size: ${({ theme }): string => theme.fontSizes[5]};
    flex: 1;
    margin: 0;
  }
`;

const StarContainer = styled.div`
  width: 40px;
  text-align: center;
  p{
    color: ${({ theme }): string => theme.highLight};
    font-family: ${({ theme }): string => theme.fonts.heading};
  }
  img{
    width:100%;
  }
`;

const Underline = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }): string => theme.detail};
  margin: ${({ theme }): string => theme.space[3]} 0;
`;

interface ICard{
  repository: IRepository;
  handleAddRepo: ((param: string) => Promise<any>);
}

const Card = ({ repository, handleAddRepo }: ICard) : JSX.Element => {
  const [isStarred, setIsStarred] = useState<boolean>(false);

  function addRepository(id: string) {
    handleAddRepo(id).then(() => {
      setIsStarred(true);
    });
  }
  return (

    <section key={repository.node.id}>
      <Wrapper>
        <h3>{repository.node.name}</h3>
        <StarContainer>
          <img src={Star} alt="star" />
          <p>{repository.node.stargazers.totalCount}</p>
        </StarContainer>
      </Wrapper>
			<ButtonIcon text="Add Repository" starred={isStarred} handleSubmit={() => addRepository(repository.node.id)} />

      <p>{repository.node.description}</p>
      <StyledLink href={repository.node.url}>
        View repository
      </StyledLink>
      <Underline />
    </section>

  );
};


export default Card;
