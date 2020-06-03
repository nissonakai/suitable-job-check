import React from 'react';
import { render } from '@testing-library/react';
import { Root } from './Root';

test('renders the title', () => {
  const { getByText } = render(<Root />);
  const appTitle = getByText(/適職診断テスト/i);
  expect(appTitle).toBeInTheDocument();
});
