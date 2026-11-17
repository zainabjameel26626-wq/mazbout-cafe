# mazbout-cafe
Responsive café landing page with an interactive roast slider and booking ticket
# Mazbout Coffee: Café Landing Page

A responsive landing page for a specialty café, built with HTML, CSS, JavaScript and Bootstrap 5.

## Features

- Roast slider in the hero: moving it changes the page colours, the cup, and the tasting notes
- Menu with four categories (24 items), generated from a JavaScript object
- "Our story" section: story text, timeline, and three brand values
- "From bean to cup" process steps, customer reviews, and a FAQ accordion
- Table booking form with validation
- After booking, a ticket image (PNG) is generated that the visitor can download or save to their phone
- Responsive layout, keyboard focus styles, and reduced-motion support

## Project structure

```
mazbout-cafe/
├── index.html      Page structure and content
├── css/style.css   All custom styles
├── js/main.js      Menu, roast slider, booking and ticket
└── README.md
```

## How to run

1. Unzip the folder.
2. Open `index.html` in your browser. No installation or build step is needed.
3. An internet connection is required to load Bootstrap and the Google Fonts from their CDNs.

## How to customise

| What | Where |
|------|-------|
| Café name, address, phone, social handle | `index.html` (search for "Mazbout") and the ticket text in `js/main.js` |
| Menu items and prices | `menu` object at the top of `js/main.js` |
| Story, timeline, reviews, FAQ | `index.html` (the text is placeholder content, replace it with the real café's) |
| Colours | CSS variables at the top of `css/style.css` |
| Roast colours and tasting notes | `stops` and `roasts` in `js/main.js` |

## How the booking ticket works

When the form is valid, `drawTicket()` in `js/main.js` draws the booking details on an HTML `<canvas>`, converts it to a PNG with `toDataURL()`, and shows it in a Bootstrap modal. The visitor can press "Download ticket" or press and hold the image on a phone to save it.

The booking is not stored anywhere yet. To make it a real system, send the data to a backend (for example an ASP.NET Core Web API saving to SQL Server) with `fetch()` before showing the ticket.

## Deploy for free

Upload the folder to GitHub, then enable GitHub Pages in the repository settings. Netlify and Vercel also work by dragging the folder in.

## Notes

All names, reviews, prices and contact details are placeholder content for portfolio use.
