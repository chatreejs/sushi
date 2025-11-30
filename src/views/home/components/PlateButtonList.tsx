import { Col } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { triggerHaptic } from 'tactus';

import { Button, PlateIcon } from '@components';
import { Plate } from '@interfaces';
import { addItem } from '@slices';
import { useDispatch } from 'react-redux';

const PriceContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlatePrice = styled.span`
  font-size: 18px;
  color: #555;
`;

const defaultPlateList: Plate[] = [
  {
    price: 30,
    color: '#fcf9fa',
  },
  {
    price: 40,
    color: '#ec003f',
  },
  {
    price: 60,
    color: '#cad5e2',
  },
  {
    price: 80,
    color: '#f0b100',
  },
  {
    price: 120,
    color: '#364153',
  },
];

const PlateButtonList: React.FC = () => {
  const dispatch = useDispatch();

  const onPriceClick = (price: number) => {
    triggerHaptic();
    dispatch(
      addItem({
        name: `plate-${price}`,
        price: price,
        quantity: 1,
      }),
    );
  };

  return (
    <>
      {defaultPlateList.map((plate, index) => (
        <Col key={index} span={12} style={{ height: 72 }}>
          <Button onClick={() => onPriceClick(plate.price)}>
            <PriceContent>
              <PlateIcon color={plate.color} />
              <PlatePrice>{plate.price} THB</PlatePrice>
            </PriceContent>
          </Button>
        </Col>
      ))}
    </>
  );
};

export default PlateButtonList;
