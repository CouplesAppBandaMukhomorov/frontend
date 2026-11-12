import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Landing from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { ConfigProvider } from 'antd';
import { antdTheme } from './styles/antd-theme';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={antdTheme}>
        <Routes>
          <Route path='/landing' element={<Landing />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
