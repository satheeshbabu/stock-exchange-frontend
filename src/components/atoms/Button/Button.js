import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 36px;
  border-radius: 50px;
  border: none;
  color: white;
  text-transform: uppercase;
  font-weight: ${({ theme }) => (theme.bold)};
  margin-top: 15px;
  margin-bottom: 30px;
  transition: .3s ease;
  background-color: ${({ theme }) => (theme.primary)};

  
  &:focus {
    outline: none;
  }
  
  &:hover {
    cursor: pointer; 
    transition: .3s ease;
    background-color: ${({ theme }) => (theme.secondary)};
  }
`;

export default Button;
