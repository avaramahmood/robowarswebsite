import About from "./components/About/About";
import FAQ from "./components/FAQ/FAQ";
import ScrollSequence from "./components/ScrollSequence/ScrollSequence";
import Navbar from "./components/Navbar/Navbar";
import Gallery from "./components/Gallery/Gallery";
import Sponsors from "./components/Sponsors/Sponsors";
import Contact from "./components/Contact/Contact";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import Ticker from "./components/Ticker/Ticker";
import WeightClasses from "./components/WeightClasses/WeightClasses";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Loadingpage from "./components/Loadingpage/Loadingpage";
import { lazy, Suspense, useEffect, useState } from "react";
import Lenis from "lenis";
import CursorTrail from "./components/Cursoranimation/Cursoranimation";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

// Lazy chunks: a failure in these pages can't take down the homepage.
const Tournament = lazy(() => import("./components/Tournament/Tournament"));
const Watchlive = lazy(() => import("./components/WatchLive/Watchlive"));

const PageFallback = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "grid",
      placeContent: "center",
      color: "#B0ADA6",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
    }}
  >
    Loading…
  </div>
);

function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1000);

  const [a, setA] = useState(100);
  const [loading, setLoading] = useState(true);

  // Buttery smooth scrolling site-wide; ScrollSequence's magnetic snap
  // reuses the instance via window.__lenis.
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (a) {
      setTimeout(() => {
        setA(a - 2);
      }, 16);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [a]);

  return (
    // overflow-x: clip (not hidden) so position: sticky keeps working inside
    <div className="App" style={{ overflowX: "clip" }}>
      {!loading && isLargeScreen && <CursorTrail />}
      {!loading && <AudioPlayer />}

      <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route
              path="/"
              element={
                loading ? (
                  <Loadingpage value={100 - a} />
                ) : (
                  <div>
                    <Navbar />
                    <ScrollSequence />
                    <Ticker />
                    <About />
                    <WeightClasses />
                    <Gallery />
                    <FAQ />
                    <Sponsors />
                    <Contact />
                    <Footer />
                  </div>
                )
              }
            />
            <Route
              path="/tournament"
              element={
                <div>
                  <Tournament />
                </div>
              }
            />
            <Route
              path="/watchlive"
              element={
                <div>
                  <Watchlive />
                </div>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
