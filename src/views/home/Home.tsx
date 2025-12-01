import { Button as AntButton, Flex, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '@config';
import { useTranslation } from 'react-i18next';
import ItemModal from './components/ItemModal';
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
  const { t } = useTranslation();
  const items = useSelector((state: RootState) => state.item.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { total, plateCount } = useMemo(() => {
    let total = 0;
    let plateCount = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
      plateCount += item.quantity;
    });
    return { total, plateCount };
  }, [items]);

  const onEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <ContentWrapper>
      <Flex vertical justify="center" align="center">
        <PriceDisplay>฿ {total}</PriceDisplay>
        <Flex justify="center" align="center">
          <span>{t('home.main.total', { count: plateCount })}</span>
          <AntButton color="blue" variant="link" onClick={onEditClick}>
            {t('home.main.edit')}
          </AntButton>
        </Flex>
      </Flex>
      <Row gutter={[12, 12]}>
        <PlateButtonList />
      </Row>
      <ItemModal
        isOpen={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />
    </ContentWrapper>
  );
};

export default Home;
