import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Campaigns from '@/pages/Campaigns';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='nudgedm-theme'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='campaigns' element={<Campaigns />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
