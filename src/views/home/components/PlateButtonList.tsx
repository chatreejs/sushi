import { Col } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { triggerHaptic } from 'tactus';

import { Button, PlateIcon } from '@components';
import { AppDispatch, RootState } from '@config';
import { addItem, resetPlates } from '@slices';

const PriceContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlatePrice = styled.span`
  font-size: 18px;
  color: #555;
`;

const PlateButtonList: React.FC = () => {
  const plates = useSelector((state: RootState) => state.plate.plates);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (plates.length === 0) {
      dispatch(resetPlates());
    }
  }, [plates, dispatch]);

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
      {[...plates]
        .sort((a, b) => a.price - b.price)
        .map((plate, index) => (
          <Col key={index} span={12} style={{ height: 72 }}>
            <Button onClick={() => onPriceClick(plate.price)}>
              <PriceContent>
                <PlateIcon color={plate.color} />
                <PlatePrice>฿ {plate.price}</PlatePrice>
              </PriceContent>
            </Button>
          </Col>
        ))}
    </>
  );
};

export default PlateButtonList;
