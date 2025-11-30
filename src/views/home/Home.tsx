import { Button as AntButton, Col, Flex, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { triggerHaptic } from 'tactus';

import { Button, PlateIcon } from '@components';
import { IPlate } from '@interfaces';

const ContentWrapper = styled.div`
  padding: 1rem 1rem;
`;

const PriceDisplay = styled.h1`
  font-size: 64px;
  color: #333;
`;

const PriceContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlatePrice = styled.span`
  font-size: 18px;
  color: #555;
`;

const Home: React.FC = () => {
  const plateList: IPlate[] = [
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
      price: 100,
      color: '#364153',
    },
  ];

  const onPriceClick = (price: number) => {
    triggerHaptic();
    console.log(`Price clicked: ${price} THB`);
  };

  return (
    <ContentWrapper>
      <Flex vertical justify="center" align="center">
        <PriceDisplay>1,080 THB</PriceDisplay>
        <Flex vertical justify="center" align="center">
          <span>Total: 23 Plates</span>
          <AntButton color="blue" variant="link">
            Click to edit/view details
          </AntButton>
        </Flex>
      </Flex>
      <Row gutter={[12, 12]}>
        {plateList.map((plate, index) => (
          <Col key={index} span={12} style={{ height: 72 }}>
            <Button onClick={() => onPriceClick(plate.price)}>
              <PriceContent>
                <PlateIcon color={plate.color} />
                <PlatePrice>{plate.price} THB</PlatePrice>
              </PriceContent>
            </Button>
          </Col>
        ))}
      </Row>
    </ContentWrapper>
  );
};

export default Home;
