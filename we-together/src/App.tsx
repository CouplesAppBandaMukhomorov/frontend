import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { ConfigProvider } from 'antd';
import { antdTheme } from './styles/antd-theme';
import { themeClass } from './styles/themes/theme.css';
import CloudActions from './components/pages/CloudActions';
import CloudCreate from './components/pages/CloudCreate';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={antdTheme}>
        <div className={themeClass}>
          <Routes>
            <Route path='/' element={<>Главная</>}/>
            <Route path='/landing' element={<Landing />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/cloud/actions' element={<CloudActions />}/>
            <Route path='/cloud/create' element={<CloudCreate />}/>
            <Route path='/cloud/join' element={<h1>Присоединение к пространству</h1>}/>
          </Routes>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
