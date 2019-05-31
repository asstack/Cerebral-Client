import React from 'react'
import AirbrakeClient from 'airbrake-js'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    if (props.airbrake_project && props.airbrake_key) {
      this.airbrake = new AirbrakeClient({
        projectId: props.airbrake_project,
        projectKey: props.airbrake_key
      });
    }
    else {
      // TODO: let someone know that Airbrake isn't working...
      this.airbrake = null;
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // Send error to Airbrake
    if (this.airbrake) {
      this.airbrake.notify({
        error: error,
        params: {info: info}
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>An unforseen error has occurred. Our technical staff has been notified and are working on a solution to the problem.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary