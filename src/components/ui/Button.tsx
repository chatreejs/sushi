import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
}

const StyledButton = styled.div`
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const ButtonContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 12px;
  border-color: #d9d9d9;
  border-style: solid;
  border-width: 2px 2px 6px 2px;
`;

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <StyledButton onClick={onClick}>
      <ButtonContent>{children}</ButtonContent>
    </StyledButton>
  );
};

export default Button;
