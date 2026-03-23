import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Changelog from './pages/Changelog'
import TermsOfService from './pages/legal/TermsOfService'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import DMCAPolicy from './pages/legal/DMCAPolicy'
import CookiePolicy from './pages/legal/CookiePolicy'
import Disclaimer from './pages/legal/Disclaimer'
import UGCDisclaimer from './pages/legal/UGCDisclaimer'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/dmca" element={<DMCAPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/ugc-disclaimer" element={<UGCDisclaimer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
