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
import LinkCloud from './components/pages/LinkCloud';
import NoCoupleGuard from './components/NoCoupleGuard';
import CoupleHome from './components/pages/CoupleHome';
import Profile from './components/pages/Profile';
import ProfileSettings from './components/pages/ProfileSettings';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={antdTheme}>
        <div className={themeClass}>
          <Routes>
            <Route path='/' element={<CoupleHome />}/>
            <Route path='/calendar' element={<CoupleHome section='calendar' />}/>
            <Route path='/products' element={<CoupleHome section='products' />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/profile/settings' element={<ProfileSettings />}/>
            <Route path='/landing' element={<Landing />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route element={<NoCoupleGuard />}>
              <Route path='/cloud/actions' element={<CloudActions />}/>
              <Route path='/cloud/create' element={<CloudCreate />}/>
              <Route path='/cloud/join' element={<LinkCloud />}/>
            </Route>
          </Routes>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
