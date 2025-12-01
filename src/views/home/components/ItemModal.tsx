import { AppDispatch, RootState } from '@config';
import { Button, Divider, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Plate } from '@interfaces';
import {
  addItem,
  addPlate,
  decreaseItemQuantity,
  removeAllItems,
  removeItem,
  removePlate,
  resetPlates,
  updateItemName,
  updatePlate,
} from '@slices';

import AddPlateForm from './AddPlateForm';
import PlateListItem from './PlateListItem';

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

  const handleAddPlate = (plate: Plate) => {
    dispatch(addPlate(plate));
  };

  const handleEditPlate = (oldPrice: number, newPrice: number) => {
    dispatch(updatePlate({ oldPrice, newPrice }));
    dispatch(
      updateItemName({
        oldName: `plate-${oldPrice}`,
        newName: `plate-${newPrice}`,
        newPrice,
      }),
    );
  };

  const handleRemovePlate = (price: number) => {
    dispatch(removePlate(price));
    dispatch(removeItem(`plate-${price}`));
  };

  const handleResetAll = () => {
    dispatch(resetPlates());
    dispatch(removeAllItems());
  };

  const handleClearQuantity = () => {
    dispatch(removeAllItems());
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
        {[...plates]
          .sort((a, b) => a.price - b.price)
          .map((plate: Plate) => (
            <PlateListItem
              key={plate.price}
              plate={plate}
              quantity={getQuantity(plate.price)}
              onIncrease={() => handleIncrease(plate.price)}
              onDecrease={() => handleDecrease(plate.price)}
              onEdit={handleEditPlate}
              onRemove={() => handleRemovePlate(plate.price)}
            />
          ))}
      </PlateList>
      <Divider />
      {items.length > 0 && (
        <Button block onClick={handleClearQuantity}>
          Clear Quantity
        </Button>
      )}
      <Button
        danger
        block
        onClick={handleResetAll}
        style={{ marginTop: items.length > 0 ? 8 : 0 }}
      >
        Reset All
      </Button>
      <Divider />
      <AddPlateForm plates={plates} onAdd={handleAddPlate} />
    </Modal>
  );
};

export default ItemModal;
