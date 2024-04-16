import { createBrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import AddCard from '../components/AddCard/AddCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/addCard',
    element: <AddCard />,
  },
]);

export default router;
