import '@fontsource/dela-gothic-one';
import '@fontsource/kanit';
import '@fontsource/varela-round';
import { createRoot } from 'react-dom/client';

import App from './App';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
