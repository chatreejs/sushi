import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Quantity = styled.span`
  font-size: 16px;
  font-weight: 500;
  min-width: 24px;
  text-align: center;
`;

const QuantityControl: React.FC<Props> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <QuantityControlWrapper>
      <Button
        type="text"
        icon={<MinusOutlined />}
        onClick={onDecrease}
        disabled={quantity === 0}
      />
      <Quantity>{quantity}</Quantity>
      <Button type="text" icon={<PlusOutlined />} onClick={onIncrease} />
    </QuantityControlWrapper>
  );
};

export default QuantityControl;
