import { Route, Routes } from 'react-router';

import App from './components/App';
import Details from './components/Details';
import NotFound from './components/NotFound';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path=":personId" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
