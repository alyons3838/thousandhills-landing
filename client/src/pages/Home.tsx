/**
 * Thousand Hills Resort — Landing Page
 * Design: Refined Ozarks Resort
 * Colors: Deep forest green #1a3a1f, brand red #b01c2e, antique gold #c9a227, cream #f5f0e8
 * Fonts: Playfair Display (headings) + Inter (body)
 * Layout: Full-screen hero → 3 destination cards → trust bar → golf strip → amenities → gallery → location → footer
 */

import { useEffect, useRef, useState } from "react";

// ─── CDN Asset URLs ─────────────────────────────────────────────
const ASSETS = {
  thLogo:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/th_logo_13ac096a.png",
  thvLogo:   "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/thv_logo_6ee1fc47.png",
  thrhLogo:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/thrh_logo_7f198c0e.webp",
  golfAerial:"https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/golf_aerial_36e92749.jpg",
  golfFairway:"https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/golf_fairway_3ee95d94.jpg",
  golfHole1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/golf_hole1_db32e4f8.jpg",
  hotelRoom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/hotel_room_2ece4dd1.jpg",
  vacationsCondo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/vacations_condo_3a98b294.jpg",
  vacationsExterior: "https://d2xsxph8kpxj0f.cloudfront.net/310519663189598571/TJ6wxP9kjUw93uEopfP9wv/vacations_exterior_37a9d826.jpg",
};

// ─── Intersection Observer Hook ─────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Navbar ─────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,25,12,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,162,39,0.2)" : "none",
        transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "72px",
      }}
    >
      {/* Brand */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
        <img src={ASSETS.thLogo} alt="Thousand Hills" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
        <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", lineHeight: 1.2 }}>
          <div style={{ fontSize: "17px", fontWeight: 700 }}>Thousand Hills</div>
          <div style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#c9a227", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Branson, Missouri</div>
        </div>
      </a>

      {/* Desktop Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
        <a href="#destinations" style={navLinkStyle}>Destinations</a>
        <a href="#golf" style={navLinkStyle}>Golf Course</a>
        <a href="#location" style={navLinkStyle}>Location</a>
        <a href="tel:4173344553" style={{ ...navLinkStyle, color: "#c9a227" }}>417-334-4553</a>
        <a
          href="https://www.thousandhillsvacations.com"
          target="_blank" rel="noopener noreferrer"
          style={{
            background: "#b01c2e", color: "#fff", padding: "10px 22px",
            borderRadius: "4px", fontFamily: "Inter, sans-serif", fontSize: "13px",
            fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#8a1522")}
          onMouseLeave={e => (e.currentTarget.style.background = "#b01c2e")}
        >Book Now</a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer" }}
        className="show-mobile"
        aria-label="Menu"
      >☰</button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "72px", left: 0, right: 0,
          background: "rgba(10,25,12,0.98)", padding: "24px 32px",
          display: "flex", flexDirection: "column", gap: "20px",
          borderTop: "1px solid rgba(201,162,39,0.2)",
        }}>
          {[["#destinations","Destinations"],["#golf","Golf Course"],["#location","Location"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif", fontSize: "15px", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a href="tel:4173344553" style={{ color: "#c9a227", fontFamily: "Inter, sans-serif", fontSize: "15px", textDecoration: "none" }}>417-334-4553</a>
        </div>
      )}
    </nav>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.85)", fontFamily: "Inter, sans-serif",
  fontSize: "14px", textDecoration: "none", letterSpacing: "0.02em",
  transition: "color 0.2s",
};

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: "relative", height: "100vh", minHeight: "600px",
      backgroundImage: `url(${ASSETS.golfAerial})`,
      backgroundSize: "cover", backgroundPosition: "center 30%",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(10,25,12,0.55) 0%, rgba(10,25,12,0.35) 40%, rgba(10,25,12,0.72) 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px", maxWidth: "820px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.4)",
          borderRadius: "100px", padding: "6px 18px", marginBottom: "28px",
          fontFamily: "Inter, sans-serif", fontSize: "12px", letterSpacing: "0.14em",
          color: "#e8c84a", textTransform: "uppercase",
          opacity: 0, animation: "fadeInUp 0.8s ease 0.2s forwards",
        }}>
          ★ Voted Best Golf Resort in Branson — Golf Digest 4-Star Rated
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", color: "#fff",
          fontSize: "clamp(42px, 7vw, 84px)", fontWeight: 900,
          lineHeight: 1.05, margin: "0 0 12px",
          opacity: 0, animation: "fadeInUp 0.8s ease 0.35s forwards",
        }}>
          Your Branson<br />
          <em style={{ color: "#c9a227", fontStyle: "italic" }}>Escape Starts Here</em>
        </h1>

        <p style={{
          fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.82)",
          fontSize: "clamp(15px, 2vw, 19px)", lineHeight: 1.65,
          margin: "0 auto 40px", maxWidth: "580px",
          opacity: 0, animation: "fadeInUp 0.8s ease 0.5s forwards",
        }}>
          Award-winning golf, premier vacation rentals, and a full-service resort hotel — all nestled in the heart of the Ozarks. Choose your perfect Branson experience.
        </p>

        <div style={{
          display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
          opacity: 0, animation: "fadeInUp 0.8s ease 0.65s forwards",
        }}>
          <a href="#destinations" style={heroBtnPrimary}>Explore Destinations</a>
          <a href="#golf" style={heroBtnOutline}>Golf Course Info</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif", fontSize: "11px",
        letterSpacing: "0.12em", textTransform: "uppercase",
        opacity: 0, animation: "fadeIn 1s ease 1.2s forwards",
      }}>
        <span style={{ animation: "scrollBounce 1.8s ease-in-out infinite" }}>↓</span>
        <span>Explore</span>
      </div>
    </section>
  );
}

const heroBtnPrimary: React.CSSProperties = {
  background: "#b01c2e", color: "#fff", padding: "15px 32px",
  borderRadius: "4px", fontFamily: "Inter, sans-serif", fontSize: "13px",
  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
  textDecoration: "none", transition: "background 0.2s",
};
const heroBtnOutline: React.CSSProperties = {
  background: "transparent", color: "#fff", padding: "15px 32px",
  borderRadius: "4px", border: "1px solid rgba(255,255,255,0.5)",
  fontFamily: "Inter, sans-serif", fontSize: "13px",
  fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
  textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
};

// ─── Destination Cards ───────────────────────────────────────────
const CARDS = [
  {
    logo: ASSETS.thvLogo,
    logoAlt: "Thousand Hills Vacations",
    img: ASSETS.vacationsCondo,
    title: "Vacation Rentals & Packages",
    desc: "Spacious condos, cabins, and vacation homes with full kitchens, private balconies, and stunning Ozark views. Perfect for families, groups, and extended stays.",
    tags: ["Condos & Cabins", "Full Kitchens", "Golf Discounts", "Lake Views"],
    cta: "Explore Vacation Rentals",
    href: "https://www.thousandhillsvacations.com",
    btnColor: "#b01c2e",
    btnHover: "#8a1522",
    exploreId: "vacations",
  },
  {
    logo: ASSETS.thrhLogo,
    logoAlt: "Thousand Hills Resort Hotel",
    img: ASSETS.hotelRoom,
    title: "Resort Hotel & Suites",
    desc: "Comfortable hotel rooms and suites with resort amenities, daily housekeeping, and direct access to the golf course. Ideal for couples and business travelers.",
    tags: ["Hotel Rooms", "Suites", "Pool Access", "Golf Packages"],
    cta: "View Hotel Rooms",
    href: "https://www.thousandhillsresorthotel.com",
    btnColor: "#1a3a1f",
    btnHover: "#0e2112",
    exploreId: "hotel",
  },
  {
    logo: ASSETS.thLogo,
    logoAlt: "Thousand Hills Golf Course",
    img: ASSETS.golfHole1,
    title: "18-Hole Championship Golf",
    desc: "Golf Digest 4-Star rated. 18 holes through hardwood forests and Ozark streams. Open to the public with four sets of tees for all skill levels. Book tee times up to 30 days in advance.",
    tags: ["4-Star Rated", "Public Course", "GPS Carts", "Pro Shop"],
    cta: "Book a Tee Time",
    href: "https://www.thousandhills.com/branson-golf/",
    btnColor: "#1a3a1f",
    btnHover: "#0e2112",
    exploreId: "golf",
  },
];

function DestinationCards() {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="destinations" style={{ background: "#f5f0e8", padding: "80px 0 100px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={sectionLabel}>Choose Your Experience</div>
          <div style={sectionDivider} />
          <h2 style={{ ...sectionTitle, color: "#1a3a1f" }}>Where Would You Like to Go?</h2>
          <p style={{ fontFamily: "Inter, sans-serif", color: "#555", fontSize: "17px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Three world-class experiences at one legendary Ozarks resort.
          </p>
        </div>

        <div ref={ref} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px",
        }}>
          {CARDS.map((card, i) => (
            <CardItem key={card.title} card={card} delay={i * 130} visible={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardItem({ card, delay, visible }: { card: typeof CARDS[0]; delay: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: hovered ? "0 28px 72px rgba(10,25,12,0.22), 0 0 0 1px rgba(201,162,39,0.15)" : "0 6px 28px rgba(10,25,12,0.1)",
        transform: visible ? (hovered ? "translateY(-10px) scale(1.01)" : "translateY(0) scale(1)") : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, box-shadow 0.35s ease`,
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
        <img src={card.img} alt={card.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.5s ease",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 60%, rgba(10,25,12,0.3) 100%)",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "16px", height: "52px", display: "flex", alignItems: "center" }}>
          <img src={card.logo} alt={card.logoAlt} style={{ maxHeight: "52px", maxWidth: "180px", objectFit: "contain", objectPosition: "left center" }} />
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1a3a1f", margin: "0 0 12px", lineHeight: 1.3 }}>
          {card.title}
        </h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#555", lineHeight: 1.7, margin: "0 0 20px", flex: 1 }}>
          {card.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {card.tags.map(tag => (
            <span key={tag} style={{
              border: "1px solid #ddd", borderRadius: "100px",
              padding: "4px 12px", fontFamily: "Inter, sans-serif",
              fontSize: "11px", color: "#555", letterSpacing: "0.04em",
            }}>{tag}</span>
          ))}
        </div>

        {/* Explore More button */}
        <button
          onClick={() => {
            const el = document.getElementById(card.exploreId);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{
            display: "block", width: "100%", textAlign: "center",
            background: "transparent", color: card.btnColor,
            padding: "12px 24px", borderRadius: "4px",
            border: `1.5px solid ${card.btnColor}`,
            fontFamily: "Inter, sans-serif", fontSize: "12px",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: "pointer", marginBottom: "10px",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = card.btnColor; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = card.btnColor; }}
        >
          Explore More ↓
        </button>

        {/* CTA */}
        <a
          href={card.href} target="_blank" rel="noopener noreferrer"
          style={{
            display: "block", textAlign: "center",
            background: card.btnColor, color: "#fff",
            padding: "14px 24px", borderRadius: "4px",
            fontFamily: "Inter, sans-serif", fontSize: "12px",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none", transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = card.btnHover)}
          onMouseLeave={e => (e.currentTarget.style.background = card.btnColor)}
        >
          {card.cta} →
        </a>
      </div>
    </div>
  );
}

// ─── Vacations Section ──────────────────────────────────────────
function VacationsSection() {
  const { ref, inView } = useInView(0.08);
  return (
    <section id="vacations" ref={ref} style={{
      background: "#1a0a0c",
      backgroundImage: `linear-gradient(rgba(176,28,46,0.82), rgba(100,10,20,0.92)), url(${ASSETS.vacationsExterior})`,
      backgroundSize: "cover", backgroundPosition: "center",
      backgroundAttachment: "fixed",
      padding: "100px 0",
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }} className="golf-grid">
          {/* Left */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <img src={ASSETS.thvLogo} alt="Thousand Hills Vacations" style={{ maxHeight: "56px", objectFit: "contain", marginBottom: "24px", filter: "brightness(0) invert(1)" }} />
            <div style={{ ...sectionLabelLight, color: "rgba(255,255,255,0.6)" }}>Vacation Rentals &amp; Packages</div>
            <div style={{ width: "40px", height: "2px", background: "#fff", margin: "0 0 24px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 24px" }}>
              Branson's Premier Vacation Rental Experience
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.75, marginBottom: "16px" }}>
              Thousand Hills Vacations offers fully-equipped condos, cabins, and vacation homes nestled in the Ozarks — steps from the golf course and minutes from Branson's top attractions. Whether you're traveling with family, a group, or just the two of you, we have the perfect space.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.75, marginBottom: "36px" }}>
              Every rental includes full kitchen access, private balconies or decks with Ozark views, and exclusive discounts on golf for guests staying on property. Nightly, weekly, and seasonal rates available.
            </p>

            {/* Highlights grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "36px" }}>
              {[
                ["🏠", "Condos & Cabins", "Fully furnished with full kitchens & living areas"],
                ["🌄", "Ozark Views", "Private balconies overlooking the hills & course"],
                ["⛳", "Golf Discounts", "Exclusive rates on tee times for all guests"],
                ["📍", "Prime Location", "Minutes from Table Rock Lake & the 76 Strip"],
              ].map(([icon, title, desc]) => (
                <div key={title as string} style={{
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px", padding: "18px 16px",
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="https://www.thousandhillsvacations.com" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnPrimary, background: "#fff", color: "#b01c2e" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0e8e8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
              >🏠 Browse All Rentals</a>
              <a href="https://www.thousandhillsvacations.com" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnOutline, borderColor: "rgba(255,255,255,0.4)" }}
              >View Rates &amp; Availability</a>
            </div>
          </div>

          {/* Right — image */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            <div style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)", position: "relative" }}>
              <img src={ASSETS.vacationsCondo} alt="Thousand Hills Vacation Condo" style={{ width: "100%", display: "block", objectFit: "cover", height: "420px" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(100,10,20,0.92))",
                padding: "32px 24px 24px",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  background: "rgba(176,28,46,0.5)", borderRadius: "6px",
                  padding: "14px 18px", border: "1px solid rgba(255,255,255,0.2)",
                }}>
                  <span style={{ fontSize: "20px" }}>📞</span>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px" }}>Ready to Book?</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>Visit thousandhillsvacations.com or call us today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Hotel Section ───────────────────────────────────────────────
function HotelSection() {
  const { ref, inView } = useInView(0.08);
  return (
    <section id="hotel" ref={ref} style={{
      background: "#0a1a2e",
      backgroundImage: `linear-gradient(rgba(10,26,46,0.88), rgba(10,26,46,0.93)), url(${ASSETS.hotelRoom})`,
      backgroundSize: "cover", backgroundPosition: "center",
      backgroundAttachment: "fixed",
      padding: "100px 0",
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }} className="golf-grid">
          {/* Left — image first on this one for visual variety */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            <div style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)", position: "relative" }}>
              <img src={ASSETS.hotelRoom} alt="Thousand Hills Resort Hotel Room" style={{ width: "100%", display: "block", objectFit: "cover", height: "420px" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(10,26,46,0.92))",
                padding: "32px 24px 24px",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  background: "rgba(10,26,46,0.7)", borderRadius: "6px",
                  padding: "14px 18px", border: "1px solid rgba(201,162,39,0.25)",
                }}>
                  <span style={{ fontSize: "20px" }}>⭐</span>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px" }}>Full-Service Resort Hotel</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>Daily housekeeping · Pool · Golf access included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <img src={ASSETS.thrhLogo} alt="Thousand Hills Resort Hotel" style={{ maxHeight: "72px", objectFit: "contain", marginBottom: "24px", filter: "brightness(0) invert(1)" }} />
            <div style={{ ...sectionLabelLight, color: "rgba(255,255,255,0.6)" }}>Resort Hotel &amp; Suites</div>
            <div style={{ width: "40px", height: "2px", background: "#c9a227", margin: "0 0 24px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 24px" }}>
              Hotel Comfort with a Resort Feel
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.75, marginBottom: "16px" }}>
              Thousand Hills Resort Hotel offers the convenience of a full-service hotel with the atmosphere of a private resort. Enjoy well-appointed rooms and suites, daily housekeeping, and direct access to the championship golf course — all in one place.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.75, marginBottom: "36px" }}>
              Ideal for couples, business travelers, and golf getaways. Our hotel guests receive preferred tee times and exclusive resort pricing on all Thousand Hills experiences.
            </p>

            {/* Highlights grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "36px" }}>
              {[
                ["🛏️", "Rooms & Suites", "Comfortable accommodations for every traveler"],
                ["🏊", "Pool Access", "Resort pool available to all hotel guests"],
                ["⛳", "Golf Packages", "Preferred tee times & discounted rates included"],
                ["🍽️", "On-Site Dining", "Mulligan's Grill open seasonally on property"],
              ].map(([icon, title, desc]) => (
                <div key={title as string} style={{
                  background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.2)",
                  borderRadius: "8px", padding: "18px 16px",
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "8px" }}>{icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="https://www.thousandhillsresorthotel.com" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnPrimary, background: "#c9a227", color: "#0a1a2e" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#b8911f")}
                onMouseLeave={e => (e.currentTarget.style.background = "#c9a227")}
              >🏨 Reserve a Room</a>
              <a href="https://www.thousandhillsresorthotel.com" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnOutline, borderColor: "rgba(255,255,255,0.35)" }}
              >View All Room Types</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar ───────────────────────────────────────────────────
function TrustBar() {
  const { ref, inView } = useInView(0.1);
  const stats = [
    { num: "4-Star", label: "Golf Digest Rating" },
    { num: "18", label: "Championship Holes" },
    { num: "30+", label: "Years in Branson" },
    { num: "#1", label: "Golf Resort — Springfield News-Leader" },
  ];
  return (
    <section ref={ref} style={{ background: "#1a3a1f", padding: "56px 0" }}>
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "24px", textAlign: "center",
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(201,162,39,0.2)",
              borderRadius: "8px",
              padding: "28px 20px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "42px", fontWeight: 700, color: "#c9a227", lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", marginTop: "10px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Golf Section ────────────────────────────────────────────────
function GolfSection() {
  const { ref, inView } = useInView(0.08);
  return (
    <section id="golf" ref={ref} style={{
      background: "#0e2112",
      backgroundImage: `linear-gradient(rgba(10,25,12,0.88), rgba(10,25,12,0.92)), url(${ASSETS.golfFairway})`,
      backgroundSize: "cover", backgroundPosition: "center",
      backgroundAttachment: "fixed",
      padding: "100px 0",
    }}>
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center",
        }} className="golf-grid">
          {/* Left */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <div style={sectionLabelLight}>Branson Golf Course</div>
            <div style={{ ...sectionDivider, background: "#c9a227" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 24px" }}>
              The Ozarks' Most Popular Golf Resort
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.75)", fontSize: "16px", lineHeight: 1.75, marginBottom: "16px" }}>
              This 18-hole public golf course was rated 4-Stars by Golf Digest magazine and voted Best of the Ozarks for Branson Golf Courses multiple times. From novice to professional, four separate sets of tees ensure the course remains challenging yet fair for all skill levels.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.75)", fontSize: "16px", lineHeight: 1.75, marginBottom: "36px" }}>
              As your golf journey takes you through beautiful hardwood forests, past unique rock formations, and over Ozark streams, you'd never guess you were within a long iron from the 76 Strip and Branson's world-famous live music shows.
            </p>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "36px" }}>
              {[
                ["Par 66", "18-Hole Layout"],
                ["4 Sets", "of Tees — All Skill Levels"],
                ["5 min", "From Lake Taneycomo"],
                ["Open", "to the Public Daily"],
              ].map(([num, label]) => (
                <div key={num} style={{
                  background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)",
                  borderRadius: "6px", padding: "16px 20px",
                }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#c9a227" }}>{num}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="https://www.thousandhills.com/branson-golf/" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnPrimary, background: "#c9a227", color: "#0e2112" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#b8911f")}
                onMouseLeave={e => (e.currentTarget.style.background = "#c9a227")}
              >📅 Book Tee Time Online</a>
              <a href="https://www.thousandhills.com/branson-golf/" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnOutline, borderColor: "rgba(255,255,255,0.35)" }}
              >View Course Details</a>
            </div>
          </div>

          {/* Right — image card */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            <div style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)", position: "relative" }}>
              <img src={ASSETS.golfHole1} alt="Thousand Hills Golf Course" style={{ width: "100%", display: "block", objectFit: "cover", height: "420px" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(10,25,12,0.9))",
                padding: "32px 24px 24px",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  background: "rgba(10,25,12,0.7)", borderRadius: "6px",
                  padding: "14px 18px", border: "1px solid rgba(201,162,39,0.2)",
                }}>
                  <span style={{ fontSize: "20px" }}>🕐</span>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px" }}>Pro Shop & Mulligan's Grill</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>Open April through October · Call 417-334-4553</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Amenities ───────────────────────────────────────────────────
const AMENITIES = [
  { icon: "⛳", title: "Golf Professional on Staff", desc: "Expert instruction and club fitting available at the pro shop year-round." },
  { icon: "🏠", title: "Vacation Rentals", desc: "Fully equipped condos and cabins with kitchens, living areas, and private balconies." },
  { icon: "🏨", title: "Resort Hotel Rooms", desc: "Comfortable hotel accommodations with resort amenities and daily housekeeping." },
  { icon: "📍", title: "Prime Ozarks Location", desc: "5 min from Lake Taneycomo, 10 min from Table Rock Lake, steps from the 76 Strip." },
  { icon: "🍽️", title: "Mulligan's Snack Bar & Grill", desc: "On-site dining open April through October with casual fare and great views." },
  { icon: "🛒", title: "Complete Pro Shop", desc: "Full selection of golf accessories, apparel, and equipment for every golfer." },
  { icon: "⭐", title: "Senior & Group Rates", desc: "Special pricing available for seniors, groups, and resort guests staying on property." },
  { icon: "📞", title: "Easy Reservations", desc: "Book tee times online up to 30 days in advance or call toll-free 877-262-0436." },
];

function Amenities() {
  const { ref, inView } = useInView(0.05);
  return (
    <section style={{ background: "#fff", padding: "100px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={sectionLabel}>Resort Amenities</div>
          <div style={sectionDivider} />
          <h2 style={{ ...sectionTitle, color: "#1a3a1f" }}>Everything You Need for the Perfect Stay</h2>
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {AMENITIES.map((a, i) => (
            <div key={a.title} style={{
              background: "#f5f0e8", borderRadius: "8px", padding: "28px 24px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
            }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "10px",
                background: "#1a3a1f", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "22px", marginBottom: "16px",
              }}>{a.icon}</div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: "#1a3a1f", margin: "0 0 8px" }}>{a.title}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Image Component ────────────────────────────────────
function GalleryImg({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: hovered ? "0 20px 56px rgba(10,25,12,0.22)" : "0 6px 24px rgba(10,25,12,0.1)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        cursor: "pointer",
        ...style,
      }}
    >
      <img
        src={src} alt={alt}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />
    </div>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────
function Gallery() {
  const { ref, inView } = useInView(0.05);
  return (
      <section ref={ref} style={{ background: "#f5f0e8", padding: "80px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={sectionLabel}>The Resort</div>
          <div style={sectionDivider} />
          <h2 style={{ ...sectionTitle, color: "#1a3a1f", fontSize: "clamp(28px, 3.5vw, 44px)" }}>A Glimpse of Thousand Hills</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "260px 260px",
          gap: "12px",
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease",
        }} className="gallery-grid">
          <GalleryImg src={ASSETS.vacationsExterior} alt="Resort exterior" style={{ gridRow: "1 / 3" }} />
          <GalleryImg src={ASSETS.golfHole1} alt="Golf hole" />
          <GalleryImg src={ASSETS.hotelRoom} alt="Hotel room" />
          <GalleryImg src={ASSETS.golfFairway} alt="Golf fairway" />
          <GalleryImg src={ASSETS.vacationsCondo} alt="Vacation condo" />
        </div>
      </div>
    </section>
  );
}

// ─── Location ────────────────────────────────────────────────────
function Location() {
  const { ref, inView } = useInView(0.08);
  return (
    <section id="location" ref={ref} style={{ background: "#f5f0e8", padding: "100px 0" }}>
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center",
        }} className="location-grid">
          {/* Map */}
          <div style={{
            borderRadius: "8px", overflow: "hidden", boxShadow: "0 16px 48px rgba(10,25,12,0.12)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.5!2d-93.2182!3d36.6437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf6c2b3a2a5555%3A0x1234567890abcdef!2s245+S+Wildwood+Dr%2C+Branson%2C+MO+65616!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%" height="360" style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Thousand Hills Location"
            />
          </div>

          {/* Info */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}>
            <div style={sectionLabel}>Find Us in Branson</div>
            <div style={sectionDivider} />
            <h2 style={{ ...sectionTitle, color: "#1a3a1f", fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              In the Heart of the Ozarks
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: "#555", fontSize: "16px", lineHeight: 1.75, marginBottom: "28px" }}>
              Located at 245 S Wildwood Drive in Branson, Missouri — minutes from the 76 Strip, Lake Taneycomo, and Table Rock Lake.
            </p>

            {[
              { icon: "📍", text: "245 S Wildwood Dr, Branson, MO 65616" },
              { icon: "📞", text: "Golf Pro Shop: 417-334-4553 (Toll Free)" },
              { icon: "🕐", text: "5 minutes from Lake Taneycomo · 10 min from Table Rock Lake" },
              { icon: "🗺️", text: "Walking distance to Branson's 76 Strip entertainment" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
                <span style={{ fontSize: "18px", marginTop: "2px" }}>{icon}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}

            <div style={{ display: "flex", gap: "16px", marginTop: "32px", flexWrap: "wrap" }}>
              <a href="https://www.thousandhillsvacations.com" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnPrimary, background: "#b01c2e" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8a1522")}
                onMouseLeave={e => (e.currentTarget.style.background = "#b01c2e")}
              >📅 Book Vacation Rental</a>
              <a href="https://www.thousandhillsresorthotel.com" target="_blank" rel="noopener noreferrer"
                style={{ ...heroBtnPrimary, background: "#1a3a1f" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#0e2112")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1a3a1f")}
              >🏨 Reserve Hotel Room</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0e2112", color: "rgba(255,255,255,0.7)", padding: "64px 0 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "48px" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <img src={ASSETS.thLogo} alt="Thousand Hills" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", lineHeight: 1.2 }}>
                <div style={{ fontSize: "16px", fontWeight: 700 }}>Thousand Hills</div>
                <div style={{ fontSize: "10px", letterSpacing: "0.16em", color: "#c9a227", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>Branson, Missouri</div>
              </div>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.75, maxWidth: "280px" }}>
              Three world-class experiences in one legendary Ozarks resort. Award-winning golf, premium vacation rentals, and a full-service hotel — all in the heart of Branson, Missouri.
            </p>
          </div>

          {/* Our Properties */}
          <div>
            <div style={footerHeading}>Our Properties</div>
            {[
              ["https://www.thousandhillsvacations.com", "Thousand Hills Vacations"],
              ["https://www.thousandhillsresorthotel.com", "Thousand Hills Resort Hotel"],
              ["https://www.thousandhills.com/branson-golf/", "Branson Golf Course"],
            ].map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={footerLink}>{label}</a>
            ))}
          </div>

          {/* Golf Course */}
          <div>
            <div style={footerHeading}>Golf Course</div>
            {[
              ["https://www.thousandhills.com/branson-golf/", "Book Tee Time"],
              ["https://www.thousandhills.com/branson-golf/", "Rates & Fees"],
              ["https://www.thousandhills.com/branson-golf/", "Specials & Coupons"],
              ["https://www.thousandhills.com/branson-golf/", "Group Outings"],
              ["https://www.thousandhills.com/branson-golf/", "Senior Rates"],
              ["https://www.thousandhills.com/branson-golf/", "Course Layout"],
            ].map(([href, label]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={footerLink}>{label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={footerHeading}>Contact</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.8 }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <span>📍</span>
                <span>245 S Wildwood Dr<br />Branson, MO 65616</span>
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <span>📞</span>
                <a href="tel:4173344553" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Golf Pro Shop:<br />417-334-4553</a>
              </div>
            </div>
            {/* Social */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {[
                { href: "https://www.facebook.com/thousandhillsresort", label: "f" },
                { href: "https://www.instagram.com/thousandhillsresort", label: "ig" },
                { href: "https://www.youtube.com/@thousandhillsresort", label: "yt" },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif",
                    fontSize: "11px", fontWeight: 600, textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "12px",
        }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
            © {new Date().getFullYear()} Thousand Hills Resort · Branson, Missouri · All Rights Reserved
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
            thousandhills.com
          </span>
        </div>
      </div>
    </footer>
  );
}

const footerHeading: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600,
  letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a227",
  marginBottom: "16px",
};
const footerLink: React.CSSProperties = {
  display: "block", fontFamily: "Inter, sans-serif", fontSize: "14px",
  color: "rgba(255,255,255,0.65)", textDecoration: "none",
  marginBottom: "10px", transition: "color 0.2s",
};

// ─── Shared style tokens ─────────────────────────────────────────
const sectionLabel: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600,
  letterSpacing: "0.18em", textTransform: "uppercase", color: "#c9a227",
  marginBottom: "12px",
};
const sectionLabelLight: React.CSSProperties = { ...sectionLabel, color: "#c9a227" };
const sectionDivider: React.CSSProperties = {
  width: "40px", height: "2px", background: "#c9a227", margin: "0 auto 24px",
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(32px, 4vw, 52px)",
  fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px",
};

// ─── Responsive CSS ──────────────────────────────────────────────
const ResponsiveStyles = () => (
  <style>{`
    @media (max-width: 900px) {
      .golf-grid, .vacations-grid, .hotel-grid { grid-template-columns: 1fr !important; }
      .golf-grid { grid-template-columns: 1fr !important; }
      .location-grid { grid-template-columns: 1fr !important; }
      .footer-grid { grid-template-columns: 1fr 1fr !important; }
      .gallery-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
      .gallery-grid > div:first-child { grid-row: auto !important; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr !important; }
      .hidden-mobile { display: none !important; }
      .show-mobile { display: block !important; }
    }
    @media (min-width: 601px) {
      .show-mobile { display: none !important; }
    }
  `}</style>
);

// ─── Page ────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <ResponsiveStyles />
      <Navbar />
      <Hero />
      <DestinationCards />
      <VacationsSection />
      <HotelSection />
      <TrustBar />
      <GolfSection />
      <Amenities />
      <Gallery />
      <Location />
      <Footer />
    </>
  );
}
