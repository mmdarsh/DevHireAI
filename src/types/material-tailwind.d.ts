declare module '@material-tailwind/react' {
  import { ReactNode } from 'react';

  export interface ButtonProps {
    children?: ReactNode;
    className?: string;
    color?: string;
    variant?: string;
    size?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    placeholder?: string;
  }

  export interface CardProps {
    children?: ReactNode;
    className?: string;
    color?: string;
    shadow?: boolean;
    placeholder?: string;
  }

  export interface CardHeaderProps {
    children?: ReactNode;
    className?: string;
    color?: string;
    floated?: boolean;
    placeholder?: string;
  }

  export interface CardBodyProps {
    children?: ReactNode;
    className?: string;
    placeholder?: string;
  }

  export interface TypographyProps {
    children?: ReactNode;
    className?: string;
    color?: string;
    variant?: string;
    placeholder?: string;
  }

  export interface InputProps {
    type?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    size?: string;
    required?: boolean;
    disabled?: boolean;
    crossOrigin?: string;
    className?: string;
    labelProps?: {
      className?: string;
    };
    containerProps?: {
      className?: string;
    };
  }

  export const Button: React.FC<ButtonProps>;
  export const Card: React.FC<CardProps>;
  export const CardHeader: React.FC<CardHeaderProps>;
  export const CardBody: React.FC<CardBodyProps>;
  export const Typography: React.FC<TypographyProps>;
  export const Input: React.FC<InputProps>;
  export const ThemeProvider: React.FC<{ children: ReactNode }>;
} 