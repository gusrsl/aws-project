// Espaciado
export const SPACING = {
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
} as const;

// Breakpoints (en píxeles)
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

// Contenedor
export const CONTAINER = {
  sm: '95%',
  md: '90%',
  lg: '1400px',
} as const;

// Alturas
export const HEIGHTS = {
  navbar: {
    xs: 64,
    sm: 70,
  },
  footer: {
    xs: 56,
    sm: 64,
  },
} as const;

// Bordes
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: '50%',
} as const;

// Sombras
export const SHADOWS = {
  sm: {
    light: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    dark: '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.25)',
  },
  md: {
    light: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    dark: '0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25)',
  },
  lg: {
    light: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    dark: '0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.25)',
  },
  xl: {
    light: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    dark: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
  },
} as const;

// Transiciones
export const TRANSITIONS = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

// Z-index
export const Z_INDEX = {
  drawer: 1200,
  appBar: 1100,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const; 