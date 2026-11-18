# Verification

Verified the landing page in the in-app Chromium browser at desktop 1440×1000 and phone widths 390×844 and 320×740. These are responsive browser checks, not physical-device tests. Captures are in `.impeccable/review/`.

- Room filtering hides and restores the correct accommodation cards.
- Photo dialog opens, advances with the keyboard and closes with Escape.
- Mobile menu opens and closes when choosing a destination.
- Room and cottage enquiry actions select the right accommodation.
- Room 3 enquiry includes the confirmed ₱4,000 rate; a group of 11 prompts an extra-capacity note.
- Day cottage enquiry includes ₱400, the chosen date and guest count. Copy button successfully copies the prepared message. No message was sent.
- Mobile form inputs render at 16px. No horizontal overflow was found at 390px or 320px.
- All page anchor targets and 29 local asset references exist. No console errors or warnings were captured.
- `node --check app.js`, `node --check preview.cjs` and `git diff --check` pass.
- A fresh finish review requested larger mobile room metadata. Raised it to 12px and recaptured the same viewports; the reviewer scored this fix resolved with no visible regressions.

Mobbin research was attempted but its service required a paid plan. No Mobbin reference or result is claimed. The Impeccable engine could not run; source inspection and a fresh screenshot review were used. Instant availability, booking confirmation and payments are outside this static page; the visitor sends an enquiry for confirmation.
