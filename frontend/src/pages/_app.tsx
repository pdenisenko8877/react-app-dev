import { Route, Routes } from 'react-router-dom';

import { HomePage } from './home';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
