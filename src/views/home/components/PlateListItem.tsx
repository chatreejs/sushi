import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
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
  const [editedPrice, setEditedPrice] = useState<number | null>(plate.price);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedPrice(plate.price);
  };

  const handleConfirmEdit = () => {
    if (editedPrice && editedPrice > 0) {
      onEdit(plate.price, editedPrice);
      setIsEditing(false);
      setEditedPrice(null);
    }
  };

  const handleRemove = () => {
    onRemove();
    setIsEditing(false);
    setEditedPrice(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPrice(plate.price);
  };

  return (
    <PlateRow>
      <PlateInfo>
        <PlateIcon color={plate.color} />
        {isEditing ? (
          <>
            <InputNumber
              size="small"
              min={1}
              value={editedPrice}
              onChange={(value) => setEditedPrice(value)}
              onPressEnter={handleConfirmEdit}
              onBlur={handleCancelEdit}
              style={{ width: 80 }}
              autoFocus
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
