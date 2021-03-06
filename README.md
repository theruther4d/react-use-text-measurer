# react-use-text-measurer

A hook for synchronously measuring text in react applications using an offscreen `<canvas />` along with [`CanvasRenderingContext2D.measureText()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText) to make measurements.

```tsx
const YourComponent = (props) => {
  const measureTitle = useTextMeasurer("600 24px 'Source Sans Pro'");

  return (
    <>
      <h1>{props.title}</h1>
      <div>👆 {measureTitle(props.title)}px</div>
    </>
  )
}
```

## Installation

```
# with npm
npm install react-use-text-measurer

# with yarn
yarn add react-use-text-measurer
```

## Usage
First, wrap your app (or any subtree where you'd like to use `useTextMeasurer`) in the provider: `TextMeasurementProvider` which is repsonsible for caching measurements, managing the hidden `<canvas />` element, and exposing context for `useTextMeasurer`. It accepts all the arguments the native `<canvas />` element does and passes them through, so you can override things like `style`.

```tsx
import {TextMeasurementProvider} from 'react-use-text-measurer';

export function YourApp() {
  return (
    <TextMeasurementProvider>
      <YourApp>
        {/** ... */}
      </YourApp>
    </TextMeasurementProvider>
  )
}
```

Then, use the hook to create a measuring function by providing a [CSS font specifier](https://developer.mozilla.org/en-US/docs/Web/CSS/font):

```tsx
const YourComponent = (props) => {
  const measureTitle = useTextMeasurer("600 24px 'Source Sans Pro'");

  return (
    <>
      <h1>{props.title}</h1>
      <div>👆 {measureTitle(props.title)}px</div>
    </>
  )
}
```

## Why?
For example, to build a [windowed list without DOM measuring](https://github.com/theruther4d/react-use-text-measurer/blob/master/src/stories/examples.stories.tsx#L16).