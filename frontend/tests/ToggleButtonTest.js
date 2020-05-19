// __tests__/Toggle.js
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import Toggle from '../src/components/Search/Buttons/Toggle';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Toggle changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <Toggle text="Name " />,
  );

  expect(queryByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(queryByLabelText(/on/i)).toBeTruthy();
});
