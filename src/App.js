import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { CreateGroup } from './components/CreateGroup';
import { AddMembers } from './components/AddMembers';
import { ExpenseMain } from './components/ExpenseMain';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<CreateGroup />} />
          <Route path='/members' element={<AddMembers />} />
          <Route path='/expense' element={<ExpenseMain />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
