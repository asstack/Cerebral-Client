import React, {Component} from 'react'
import AirbrakeClient from 'airbrake-js'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.airbrake = new AirbrakeClient({
      projectId: process.env.AIRBRAKE_PROJECT_ID,
      projectKey: process.env.AIRBRAKE_API_KEY
    });
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // Send error to Airbrake
    this.airbrake.notify({
      error: error,
      params: {info: info}
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
