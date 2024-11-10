// src/__tests__/App.test.js

import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
    test('renders list of events', () => {
        const AppDOM = render(<App />).container.firstChild;
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
      });

    test('render CitySearch', () => {
        const AppDOM = render().container.firstChild;
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
        });
});