---
name: Yolly Beach Resort
description: A coastal guestbook using warm paper, palm green and real resort photographs.
colors:
  sand: "#f7f4ed"
  white: "#fffdf8"
  green: "#173e35"
  green-dark: "#102e27"
  ink: "#253b33"
  muted: "#62685f"
  line: "#dcded2"
  sage: "#e9ede3"
  focus: "#9e6d35"
typography:
  display:
    fontFamily: "Gelasio, Georgia, serif"
    fontSize: "clamp(56px,6.2vw,88px)"
    fontWeight: 400
    lineHeight: 1.07
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Gelasio, Georgia, serif"
    fontSize: "clamp(36px,4vw,55px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-.025em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  button:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 550
    lineHeight: 1.5
rounded:
  photo: "12px"
  control: "5px"
  filter: "30px"
spacing:
  gutter: "clamp(24px,5vw,80px)"
  section: "105px"
  section-tablet: "75px"
  section-phone: "62px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.sand}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.green-dark}"
  button-cream:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.green}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  filter-active:
    backgroundColor: "{colors.green}"
    textColor: "{colors.sand}"
    rounded: "{rounded.filter}"
    padding: "9px 18px"
---

# Design System: Yolly Beach Resort

## Overview

**Creative North Star: "Coastal guestbook"**

Warm paper, deep palm green, editorial serif headings and real property photography establish a relaxed, welcoming resort identity. The user delegated the design and authorized replacing the former cyan page. Comfortable spacing gives photographs room while rates, capacities and enquiry controls remain easy to scan.

**Key Characteristics:**

- Actual property photographs carry the identity.
- Gentle corners and thin borders organize a mostly flat page.
- Expressive serif headings pair with clear sans-serif information.

This document describes the implemented CSS. Mobbin research was refused because a paid plan was required. The Impeccable context/concept launcher was unavailable because its engine was not installed and its cache was not writable. This was a code-led implementation; no generated concept image or screenshot is claimed as evidence.

## Colors

Palm greens and warm paper form the core palette; pale sage separates accommodation content.

### Primary

- **Palm green (`green`):** primary actions, active filters, cottage and enquiry backgrounds.
- **Deep palm (`green-dark`):** primary button hover.

### Neutral

- **Sand (`sand`):** page background and reversed text on green.
- **Warm paper (`white`):** hero text over photography.
- **Forest ink (`ink`):** main text on light surfaces.
- **Quiet olive (`muted`):** descriptions, supporting prices and notes.
- **Soft seam (`line`):** dividers and light-surface borders.
- **Pale sage (`sage`):** accommodation section background.
- **Warm ochre (`focus`):** keyboard focus outline.

**The Photo First Rule.** Keep visual emphasis on the real property and useful information; use the restrained palette around the photographs.

## Typography

**Display:** Gelasio with Georgia and serif fallbacks. **Body and controls:** DM Sans with Arial and sans-serif fallbacks. Headings are regular weight, with balanced wrapping and occasional italic emphasis. The normative base styles are in the frontmatter.

The phone hero uses a smaller fluid size (`clamp(49px,12.7vw,68px)`) and more open line height (1.1). Section headings have phone overrides around 36–40px. Descriptions commonly use 14–15px; paragraphs have a maximum measure (66ch). Room features use readable small text (12px), including on phones. Price numerals use tabular figures where comparisons benefit. Phone inputs use a readable size (16px).

## Layout

The centered content container has a maximum width (1240px), with twice the fluid gutter subtracted from the viewport. Large photographic panels use narrow exterior margins. Section spacing follows the frontmatter.

Desktop rooms use two equal columns. Story, FAQ, location and enquiry areas use paired columns with varied image/copy proportions. At 800px navigation becomes a menu, cottages stack, gutters become 30px and sections tighten. At 560px gutters become 24px, rooms and most paired layouts stack, and the fixed booking bar includes the bottom safe area. A 360px adjustment preserves title/price fit. At 1100px desktop gaps tighten; a 1600px rule aligns hero copy on wide screens.

## Elevation & Depth

The page is mostly flat. Tonal section changes, thin rules and photography create separation. Shadows are reserved for the open mobile menu, fixed phone booking bar and phone gallery arrows; exact values live in the sidecar. The gallery uses a dark backdrop. Dark green photographic overlays support legibility.

## Shapes

Photos and the gallery use gentle `photo` corners; small controls use the tighter `control` radius. Phone hero and beach panels reduce the radius (10px). Filter pills use the `filter` radius, and gallery arrows are circular. Room information sits directly beneath its photograph on the section background.

## Components

### Buttons and links

Primary buttons use palm fill, sand text and a darker hover. Cream buttons reverse that relationship; their hover fill is pale olive (`#e4e8d8`). Primary controls have a minimum height (50px); header actions use 46px. Text links carry a fine underline border and arrow. Interactive elements receive an offset focus outline (3px, 5px offset).

### Accommodation and filters

Large photographs lead into serif room titles, prices and compact feature rows. A sand photo-count badge sits on the image. Active filter pills use palm fill and sand text; inactive pills are outlined. Hover-capable devices gently enlarge room photos (1.025 scale over .45s).

### Enquiry fields

Fields sit on the green section with a lighter green fill (`#244c40`), subdued border (`#6c8174`), control radius, generous minimum height (49px), explicit labels and shared focus outline. Prepared messages remain a user-controlled handoff.

### Navigation, FAQ and gallery

Desktop navigation is a quiet text row. The compact menu button changes to a cross when expanded; its menu opens beneath the header. Native FAQ rows use thin dividers and a plus that rotates when open. The photo dialog includes previous/next controls and a caption/count row; phone arrows overlay the image. Preserve keyboard navigation, restored focus and disabled arrow states.

Hero copy arrives with upward movement and blur settling (.8s); button colors transition over .2s. Reduced-motion preferences disable animation, transitions and smooth scrolling.

## Do's and Don'ts

- **Do** reuse the extracted palette, serif/sans pairing and corner language.
- **Do** preserve actual property photographs, visible focus, readable phone inputs and safe-area spacing.
- **Do** keep room prices and capacities legible when layouts collapse.
- **Don't** fabricate reviews, amenities or availability to fill a layout.
- **Don't** add raised containers around every content group; retain the flat sections and photographic hierarchy.
- **Don't** claim unavailable research or generated visual concepts as completed evidence.
