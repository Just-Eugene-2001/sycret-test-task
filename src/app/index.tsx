import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hook';
import { loadCertificatesList } from '../redux/certificatesSlice';

import Main from './main';
import Form from './form';
import Success from './success';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCertificatesList());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/form'} element={<Form/>}/>
        <Route path={'/success'} element={<Success/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
