#!/usr/bin/env python3
"""Build og-image.svg (redesigned) with embedded profile.png, then convert to PNG."""
import base64
import os
import subprocess
import sys
import ctypes.util

PROJECT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROFILE = os.path.join(PROJECT, "public", "profile.png")
OUTPUT_SVG = os.path.join(PROJECT, "public", "og-image.svg")
OUTPUT_PNG = os.path.join(PROJECT, "public", "og-image.png")

# ── Read & encode profile image ──
with open(PROFILE, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("ascii")

DATA_URI = f"data:image/png;base64,{b64}"

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0e1a"/>
      <stop offset="40%" stop-color="#0d1224"/>
      <stop offset="100%" stop-color="#06081a"/>
    </linearGradient>
    <linearGradient id="teal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16f2b3"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <linearGradient id="pink" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="topBar" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#16f2b3"/>
    </linearGradient>
    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16f2b3"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="separatorGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#16f2b3"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1a1f3a" stroke-width="0.3" opacity="0.3"/>
    </pattern>
    <filter id="glow">
      <feGaussianBlur stdDeviation="40" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="12" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="profileClip">
      <circle cx="260" cy="315" r="115"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Ambient glow orbs -->
  <circle cx="260" cy="315" r="220" fill="#8b5cf6" opacity="0.06" filter="url(#glow)"/>
  <circle cx="900" cy="200" r="300" fill="#16f2b3" opacity="0.03" filter="url(#glow)"/>
  <circle cx="1100" cy="500" r="200" fill="#ec4899" opacity="0.03" filter="url(#glow)"/>

  <!-- Floating particles -->
  <circle cx="150" cy="100" r="2" fill="#16f2b3" opacity="0.4"/>
  <circle cx="400" cy="80" r="1.5" fill="#ec4899" opacity="0.3"/>
  <circle cx="700" cy="120" r="2.5" fill="#8b5cf6" opacity="0.3"/>
  <circle cx="950" cy="90" r="1.5" fill="#16f2b3" opacity="0.4"/>
  <circle cx="1100" cy="150" r="2" fill="#ec4899" opacity="0.3"/>
  <circle cx="180" cy="530" r="2" fill="#8b5cf6" opacity="0.3"/>
  <circle cx="500" cy="560" r="1.5" fill="#16f2b3" opacity="0.3"/>
  <circle cx="800" cy="540" r="2" fill="#ec4899" opacity="0.25"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#topBar)"/>

  <!-- Profile image -->
  <circle cx="260" cy="315" r="128" fill="none" stroke="url(#ringGrad)" stroke-width="2" opacity="0.25" stroke-dasharray="5 5"/>
  <circle cx="260" cy="315" r="118" fill="#0d1224" stroke="#1a1f3a" stroke-width="1"/>
  <image href="{DATA_URI}" x="145" y="200" width="230" height="230"
         clip-path="url(#profileClip)" preserveAspectRatio="xMidYMid slice"/>
  <circle cx="260" cy="315" r="116" fill="none" stroke="url(#ringGrad)" stroke-width="3" opacity="0.9"/>
  <circle cx="260" cy="315" r="135" fill="none" stroke="#1a1f3a" stroke-width="0.5" stroke-dasharray="3 8" opacity="0.5"/>

  <!-- Name -->
  <text x="470" y="220" font-family="system-ui, -apple-system, sans-serif"
        font-size="62" font-weight="800" fill="white" letter-spacing="-1">Manh Hung</text>
  <rect x="470" y="242" width="160" height="4" rx="2" fill="url(#separatorGrad)"/>

  <!-- Role -->
  <text x="470" y="300" font-family="system-ui, -apple-system, sans-serif"
        font-size="30" fill="#c8cee0" letter-spacing="0.5" font-weight="300">Product Builder &amp; Mobile Engineer</text>

  <!-- Skill tags -->
  <g transform="translate(470, 330)">
    <rect x="0" y="0" width="80" height="30" rx="15" fill="#1a1443" stroke="#2a2e5a" stroke-width="0.8"/>
    <text x="40" y="20" font-family="system-ui, sans-serif" font-size="13" fill="#16f2b3" text-anchor="middle" font-weight="500">Flutter</text>
    <rect x="92" y="0" width="80" height="30" rx="15" fill="#1a1443" stroke="#2a2e5a" stroke-width="0.8"/>
    <text x="132" y="20" font-family="system-ui, sans-serif" font-size="13" fill="#ec4899" text-anchor="middle" font-weight="500">Next.js</text>
    <rect x="184" y="0" width="80" height="30" rx="15" fill="#1a1443" stroke="#2a2e5a" stroke-width="0.8"/>
    <text x="224" y="20" font-family="system-ui, sans-serif" font-size="13" fill="#0ea5e9" text-anchor="middle" font-weight="500">Docker</text>
    <rect x="276" y="0" width="72" height="30" rx="15" fill="#1a1443" stroke="#2a2e5a" stroke-width="0.8"/>
    <text x="312" y="20" font-family="system-ui, sans-serif" font-size="13" fill="#8b5cf6" text-anchor="middle" font-weight="500">UI/UX</text>
  </g>

  <!-- Description -->
  <text x="470" y="410" font-family="system-ui, sans-serif" font-size="17" fill="#8892b0">Founder @ MonStudio. Building high-performance</text>
  <text x="470" y="435" font-family="system-ui, sans-serif" font-size="17" fill="#8892b0">Mobile &amp; Web solutions from Idea to App Store.</text>

  <!-- Stats -->
  <g transform="translate(470, 468)">
    <text x="0" y="0" font-family="system-ui, sans-serif" font-size="28" fill="white" font-weight="700">5+</text>
    <text x="0" y="20" font-family="system-ui, sans-serif" font-size="11" fill="#8892b0" letter-spacing="1">APPS SHIPPED</text>
    <rect x="100" y="-12" width="1" height="36" fill="#2a2e5a"/>
    <text x="120" y="0" font-family="system-ui, sans-serif" font-size="28" fill="white" font-weight="700">3+</text>
    <text x="120" y="20" font-family="system-ui, sans-serif" font-size="11" fill="#8892b0" letter-spacing="1">YEARS EXP</text>
    <rect x="220" y="-12" width="1" height="36" fill="#2a2e5a"/>
    <text x="240" y="0" font-family="system-ui, sans-serif" font-size="28" fill="white" font-weight="700">100%</text>
    <text x="240" y="20" font-family="system-ui, sans-serif" font-size="11" fill="#8892b0" letter-spacing="1">SELF-HOSTED</text>
  </g>

  <!-- Bottom -->
  <rect x="0" y="600" width="1200" height="1" fill="#1a1f3a" opacity="0.5"/>
  <text x="60" y="590" font-family="monospace" font-size="16" fill="#4a5578">monstudio.app</text>
  <text x="1140" y="588" font-family="system-ui, sans-serif" font-size="26" fill="#16f2b3"
        font-weight="700" text-anchor="end" filter="url(#softGlow)" opacity="0.9">MonStudio</text>
  <rect x="0" y="626" width="1200" height="4" fill="url(#topBar)" opacity="0.3"/>
</svg>"""

# ── Write SVG ──
with open(OUTPUT_SVG, "w") as f:
    f.write(svg)
print(f"[1/2] SVG saved: {len(svg):,} bytes -> {OUTPUT_SVG}")

# ── Convert to PNG ──
converted = False

# Method 1: cairosvg (needs native cairo lib)
try:
    # Help cairocffi find Homebrew's cairo on macOS
    cairo_path = ctypes.util.find_library("cairo")
    if not cairo_path:
        for brew_lib in ["/opt/homebrew/lib", "/usr/local/lib"]:
            if os.path.exists(os.path.join(brew_lib, "libcairo.dylib")):
                os.environ["DYLD_LIBRARY_PATH"] = brew_lib
                break
    import cairosvg

    cairosvg.svg2png(bytestring=svg.encode("utf-8"), write_to=OUTPUT_PNG, output_width=1200, output_height=630)
    converted = True
    print(f"[2/2] PNG saved (cairosvg): {os.path.getsize(OUTPUT_PNG):,} bytes -> {OUTPUT_PNG}")
except (ImportError, OSError) as e:
    print(f"  cairosvg skipped: {e}")

# Method 2: rsvg-convert (brew install librsvg)
if not converted:
    try:
        subprocess.run(["rsvg-convert", "-w", "1200", "-h", "630", "-o", OUTPUT_PNG, OUTPUT_SVG], check=True, capture_output=True)
        converted = True
        print(f"[2/2] PNG saved (rsvg-convert): {os.path.getsize(OUTPUT_PNG):,} bytes -> {OUTPUT_PNG}")
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("  rsvg-convert not found, installing librsvg...")

# Method 3: Install librsvg via brew and retry
if not converted:
    try:
        subprocess.run(["brew", "install", "librsvg"], check=True, capture_output=True)
        subprocess.run(["rsvg-convert", "-w", "1200", "-h", "630", "-o", OUTPUT_PNG, OUTPUT_SVG], check=True, capture_output=True)
        converted = True
        print(f"[2/2] PNG saved (rsvg-convert after install): {os.path.getsize(OUTPUT_PNG):,} bytes -> {OUTPUT_PNG}")
    except (FileNotFoundError, subprocess.CalledProcessError) as e:
        print(f"  librsvg failed: {e}")

if not converted:
    print("\n[ERROR] Could not convert to PNG. Try: brew install librsvg")
    sys.exit(1)

print("\nDone!")
