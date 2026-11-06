---
name: Jayvee Embog — The Engineer's Terminal
description: A precise, technical portfolio with restrained green-on-black terminal character.
colors:
  terminal-green: "#61cf5a"
  terminal-green-hover: "#8be784"
  near-black: "#0b0d0b"
  panel: "#0f120e"
  raised-panel: "#10140f"
  foreground: "#e8ece5"
  secondary-text: "#92998e"
  muted-text: "#7e877b"
  moss: "#50864c"
  border: "#3b4b33"
typography:
  display:
    fontFamily: "Space Mono, monospace"
    fontSize: "clamp(4rem,7.5vw,7rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.09em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "18px"
    fontWeight: 500
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "13px"
    lineHeight: "28px"
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "9px"
    letterSpacing: "0.14em"
rounded:
  square: "0px"
  indicator: "9999px"
spacing:
  tag-x: "8px"
  control-y: "14px"
  panel: "20px"
  gutter: "24px"
  section: "64px"
  section-desktop: "80px"
components:
  button-primary:
    backgroundColor: "{colors.terminal-green}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.square}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "{colors.terminal-green-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.square}"
    padding: "14px 20px"
  project-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.square}"
  tag:
    backgroundColor: "transparent"
    rounded: "{rounded.square}"
    padding: "4px 8px"
---

# Design System: Jayvee Embog

## Overview

**Creative North Star: "The Engineer's Terminal"**

Precise, technical, restrained, and quietly playful. The portfolio pairs a near-black workspace with green signals, command-line language, and a generated ASCII sculpture. Large naming typography provides personality while the surrounding interface remains utilitarian.

This record captures the incumbent implementation rather than proposing a redesign. Flat, bordered surfaces and crisp square-edged controls are confirmed preferences. Fonts are currently loaded through Google Fonts; the global stylesheet imports Tailwind and most visual values live directly in component utilities.

**Key Characteristics:**
- Green-on-black terminal character.
- Space Grotesk for prose paired with Space Mono for terminal expression and controls.
- Flat, square-edged surfaces separated by fine borders.
- Quiet playfulness through ASCII artwork and command-line details.

## Colors

Terminal Green carries emphasis against Near-Black, with Moss and green-tinted neutrals supporting secondary detail. The frontmatter records the reused palette, not every illustration-specific shade or alpha variant.

### Primary
- **Terminal Green:** primary actions, name emphasis, status dots, focus outlines, ASCII artwork, and selected decorative marks.
- **Terminal Green Hover:** brighter primary-control hover state.

### Neutral
- **Near-Black:** document background and dark text on primary controls.
- **Panel / Raised Panel:** subtle tonal separation for project cards and floating terminal annotations.
- **Foreground:** primary text.
- **Secondary Text:** descriptive paragraphs.
- **Muted Text:** small captions and supporting metadata.
- **Moss:** subdued terminal marks and illustration detail; it is not the primary action color.
- **Border:** green-tinted strokes, often used with reduced opacity. Section separators also use white at 10% opacity.

**The Signal Rule.** Use Terminal Green to carry an action, emphasis, or terminal signal; preserve quieter supporting tones around it.

## Typography

**Display Font:** Space Mono, monospace fallback.
**Body Font:** Space Grotesk, sans-serif fallback.
**Label/Mono Font:** Space Mono, monospace fallback.

The pairing contrasts a tightly tracked, terminal-like name with more readable geometric prose. The current display includes clipped duplicate-letter fragments and a pulsing underscore. Font weights loaded are 400/700 for Space Mono and 400/500/600/700 for Space Grotesk.

### Hierarchy
- **Display:** fluid hero name using the frontmatter display role; its extreme tracking is an incumbent exception, not a default for new headings.
- **Headline:** section headings step from 20px to 28px at the small breakpoint.
- **Title:** project names and supporting role headings; hero role text increases to 22px at the small breakpoint.
- **Body:** hero description uses the body role with a 420px maximum width. Card descriptions use 12px text with 24px leading.
- **Label:** compact monospaced metadata; existing sizes range from 7px to 11px depending on context. These small sizes are documented observations, not an accessibility endorsement.
- **Controls:** monospaced 12px text for main actions; secondary compact controls may be smaller.

## Layout

The main content container is centered with a maximum width of 1312px, 24px horizontal gutters, and 64px gutters at the large breakpoint. The header has a separate 1440px maximum width and a height of 96px.

The hero stacks on small screens and becomes a two-column 1.1:1 composition at the large breakpoint, with text beside framed ASCII artwork. Project cards form three columns at the medium breakpoint and a single column below it. Common section padding is 64px vertically, increasing to 80px on large screens. Section headings typically leave 48px below them.

Tailwind's default responsive thresholds apply: small at 640px, medium at 768px, and large at 1024px. Mobile navigation opens as a full-width panel below the header; desktop navigation is inline from medium sizes.

## Elevation & Depth

Mostly flat, bordered surfaces. Depth comes from dark tonal separation and thin strokes, not a general raised-card system. Subtle green glows are reserved for status indicators and ASCII artwork. A small number of floating illustration panels use Tailwind's large shadow; project cards themselves remain flat.

**The Flat Surface Rule.** Keep ordinary controls and content cards flat; preserve glow as terminal atmosphere rather than a universal elevation effect.

## Shapes

Crisp, square-edged, utilitarian buttons, panels, tags, and identity marks. Fine 1px borders are the recurring container language. Circles belong to status dots and illustration elements, not the default shape of controls. Project illustrations may rotate inside their clipped frames without rotating the actual content card.

## Components

### Buttons

Square and direct. Primary links use Terminal Green with Near-Black text, a 1px accent border, and 14px by 20px padding. Secondary actions are transparent with a green-tinted border. Hover brightens a primary background or shifts a secondary border/text to green. Keyboard focus uses a 2px Terminal Green outline with a 4px offset.

### Chips

Small, informational, square outlined tags. Project tags use 4px by 8px padding, 8px mono text, muted green text, and a translucent border. They are not filter buttons.

### Cards / Containers

Project cards use Panel, a fine green-tinted border, a framed illustration above the content, and 20px content padding. Hover strengthens the border to Moss and slightly enlarges the illustration over 500ms. Project details can expand through the existing control; preserve this behavior during visual iteration.

### Navigation

A square monogram precedes the wordmark. Navigation uses compact monospaced lowercase links with green numbered prefixes. Hover shifts link text to Terminal Green. The mobile menu button exposes its expanded state and closes the panel when a destination is selected.

### Terminal Artwork

The generated ASCII sculpture sits within a bordered frame with status and render metadata. Its green text glow and radial dark-green background are illustration treatments, not defaults for all panels. Keep artwork distinct from factual capability or performance claims.

### Contact

A bordered dark-green panel contains a primary email link, copy button, and public GitHub/location details. Copy success and failure are announced in a status region. The phone number must remain absent, as required by PRODUCT.md.

### Global Interaction

Selection uses the accent with dark text. Links and buttons have visible keyboard outlines. Smooth scrolling and pulsing underscores respect reduced-motion preferences through existing utilities. Other color transitions use Tailwind defaults; the project currently has no bespoke global motion-token system.

## Do's and Don'ts

### Do:
- **Do** preserve the confirmed terminal character and the existing font pairing.
- **Do** use fine borders and tonal separation for ordinary containers.
- **Do** preserve navigation, expandable details, email copying, and keyboard focus when creating variants.
- **Do** test small metadata for readability rather than propagating its current small sizes unquestioningly.

### Don't:
- **Don't** round ordinary buttons or cards into soft, tactile surfaces.
- **Don't** spread green glows across every component.
- **Don't** treat illustration labels or mock telemetry as verified product evidence.
- **Don't** change factual text or expose the phone number during visual experiments.
