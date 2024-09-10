import React, { CSSProperties } from 'react';

export interface LabelProps {
  state?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  isFocused?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  required?: boolean;
  message?: string;
  iconPrefix?: React.ReactNode;
  iconPrefixStyle?: CSSProperties;
  onIconPrefix?: () => void;
  iconSuffix?: React.ReactNode;
  iconSuffixStyle?: CSSProperties;
  onIconSuffix?: () => void;
}

export interface TextInputProps extends Omit<LabelProps, 'children'> {
  name?: string;
  value: string;
  type?: 'text' | 'password';
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}
