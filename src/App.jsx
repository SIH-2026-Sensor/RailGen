import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RailGenProvider } from './context/RailGenContext';

// Layout
import { AppShell } from './components/layout/AppShell';

// Public Pages
import { Home } from './pages/public/Home';
import { Login } from './pages/public/Login';
import { SignUp } from './pages/public/SignUp';
import { ForgotPassword } from './pages/public/ForgotPassword';

// Manager Pages
import { ManagerOverview } from './pages/manager/ManagerOverview';

// Department Pages
import { EngineeringOverview } from './pages/engineering/EngineeringOverview';
import { TractionOverview } from './pages/traction/TractionOverview';
import { SignalOverview } from './pages/signal/SignalOverview';
import { AdminOverview } from './pages/admin/AdminOverview';

export default function App() {
  return (
    <RailGenProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Authenticated Routes inside AppShell */}
          <Route element={<AppShell />}>
            {/* Manager Routes */}
            <Route path="/manager" element={<ManagerOverview />} />
            <Route path="/manager/approvals" element={<ManagerOverview />} />
            <Route path="/manager/requests" element={<ManagerOverview />} />
            <Route path="/manager/maintenance" element={<ManagerOverview />} />
            <Route path="/manager/block-schedule" element={<ManagerOverview />} />
            <Route path="/manager/block-planning" element={<ManagerOverview />} />

            {/* Engineering / Civil Routes */}
            <Route path="/engineering" element={<EngineeringOverview />} />
            <Route path="/engineering/inspection" element={<EngineeringOverview />} />
            <Route path="/engineering/defects" element={<EngineeringOverview />} />
            <Route path="/engineering/requests" element={<EngineeringOverview />} />
            <Route path="/engineering/maintenance" element={<EngineeringOverview />} />
            <Route path="/engineering/assets" element={<EngineeringOverview />} />
            <Route path="/engineering/reports" element={<EngineeringOverview />} />
            <Route path="/engineering/schedules" element={<EngineeringOverview />} />

            {/* Traction / TRD Routes */}
            <Route path="/traction" element={<TractionOverview />} />
            <Route path="/traction/monitoring" element={<TractionOverview />} />
            <Route path="/traction/faults" element={<TractionOverview />} />
            <Route path="/traction/requests" element={<TractionOverview />} />
            <Route path="/traction/maintenance" element={<TractionOverview />} />
            <Route path="/traction/assets" element={<TractionOverview />} />
            <Route path="/traction/schedules" element={<TractionOverview />} />

            {/* Signal & Telecom Routes */}
            <Route path="/signal-telecom" element={<SignalOverview />} />
            <Route path="/signal-telecom/faults" element={<SignalOverview />} />
            <Route path="/signal-telecom/requests" element={<SignalOverview />} />
            <Route path="/signal-telecom/equipment" element={<SignalOverview />} />
            <Route path="/signal-telecom/reports" element={<SignalOverview />} />
            <Route path="/signal-telecom/assets" element={<SignalOverview />} />
            <Route path="/signal-telecom/schedules" element={<SignalOverview />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/users" element={<AdminOverview />} />
            <Route path="/admin/departments" element={<AdminOverview />} />
            <Route path="/admin/roles" element={<AdminOverview />} />
            <Route path="/admin/audit" element={<AdminOverview />} />
            <Route path="/admin/settings" element={<AdminOverview />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </RailGenProvider>
  );
}
