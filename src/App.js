import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif", color: "#333" }}>
      <Navbar />

      {/* HERO SECTION */}
      <section
      
        style={{
          
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "white",
        }}
      >
<img src="/golf.jpg" alt="Golf" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "-990% 0%", zIndex: -1, filter: "brightness(0.6)" }} /> <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "2rem", margin: "0 0 1rem 0", marginLeft: "500px", marginBottom: "65px", fontWeight: "700", fontStyle: "italic", color: "white", }} > your premier destination for Golf & Leisure </h1>
      </section>

      {/* ROW 1: Play left, Card right */}
<AlignedRow
  title="Play"
  
  cardText={
    <ul style={{ 
      textAlign: "left", 
      lineHeight: "1.8", 
      fontSize: "1rem", 
      paddingLeft: "1.2rem",
      listStyle: "none"
    }}>
      <li style={{ marginBottom: "0.5rem" }}>⛳ Book a Tee Time</li>
      <li style={{ marginBottom: "0.5rem" }}>💲 Course Fees & Membership</li>
      <li style={{ marginBottom: "0.5rem" }}>🏌️ Our Championship Course</li>
      <li style={{ marginBottom: "0.5rem" }}>🎯 Upcoming Tournaments</li>
    </ul>
  }
  reverse={false}
/>


      {/* ROW 2: Dine right, Card left */}
<AlignedRow
  title="Dine"

  cardText={
    <ul style={{ 
      textAlign: "left", 
      lineHeight: "1.8", 
      fontSize: "1rem", 
      paddingLeft: "1.2rem",
      listStyle: "none"
    }}>
      <li style={{ marginBottom: "0.5rem" }}>🍽️ Explore Our Menu</li>
      <li style={{ marginBottom: "0.5rem" }}>🎶 Live Music Nights</li>
      <li style={{ marginBottom: "0.5rem" }}>🥂 Private Dining Experience</li>
      <li style={{ marginBottom: "0.5rem" }}>🍷 Wine & Cocktail Specials</li>
    </ul>
  }
  reverse={true}
/>


      <Footer />

      {/* Animations */}
      <style>{`
        .slide-left, .slide-right {
          opacity: 0;
          transform: translateX(0);
          transition: all 0.8s ease-out;
        }
        .visible .slide-left {
          transform: translateX(-50px);
          opacity: 1;
        }
        .visible .slide-right {
          transform: translateX(50px);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

function AlignedRow({ title, cardTitle, cardText, reverse }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: "3rem 2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={ref}
        className={visible ? "row-container visible" : "row-container"}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "stretch",
          width: "90%",
          minHeight: "300px",
          borderRadius: "50px",
          boxShadow: "0 5px 30px rgba(0,0,0,0.15)",
          background: reverse
            ? "linear-gradient(to left, #dcdcdcff, #ffffff)"
            : "linear-gradient(to right, #f0f0f0ff, #ffffff)",
          overflow: "hidden",
        }}
      >
        {/* IMAGE SIDE */}
        <div
          className={reverse ? "slide-right" : "slide-left"}
          style={{
            order: reverse ? 2 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage:
              title === "Play"
                ? "url('/play.jpg')" // Play image
                : "url('/dine.jpg')", // For now same image for Dine
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            maskImage: reverse
              ? "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))"
              : "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))",
            WebkitMaskImage: reverse
              ? "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))"
              : "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              color: "white",
              textShadow: "0 0 10px rgba(255,255,255,0.9)",
              position: "relative",
              zIndex: 4,
            }}
          >
            {title}
          </h2>
        </div>

        {/* CARD SIDE */}
        <div
          className={reverse ? "slide-left" : "slide-right"}
          style={{
            order: reverse ? 1 : 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "20px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
              textAlign: "left",
              width: "400px",
              minHeight: "180px",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>{cardTitle}</h3>
            <p>{cardText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}



export default App;
