import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // surfaced in the console so it's never a silent black screen
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
            background: "#0D0D0D",
            color: "#F0EEE8",
            fontFamily: '"Chakra Petch", sans-serif',
          }}
        >
          <h1 style={{ color: "#E8223F", letterSpacing: "0.1em" }}>
            Something broke
          </h1>
          <p style={{ color: "#B0ADA6", maxWidth: 600 }}>
            {String(this.state.error?.message || this.state.error)}
          </p>
          <button
            className="rw-btn"
            onClick={() => window.location.reload()}
            style={{ marginTop: "1rem" }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
