# Quick Translate

A browser extension for Chrome and Opera. Select a word or sentence on any page and get:

- **Google Translate** (English → Bengali, or another language you choose) in a small popup window
- **Synonyms** from the [altervista thesaurus](https://thesaurus.altervista.org/)

## How to use

1. Click the toolbar button. Any text already selected opens in Google Translate.
2. Select text on the page:
   - a small translate icon appears under it for 5 seconds. Click it to open Google Translate.
   - a yellow box shows synonyms. Click the box to hide it.
3. Click the toolbar button again to switch to **auto mode**: every selection opens Google Translate straight away. Click again to switch back.

## Install (developer mode)

1. Download or clone this repository.
2. Open `chrome://extensions` (Opera: `opera://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and choose this folder.

## Settings

Right-click the toolbar icon and choose **Options**.

- **Google Translate language**: language to translate into (default Bengali). Choose from 10 common languages.
- **Show synonyms (thesaurus)**: turn the synonym box on or off (default on).
- **Thesaurus key**: synonyms need a free key from [thesaurus.altervista.org](https://thesaurus.altervista.org/). It is stored only in your browser, never in the code.

## Files

| File | What it does |
|---|---|
| `manifest.json` | Extension settings (Manifest V3) |
| `background.js` | Toolbar button and thesaurus lookup |
| `google.js` | Runs on the page: selection, translate icon, synonym box |
| `options.html`, `options.js` | Settings page: language and thesaurus key |
| `translation.png` | Extension icon |
| `script.js`, `jquery-2.2.2.min.js` | Old files, not used |

## Versions

| Version | Date | Change |
|---|---|---|
| v1 | 2017-03-27 | First version: Google Translate popup and synonyms |
| v2 | 2022-11-23 | Translate icon under selection, auto mode toggle, new icon |
| v3 | 2025-02-20 | Manifest V3 (current Chrome and Opera), Options page: language, thesaurus on/off, thesaurus key |
