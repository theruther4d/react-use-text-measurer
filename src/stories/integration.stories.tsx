import React from 'react';
import {TextMeasurementProvider, useTextMeasurer} from '../index';

export default {
  title: 'Integration',
};

const IntegrationComponent = () => {
  const measureA = useTextMeasurer('700 32px Arial');
  const measureB = useTextMeasurer('normal 1.5rem Times New Roman');
  const measureC = useTextMeasurer('300 16px Courier');

  return (
    <React.Fragment>
      <div data-testid="a" style={{marginBottom: '1rem'}}>
        <div>
          Sample:{' '}
          <span
            data-testid="text"
            style={{
              fontSize: 32,
              fontWeight: 700,
              fontFamily: 'Arial',
            }}
          >
            {sampleText}
          </span>
        </div>
        <div>
          Measured:{' '}
          <span data-testid="measurement">{measureA(sampleText)}</span>
        </div>
      </div>
      <div data-testid="b" style={{marginBottom: '1rem'}}>
        <div>
          Sample:{' '}
          <span
            data-testid="text"
            style={{
              fontSize: '1.5rem',
              fontFamily: 'Times New Roman',
            }}
          >
            {sampleText}
          </span>
        </div>
        <div>
          Measured:{' '}
          <span data-testid="measurement">{measureB(sampleText)}</span>
        </div>
      </div>
      <div data-testid="c" style={{marginBottom: '1rem'}}>
        <div>
          Sample:{' '}
          <span
            data-testid="text"
            style={{
              fontSize: 16,
              fontWeight: 300,
              fontFamily: 'Courier',
            }}
          >
            {sampleText}
          </span>
        </div>
        <div>
          Measured:{' '}
          <span data-testid="measurement">{measureC(sampleText)}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export const Integration = () => {
  return (
    <TextMeasurementProvider>
      <IntegrationComponent />
    </TextMeasurementProvider>
  );
};

const sampleText = 'Lorem Ipsum Dolor Sit Amet';
