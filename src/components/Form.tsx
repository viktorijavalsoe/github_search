import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.input`
  height: ${({ theme }): string => theme.space[4]};
  margin-bottom: 16px;
  font-size: ${({ theme }): string => theme.fontSizes[1]};
  padding: ${({ theme }): string => theme.space[0]};
`;

const SubmitBtn = styled(InputField)`
  background-color: ${({ theme }): string => theme.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  border: none;
  color: white;
  text-transform: uppercase;
`;

interface IAppProps {
  token: string;
  handleChange: ((e: React.ChangeEvent<HTMLInputElement>) => void);
  handleSubmit: ((e: React.FormEvent<HTMLFormElement>) => void);
}

const App = ({ token, handleChange, handleSubmit }: IAppProps): JSX.Element => (
  <Form onSubmit={handleSubmit}>
    <InputField type="text" name="token" value={token} onChange={handleChange} />
    <SubmitBtn type="submit" value="Submit" />
  </Form>
);

export default App;
