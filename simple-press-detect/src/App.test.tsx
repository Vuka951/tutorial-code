import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bulb off img', () => {
  render(<App />);
  const bulbOffImg = screen.getByAltText('bulb-off');
  expect(bulbOffImg).toBeInTheDocument();
});
