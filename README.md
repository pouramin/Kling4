# The Final Hand — TunnelLab / Kling 4.0

A cinematic spy-film showcase for the four original Higgsfield Kling 4.0 generation links, the exact prompts used, and a separately edited final film.

## Live site

After GitHub Pages is enabled for this repository, the intended project URL is:

https://pouramin.dev/Kling4/

This repository is a project page under the existing `pouramin.dev` GitHub Pages user site. Do **not** add a separate `CNAME` file here.

## What's included

- `index.html` — responsive, standalone, static showcase
- `project-data.js` — the four original generation links, thumbnail URLs, descriptions, and complete prompts
- A final-film video section that can play an unlisted YouTube upload or a direct MP4 URL, once configured
- Copyable full prompts, links to each original Higgsfield asset, and production information

The prompts are the creator's submitted text with spacing/line breaks normalized for readability. Duration labels reflect the brief, not an independently inspected video file.

**Asset 02 note:** Higgsfield currently resolves `https://higgsfield.ai/s/ZVp_sL-LBTw` to a share with `utm_content=image`. This page retains the original link rather than pretending it is a playable video.

## Publish the site

1. Open **GitHub → pouramin/Kling4 → Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then click **Save**.
4. Allow GitHub Pages to finish publishing, then open **https://pouramin.dev/Kling4/**.

Pages settings may already be enabled depending on your account; in that case no settings change is needed.

## Add the final Premiere Pro film

The final MP4 is not included in this repository because it currently exists only on the creator's computer.

**Recommended (simplest):**
1. Export from Premiere Pro as H.264 / MP4, 1080p.
2. Upload to YouTube Studio, choose **Unlisted** visibility (if you don't want the film listed on the channel).
3. Copy its watch URL (for example: `https://youtu.be/XXXXXXXXXXX`).
4. Edit `project-data.js`: find `"finalVideoUrl": ""` and paste the YouTube URL between the quotes. Commit the change.
5. The final film section automatically turns into a playable embedded YouTube player.

**Alternative:** Host the MP4 at a publicly accessible URL (for example Cloudflare R2 with public access), and set `finalVideoUrl` to the direct `.mp4` URL. This enables an inline HTML5 video player. Verify the URL supports byte-range requests and allows playback by browsers.

Avoid committing large master video files to GitHub; GitHub is a source repository, not a streaming service. GitHub regular uploads have a 100 MB hard limit and site performance can suffer.

## Edit content

- All four prompts, share links, card descriptions and poster images: `project-data.js`
- Main layout, branding, styling, section copy: `index.html`
- Optional tutorial video URL: `youtubeWalkthroughUrl` is reserved for later usage; there is no tutorial player in the current version.
- All current Higgsfield links open in a new tab. Direct embedding is not claimed to work.

## Technical details

- Static HTML, CSS and vanilla JavaScript; no build dependencies
- Responsive layouts and keyboard-accessible buttons
- Cloudflare Web Analytics script uses the same public token already used in the creator's earlier AiVideo page
- Thumbnail images are linked to the public original Higgsfield share preview assets; if a remote URL expires, update it in `project-data.js`

## Original work

This is an original cinematic AI filmmaking experiment. The film is inspired by the broader 1960s spy-film aesthetic; it is not affiliated with any specific film franchise.
