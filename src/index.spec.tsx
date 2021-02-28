/**
 * @jest-environment jsdom
 */
import React, {ComponentType} from 'react';
import {render, screen} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {TextMeasurementProvider, useTextMeasurer} from '.';

export const tests = describe('TextMeasurementProvider', () => {
  it('Renders the <canvas /> and passes-through props.', () => {
    render(
      <TextMeasurementProvider
        data-testid="canvas-id"
        className="test-className"
      >
        <h1>My App</h1>
      </TextMeasurementProvider>
    );

    expect(screen.getByText(/My App/)).toBeInTheDocument();

    const canvas = screen.getByTestId('canvas-id');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveProperty('className', 'test-className');
  });

  it('useTextMeasurer', () => {
    const {result} = renderHook(() => useTextMeasurer('400 32px Arial'), {
      wrapper: TextMeasurementProvider as ComponentType,
    });
    const measurer = result.current;
    expect(typeof measurer).toBe('function');
    expect(measurer('Lorem ipsum dolor sit amet')).toBe(390);
  });
});
