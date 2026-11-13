import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { ConfigProvider } from 'antd';
import { antdTheme } from './styles/antd-theme';
import { themeClass } from './styles/themes/theme.css';
import CreateCloud from './components/pages/CreateCloud';

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
            <Route path='/create-cloud' element={<CreateCloud />}/>
          </Routes>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
