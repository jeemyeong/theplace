import * as React from 'react'
import { nest } from 'recompose';

export default (...outerComponents: (React.ComponentClass|React.StatelessComponent)[]) => (wrappedComponent: React.ComponentClass|React.StatelessComponent) => nest(...outerComponents, wrappedComponent);