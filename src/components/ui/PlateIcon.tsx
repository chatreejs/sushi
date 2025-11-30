import styled from 'styled-components';

const PlateIcon = styled.span<{ color?: string }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${({ color }) => color ?? '#333'};
  border: 3px solid
    ${({ color }) => `color-mix(in srgb, black 10%, ${color ?? '#333'})`};
`;

export default PlateIcon;
