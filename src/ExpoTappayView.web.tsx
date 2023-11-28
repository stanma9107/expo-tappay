import * as React from 'react';

import { ExpoTappayViewProps } from './ExpoTappay.types';

export default function ExpoTappayView(props: ExpoTappayViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
