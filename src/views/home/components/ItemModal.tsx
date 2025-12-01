import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { AppDispatch, RootState } from '@config';
import { Button, ColorPicker, Divider, Form, InputNumber, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { PlateIcon, QuantityControl } from '@components';
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

const AddPlateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
`;

const AddPlateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ItemModal: React.FC<Props> = ({ isOpen, onOk, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const plates = useSelector((state: RootState) => state.plate.plates);
  const items = useSelector((state: RootState) => state.item.items);
  const [newColor, setNewColor] = useState('#1677ff');
  const [newPrice, setNewPrice] = useState<number | null>(null);
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [editedPrice, setEditedPrice] = useState<number | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

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

  const handleAddPlate = () => {
    if (newPrice && newPrice > 0) {
      const existingPlate = plates.find((plate) => plate.price === newPrice);
      if (existingPlate) {
        setPriceError('This price already exists');
        return;
      }
      dispatch(addPlate({ price: newPrice, color: newColor }));
      setNewColor('#1677ff');
      setNewPrice(null);
      setPriceError(null);
    }
  };

  const handlePriceChange = (value: number | null) => {
    setNewPrice(value);
    if (priceError) {
      setPriceError(null);
    }
  };

  const handleEditClick = (price: number) => {
    setEditingPrice(price);
    setEditedPrice(price);
  };

  const handleConfirmEdit = () => {
    if (editingPrice && editedPrice && editedPrice > 0) {
      dispatch(updatePlate({ oldPrice: editingPrice, newPrice: editedPrice }));
      dispatch(
        updateItemName({
          oldName: `plate-${editingPrice}`,
          newName: `plate-${editedPrice}`,
          newPrice: editedPrice,
        }),
      );
      setEditingPrice(null);
      setEditedPrice(null);
    }
  };

  const handleRemovePlate = (price: number) => {
    dispatch(removePlate(price));
    dispatch(removeItem(`plate-${price}`));
    setEditingPrice(null);
    setEditedPrice(null);
  };

  const handleResetAll = () => {
    dispatch(resetPlates());
    dispatch(removeAllItems());
  };

  const handleClearQuantity = () => {
    dispatch(removeAllItems());
  };

  const resetForm = () => {
    setNewColor('#1677ff');
    setNewPrice(null);
    setEditingPrice(null);
    setEditedPrice(null);
    setPriceError(null);
  };

  const handleModalClose = () => {
    resetForm();
    onCancel();
  };

  const handleModalOk = () => {
    resetForm();
    onOk();
  };

  return (
    <Modal
      title="Item list"
      open={isOpen}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <PlateList>
        {[...plates]
          .sort((a, b) => a.price - b.price)
          .map((plate: Plate) => (
            <PlateRow key={plate.price}>
              <PlateInfo>
                <PlateIcon color={plate.color} />
                {editingPrice === plate.price ? (
                  <>
                    <InputNumber
                      size="small"
                      min={1}
                      value={editedPrice}
                      onChange={(value) => setEditedPrice(value)}
                      style={{ width: 80 }}
                    />
                    <Button
                      type="text"
                      icon={<CheckOutlined style={{ color: '#52c41a' }} />}
                      onClick={handleConfirmEdit}
                    />
                    <Button
                      type="text"
                      icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                      onClick={() => handleRemovePlate(plate.price)}
                    />
                  </>
                ) : (
                  <>
                    <PlatePrice>฿ {plate.price}</PlatePrice>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEditClick(plate.price)}
                    />
                  </>
                )}
              </PlateInfo>
              <QuantityControl
                quantity={getQuantity(plate.price)}
                onIncrease={() => handleIncrease(plate.price)}
                onDecrease={() => handleDecrease(plate.price)}
              />
            </PlateRow>
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
      <AddPlateSection>
        <AddPlateRow>
          <ColorPicker
            value={newColor}
            onChange={(color) => setNewColor(color.toHexString())}
          />
          <Form.Item
            validateStatus={priceError ? 'error' : ''}
            help={priceError}
            style={{ marginBottom: 0 }}
          >
            <InputNumber
              placeholder="Price"
              min={1}
              value={newPrice}
              onChange={handlePriceChange}
              addonBefore="฿"
              style={{ width: 120 }}
              status={priceError ? 'error' : ''}
            />
          </Form.Item>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddPlate}
            disabled={!newPrice || newPrice <= 0}
          >
            Add
          </Button>
        </AddPlateRow>
      </AddPlateSection>
    </Modal>
  );
};

export default ItemModal;
