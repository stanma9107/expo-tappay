import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoTappayViewProps } from './ExpoTappay.types';

const NativeView: React.ComponentType<ExpoTappayViewProps> =
  requireNativeViewManager('ExpoTappay');

export default function ExpoTappayView(props: ExpoTappayViewProps) {
  return <NativeView {...props} />;
}
