import { PlusOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Form, InputNumber } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Plate } from '@interfaces';

interface Props {
  plates: Plate[];
  onAdd: (plate: Plate) => void;
}

const AddPlateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
`;

const AddPlateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const AddPlateForm: React.FC<Props> = ({ plates, onAdd }) => {
  const [color, setColor] = useState(getRandomColor);
  const [price, setPrice] = useState<number | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

  const handleAddPlate = () => {
    if (price && price > 0) {
      const existingPlate = plates.find((plate) => plate.price === price);
      if (existingPlate) {
        setPriceError('This price already exists');
        return;
      }
      onAdd({ price, color });
      setColor(getRandomColor());
      setPrice(null);
      setPriceError(null);
    }
  };

  const handlePriceChange = (value: number | null) => {
    setPrice(value);
    if (priceError) {
      setPriceError(null);
    }
  };

  return (
    <AddPlateSection>
      <AddPlateRow>
        <ColorPicker
          value={color}
          onChange={(c) => setColor(c.toHexString())}
        />
        <Form.Item
          validateStatus={priceError ? 'error' : ''}
          help={priceError}
          style={{ marginBottom: 0 }}
        >
          <InputNumber
            placeholder="Price"
            min={1}
            value={price}
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
          disabled={!price || price <= 0}
        >
          Add
        </Button>
      </AddPlateRow>
    </AddPlateSection>
  );
};

export default AddPlateForm;
