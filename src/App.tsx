import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import { homeRoute, transactionsRoute } from './utils/routes';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path={homeRoute} element={<Dashboard />} />
          <Route path={transactionsRoute} element={<Transactions />} />
          <Route path="*" element={<Navigate to={homeRoute} replace />} />
          {/* Redirect unknown routes to Dashboard */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
