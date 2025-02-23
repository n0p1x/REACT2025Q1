import { Route, Routes } from 'react-router';
import NotFound from './components/NotFound';
import App from './components/App';
import Details from './components/Details';

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
