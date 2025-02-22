import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAppSelector } from '../store/store';
import { Layout } from '../components/layout/Layout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { PageTransition } from '../components/common/PageTransition';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ReactElement } from 'react';

// Lazy load components
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const TasksPage = lazy(() => import('../pages/tasks/TasksPage'));

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
              <Suspense fallback={<LoadingSpinner />}>
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <PageTransition>
                  <RegisterPage />
                </PageTransition>
              </Suspense>
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
              <Suspense fallback={<LoadingSpinner />}>
                <PageTransition>
                  <TasksPage />
                </PageTransition>
              </Suspense>
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