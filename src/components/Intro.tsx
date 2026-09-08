"use client";

import { useEffect, useState } from "react";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setClosing(true);
      window.setTimeout(() => setVisible(false), 850);
    }, 3200);

    return () => window.clearTimeout(closeTimer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro-screen ${closing ? "intro-closing" : ""}`}>
      <div className="intro-top">
        <span>ABYANNZ.</span>
        <span>PORTFOLIO / 2026</span>
      </div>

      <div className="intro-center">
        <div className="intro-index">
          <span>01</span><i></i><span>04</span>
        </div>

        <div className="intro-name-wrap">
          <h1>ABYANNZ<span>.</span></h1>
        </div>

        <p className="intro-full-name">
          - PORTFOLIO OF MUHAMMAD ABYAN SUDJATMIKO -
        </p>

        <div className="intro-role">
          <span></span>WEB DEVELOPER<span></span>
        </div>
      </div>

      <div className="intro-bottom">
        <span>REKAYASA PERANGKAT LUNAK</span>
        <span>PASURUAN, ID <b>↗</b></span>
      </div>

      <div className="intro-corner intro-corner-left"></div>
      <div className="intro-corner intro-corner-right"></div>
    </div>
  );
}
