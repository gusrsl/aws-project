import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Link,
  Paper,
  useTheme,
  CircularProgress,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/store';
import { authService } from '../../services/auth.service';
import { setCredentials } from '../../store/auth/authSlice';
import { showSnackbar } from '../../store/ui/uiSlice';
import { AnimatedButton } from '../../components/common/AnimatedButton';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<RegisterForm>();
  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      const { confirmPassword, ...registerData } = data;
      const response = await authService.register(registerData);
      dispatch(setCredentials(response));
      dispatch(showSnackbar({ 
        message: '¡Registro exitoso! Bienvenido.',
        severity: 'success'
      }));
      navigate('/tasks');
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al registrar usuario';
      
      if (errorMessage.toLowerCase().includes('email')) {
        setError('email', { 
          type: 'manual', 
          message: 'Este correo electrónico ya está registrado' 
        });
      }
      
      dispatch(showSnackbar({ 
        message: errorMessage,
        severity: 'error'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 4 },
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.grey[50],
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={theme.palette.mode === 'dark' ? 4 : 1}
            sx={{
              p: { xs: 3, sm: 4 },
              width: '100%',
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              backgroundImage: 'none',
            }}
          >
            <Stack spacing={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  component={motion.h1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  variant="h4"
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                  }}
                >
                  Crear Cuenta
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ 
                    maxWidth: '400px',
                    mx: 'auto',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  Completa el formulario para crear tu cuenta
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Stack spacing={2.5}>
                  <TextField
                    required
                    fullWidth
                    label="Nombre"
                    autoComplete="name"
                    autoFocus
                    disabled={isLoading}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register('name', {
                      required: 'El nombre es requerido',
                      minLength: {
                        value: 2,
                        message: 'El nombre debe tener al menos 2 caracteres',
                      },
                    })}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Correo Electrónico"
                    autoComplete="email"
                    disabled={isLoading}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email', {
                      required: 'El correo es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Correo electrónico inválido',
                      },
                    })}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Contraseña"
                    type="password"
                    disabled={isLoading}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password', {
                      required: 'La contraseña es requerida',
                      minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres',
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
                        message: 'La contraseña debe contener al menos una letra y un número',
                      },
                    })}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Confirmar Contraseña"
                    type="password"
                    disabled={isLoading}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    {...register('confirmPassword', {
                      required: 'Por favor confirma tu contraseña',
                      validate: value =>
                        value === password || 'Las contraseñas no coinciden',
                    })}
                  />
                  <AnimatedButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{ 
                      height: 48,
                      position: 'relative',
                      mt: 1,
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: theme.palette.primary.contrastText,
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    ) : (
                      'Registrarse'
                    )}
                  </AnimatedButton>
                </Stack>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegisterPage; 