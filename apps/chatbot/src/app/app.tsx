import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chatbot } from '../pages/chatbot';
import Dashboard from '../pages/dashboard/Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
