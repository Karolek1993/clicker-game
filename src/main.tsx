import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

import { Provider } from './components/ui/provider.tsx';
import { UIContextProvider } from './context/UIContext';
import { GameLogicContextProvider } from './context/GameLogicContext';

createRoot(document.getElementById('root')!).render(
  <Provider>
    <UIContextProvider>
      <GameLogicContextProvider>
        <App />
      </GameLogicContextProvider>
    </UIContextProvider>
  </Provider>
);
