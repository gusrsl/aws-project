// Regex patterns
export const PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  NAME: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
};

// Validation messages
export const MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  EMAIL: {
    INVALID: 'El correo electrónico no es válido',
    EXISTS: 'Este correo electrónico ya está registrado',
  },
  PASSWORD: {
    MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
    PATTERN: 'La contraseña debe contener al menos una letra, un número y un carácter especial',
    MATCH: 'Las contraseñas no coinciden',
  },
  NAME: {
    MIN_LENGTH: 'El nombre debe tener al menos 2 caracteres',
    PATTERN: 'El nombre solo puede contener letras y espacios',
  },
  TASK: {
    TITLE: {
      MIN_LENGTH: 'El título debe tener al menos 3 caracteres',
      MAX_LENGTH: 'El título no puede tener más de 100 caracteres',
    },
    DESCRIPTION: {
      MIN_LENGTH: 'La descripción debe tener al menos 10 caracteres',
      MAX_LENGTH: 'La descripción no puede tener más de 500 caracteres',
    },
  },
};

// Validation functions
export const validateEmail = (email: string): boolean => {
  return PATTERNS.EMAIL.test(email);
};

export const validatePassword = (password: string): boolean => {
  return PATTERNS.PASSWORD.test(password);
};

export const validateName = (name: string): boolean => {
  return PATTERNS.NAME.test(name);
};

export const validateTaskTitle = (title: string): boolean => {
  return title.length >= 3 && title.length <= 100;
};

export const validateTaskDescription = (description: string): boolean => {
  return description.length >= 10 && description.length <= 500;
};

// Error handling
export interface ValidationError {
  field: string;
  message: string;
}

export const validateForm = (data: Record<string, any>): ValidationError[] => {
  const errors: ValidationError[] = [];

  Object.entries(data).forEach(([field, value]) => {
    if (!value) {
      errors.push({ field, message: MESSAGES.REQUIRED });
      return;
    }

    switch (field) {
      case 'email':
        if (!validateEmail(value)) {
          errors.push({ field, message: MESSAGES.EMAIL.INVALID });
        }
        break;
      case 'password':
        if (!validatePassword(value)) {
          errors.push({ field, message: MESSAGES.PASSWORD.PATTERN });
        }
        break;
      case 'name':
        if (!validateName(value)) {
          errors.push({ field, message: MESSAGES.NAME.PATTERN });
        }
        break;
      case 'title':
        if (!validateTaskTitle(value)) {
          errors.push({ field, message: MESSAGES.TASK.TITLE.MIN_LENGTH });
        }
        break;
      case 'description':
        if (!validateTaskDescription(value)) {
          errors.push({ field, message: MESSAGES.TASK.DESCRIPTION.MIN_LENGTH });
        }
        break;
    }
  });

  return errors;
}; 