import { Button as AntButton, Flex, Row } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '@config';
import { removeAllItems } from '@slices';
import PlateButtonList from './components/PlateButtonList';

const ContentWrapper = styled.div`
  padding: 1rem 1rem;
`;

const PriceDisplay = styled.span`
  font-size: 64px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const Home: React.FC = () => {
  const items = useSelector((state: RootState) => state.item?.items);
  const dispatch = useDispatch();

  const { total, plateCount } = useMemo(() => {
    let total = 0;
    let plateCount = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
      plateCount += item.quantity;
    });
    return { total, plateCount };
  }, [items]);

  const onReset = () => {
    dispatch(removeAllItems());
  };

  return (
    <ContentWrapper>
      <Flex vertical justify="center" align="center">
        <PriceDisplay>{total} THB</PriceDisplay>
        <Flex justify="center" align="center">
          <span>Total: {plateCount} Plates</span>
          <AntButton color="blue" variant="link">
            edit
          </AntButton>
        </Flex>
        <AntButton color="danger" variant="link" onClick={onReset}>
          reset
        </AntButton>
      </Flex>
      <Row gutter={[12, 12]}>
        <PlateButtonList />
      </Row>
    </ContentWrapper>
  );
};

export default Home;
