import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { PlateIcon, QuantityControl } from '@components';
import { Plate } from '@interfaces';

interface Props {
  plate: Plate;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onEdit: (oldPrice: number, newPrice: number) => void;
  onRemove: () => void;
}

const PlateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
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

const PlateListItem: React.FC<Props> = ({
  plate,
  quantity,
  onIncrease,
  onDecrease,
  onEdit,
  onRemove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState<string>(String(plate.price));

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedPrice(String(plate.price));
  };

  const handleConfirmEdit = () => {
    const priceNum = parseInt(editedPrice, 10);
    if (priceNum && priceNum > 0) {
      onEdit(plate.price, priceNum);
      setIsEditing(false);
      setEditedPrice('');
    }
  };

  const handleRemove = () => {
    onRemove();
    setIsEditing(false);
    setEditedPrice('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPrice(String(plate.price));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setEditedPrice(value);
  };

  return (
    <PlateRow>
      <PlateInfo>
        <PlateIcon color={plate.color} />
        {isEditing ? (
          <>
            <Input
              size="small"
              value={editedPrice}
              onChange={handlePriceChange}
              onPressEnter={handleConfirmEdit}
              onBlur={handleCancelEdit}
              style={{ width: 80 }}
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <Button
              type="text"
              icon={<CheckOutlined style={{ color: '#23C552' }} />}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleConfirmEdit}
            />
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: '#F84F31' }} />}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleRemove}
            />
          </>
        ) : (
          <>
            <PlatePrice>฿ {plate.price}</PlatePrice>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={handleEditClick}
            />
          </>
        )}
      </PlateInfo>
      <QuantityControl
        quantity={quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </PlateRow>
  );
};

export default PlateListItem;
