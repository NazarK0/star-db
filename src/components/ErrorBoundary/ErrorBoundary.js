import React, { Component } from 'react';
import ErrorIndicator from '../ErrorIndicator';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }
}

export default ErrorBoundary;