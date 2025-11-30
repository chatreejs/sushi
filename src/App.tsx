import { App as AntApp, ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { Footer, LanguageSwitcher, Logo } from '@components';
import { persistor, store } from '@config';
import { Home } from '@views';
import { PersistGate } from 'redux-persist/integration/react';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 420px;
`;

const ProductLogoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 1.5rem;
  padding-left: 1.75rem;
  padding-right: 1.75rem;
`;

const LanguageSwitcherWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5rem 1.75rem;
`;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000',
          fontFamily: 'Varela Round, Kanit',
          fontSize: 14,
          fontWeightStrong: 700,
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AntApp>
            <MainWrapper>
              <ProductLogoWrapper>
                <Logo systemName="Sushi!" showEnvBadge={true} />
              </ProductLogoWrapper>
              <LanguageSwitcherWrapper>
                <LanguageSwitcher />
              </LanguageSwitcherWrapper>
              <Home />
              <Footer />
            </MainWrapper>
          </AntApp>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
