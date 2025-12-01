import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { AppDispatch, RootState } from '@config';
import { Button, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { PlateIcon } from '@components';
import { Plate } from '@interfaces';
import { addItem, decreaseItemQuantity } from '@slices';

interface Props {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const PlateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const PlateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PlatePrice = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const QuantityControl = styled.div`
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

const ItemModal: React.FC<Props> = ({ isOpen, onOk, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const plates = useSelector((state: RootState) => state.plate.plates);
  const items = useSelector((state: RootState) => state.item.items);

  const getQuantity = (price: number) => {
    const item = items.find((item) => item.name === `plate-${price}`);
    return item?.quantity ?? 0;
  };

  const handleIncrease = (price: number) => {
    dispatch(addItem({ name: `plate-${price}`, quantity: 1, price }));
  };

  const handleDecrease = (price: number) => {
    dispatch(decreaseItemQuantity({ name: `plate-${price}`, quantity: 1 }));
  };

  return (
    <Modal
      title="Item list"
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <PlateList>
        {plates.map((plate: Plate) => (
          <PlateRow key={plate.price}>
            <PlateInfo>
              <PlateIcon color={plate.color} />
              <PlatePrice>฿ {plate.price}</PlatePrice>
            </PlateInfo>
            <QuantityControl>
              <Button
                type="text"
                icon={<MinusOutlined />}
                onClick={() => handleDecrease(plate.price)}
                disabled={getQuantity(plate.price) === 0}
              />
              <Quantity>{getQuantity(plate.price)}</Quantity>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => handleIncrease(plate.price)}
              />
            </QuantityControl>
          </PlateRow>
        ))}
      </PlateList>
    </Modal>
  );
};

export default ItemModal;
