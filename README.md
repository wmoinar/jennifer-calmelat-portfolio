# Jennifer Calmelat – Consulting Website

Professional services website for **Jennifer Calmelat**, independent Investigation & Safeguarding Consultant (PSEAH & fraud investigations, compliance, training) with 13+ years of international experience.

Live at: [jennifercalmelat.com](https://jennifercalmelat.com)

## About

Single-page, service-oriented site with an editorial "international advisory" design. Fully static, dependency-free (no jQuery/Bootstrap), multilingual (EN / FR / ES), with a confidential-consultation contact form.

## Tech Stack

- HTML5 / CSS3 / vanilla JavaScript — no frameworks, no build step
- Typography: Fraunces + Archivo (Google Fonts)
- Contact form via [Formspree](https://formspree.io)
- Hosted on **GitHub Pages** with custom domain via Cloudflare

## Structure

```
├── index.html                  # Main page (single-page layout)
├── favicon.ico
├── CV-JenniferCalmelat.pdf     # Downloadable CV
├── img_jennifer/               # Original photos
│   └── web/                    # Optimized web versions (~250 KB each)
└── static/
    ├── js/
    │   ├── site.js             # i18n (EN/FR/ES) + interactions + form handler
    │   └── globe.js            # Animated globe (global footprint section)
    └── style/
        └── site.css            # Design system & all styles
```

## Sections

1. Hero – Value proposition with consultation CTA and trust strip (UNICEF, UNFPA, MSF, ICRC…)
2. Services – Six numbered service offerings with deliverable tags (click pre-fills the contact form)
3. How we work – Four-step engagement process with confidentiality note
4. Why me – Bio, animated stats, languages, CV download
5. Track record – Expandable career timeline (8 roles)
6. Credentials – Education and certifications
7. Contact – Direct channels + Formspree form
8. Global footprint – Animated dot-matrix globe (canvas, custom orthographic projection) marking 21 countries worked in, with a synced country list

## Languages

EN / FR / ES, switchable from the header. The choice persists in `localStorage`; first visit auto-detects the browser language. All copy lives in the `I18N` dictionary in `static/js/site.js`.

## Deployment

Deployed via GitHub Pages from the `main` branch. Custom domain configured through Cloudflare DNS.
