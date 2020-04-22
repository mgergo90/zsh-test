import { ChangeEvent } from 'react';

export interface AppBarProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
