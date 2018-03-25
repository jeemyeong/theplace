import * as React from 'react'
import { nest } from 'recompose';

export default (...outerComponents: React.ComponentClass[]) => (wrappedComponent: React.ComponentClass) => nest(...outerComponents, wrappedComponent);