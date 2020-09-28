import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('the weather app renders the correct title', () => {
  const { getByText } = render(<App />);

  const weatherAppTitle = getByText(/weather app/i);

  expect(weatherAppTitle).toBeInTheDocument();
});
