import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoTappay.web.ts
// and on native platforms to ExpoTappay.ts
import ExpoTappayModule from './ExpoTappayModule';
import ExpoTappayView from './ExpoTappayView';
import { ChangeEventPayload, ExpoTappayViewProps } from './ExpoTappay.types';

// Get the native constant value.
export const PI = ExpoTappayModule.PI;

export function hello(): string {
  return ExpoTappayModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoTappayModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoTappayModule ?? NativeModulesProxy.ExpoTappay);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoTappayView, ExpoTappayViewProps, ChangeEventPayload };
