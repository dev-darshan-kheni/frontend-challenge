import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';

import TodoApp from '../pages/Todo';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center">
        <TodoApp />
      </div>
      <ToastContainer />
    </RecoilRoot>
  );
}

export default App;
