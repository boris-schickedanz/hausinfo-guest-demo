# Hausinfo Demo — Digitale Gästemappe (Pension Alpenblick)

Statische Verkaufsdemo einer digitalen Gästemappe für Micro-Hotels / Pensionen / Gasthöfe im DACH-Raum. Gäste scannen einen QR-Code und landen auf einer mobilen Webseite statt in einer Papier-Gästemappe.

**Demo-Objekt:** Pension Alpenblick (Schweizer Berggasthof-Feeling) · Sprache: Deutsch (de-CH)

Keine Backend-, PMS-, Login- oder Zahlungsintegration — pure HTML/CSS/JS.

---

## Dateien

| Datei | Zweck |
|-------|--------|
| `index.html` | Gästeansicht (mobil first) |
| `styles.css` | Alpine Premium-Optik (Holz/Creme/Waldgrün) |
| `app.js` | WLAN kopieren, Toast, Chips, E-Mail-Demo, QR |
| `admin-preview.html` | Statische Hotelier-UI («WiFi ändern», Abschnitte) |
| `qr.html` | Grosser QR zum Screenshot / Druck |
| `README.md` | Diese Anleitung |

---

## Lokal öffnen

Einfach `index.html` im Browser öffnen (oder lokalen Static-Server):

```bash
cd hausinfo-demo
npx --yes serve .
# oder: python3 -m http.server 8080
```

Handy-Breite testen: DevTools → Responsive (375×812).

> **Hinweis QR:** Unter `file://` kann die QR-Ziel-URL lokal aussehen. Nach dem Deploy auf HTTPS zeigt der QR korrekt auf die Live-Seite. CDN-Fallback: wenn `qrcodejs` blockiert ist, nutzt `app.js` die öffentliche QR-API.

---

## Anpassen (Hotelier-Demo → Kundenobjekt)

1. **Namen & Ort** in `index.html` (Header, Kontakt, Tipps).
2. **WLAN:** `#wifi-ssid` und `#wifi-pass` Texte ändern — der Copy-Button nimmt sie automatisch.
3. **Zeiten / Hausordnung / Tipps:** Abschnitte `#ankunft`, `#haus`, `#tipps` editieren.
4. **Telefon & Maps:** `tel:`- und Google-Maps-Links im Kontakt-Block.
5. **Produktions-QR-URL:** In `app.js` optional fest setzen:

```js
const DEMO_URL = "https://ihre-domain.ch/gaesteguide/";
```

Aktuell wird die relative `index.html`-URL der laufenden Seite verwendet. **In Produktion diese Platzhalter-URL durch die echte Gäste-URL ersetzen** — sonst zeigt der gedruckt QR weiterhin auf die Demo.

6. **Farben:** CSS-Variablen in `:root` (`styles.css`).
7. **E-Mail-Capture:** Demo zeigt nur «Danke» — für Live an Formspree, Netlify Forms oder eigenes Backend anbinden.

---

## Deploy (ohne Build)

Ordnerinhalt auf jeden Static Host legen:

### Netlify Drop
1. [app.netlify.com/drop](https://app.netlify.com/drop)
2. Ordner `hausinfo-demo` hineinziehen
3. URL notieren → in `app.js` als `DEMO_URL` setzen → neu deployen → QR in `qr.html` screenshotten

### Cloudflare Pages
1. Dash → Workers & Pages → Create → Upload assets
2. Ordner hochladen, fertig

### Beliebiger Static Host
Nginx/Apache/`scp`/S3+CloudFront — nur die Dateien ausliefern, kein Node-Build nötig.

---

## Kaltakquise — E-Mail-Blurb (DE)

> Hallo [Name], viele Gäste fragen zuerst nach dem WLAN-Passwort — und die Papier-Gästemappe liegt oft ungelesen in der Schublade. Mit **Hausinfo** scannen Ihre Gäste einen QR-Code und haben sofort WLAN, Check-in, Hausordnung und lokale Tipps auf dem Handy — immer aktuell, ohne App. Schauen Sie sich die 60-Sekunden-Demo der «Pension Alpenblick» an: [DEMO-URL] (mobil öffnen) — und den Admin-Blick hinter die Kulissen: [DEMO-URL]/admin-preview.html. Wenn Sie möchten, richte ich Ihnen in wenigen Minuten eine Version mit Ihrem Hausnamen und WLAN ein. Freundliche Grüsse

Ersetzen Sie `[DEMO-URL]` nach dem Deploy. Für den Anhang/Screenshot: `qr.html` öffnen und den grossen QR speichern.

---

## Out of Scope (bewusst)

- Echtes Backend / Auth / PMS
- Zahlungen, Mehrsprachigkeit i18n-Engine, Analytics-Dashboard
- Native Apps

Fragen zur Live-Version: in der Sales-Mail auf ein kurzes Call anbieten.
