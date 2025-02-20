import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { Layout } from '../components/layout/Layout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { TasksPage } from '../pages/tasks/TasksPage';
import { PageTransition } from '../components/common/PageTransition';
import { ReactElement } from 'react';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/tasks" />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas de autenticación */}
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={
            <PublicRoute>
              <PageTransition>
                <LoginPage />
              </PageTransition>
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <PageTransition>
                <RegisterPage />
              </PageTransition>
            </PublicRoute>
          }
        />
      </Route>

      {/* Rutas de la aplicación */}
      <Route element={<Layout />}>
        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <PageTransition>
                <TasksPage />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Route>
    </Routes>
  );
}; 