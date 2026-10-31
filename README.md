# Brewing Bad

The promotional website for **[Brewing Bad](https://battydev.com/brewingbad/)**, a hands-on alchemy game by BattyDev.

This repository contains only the public static website and promotional assets. The Unity project, game source, saves, and demo builds are not included.

## Publishing

The GitHub Pages workflow in [`BattyDev/BattyDev.github.io`](https://github.com/BattyDev/BattyDev.github.io) checks out this repository's `main` branch into `/brewingbad/` when assembling battydev.com. There is no separate custom domain or build step here.

The parent site's hourly deployment picks up changes automatically. For an immediate update, run its **Deploy site** workflow manually. It also accepts the `brewingbad-updated` repository dispatch event if a cross-repository integration is configured in the future.

## Updating the demo

Set the real public Windows demo URL in `demo-config.js` when the build is ready. Leave it empty to retain the coming-soon state. Update the label and download details as appropriate. Bump the `?v=` query in `index.html` when changing CSS or JavaScript.

## Preview

Serve this directory with any static HTTP server, or open `index.html` directly. Assets use relative paths so they work under `/brewingbad/`. Home links return to `/` on battydev.com.

## Artwork

Morra and Hazel use the game's actual meshes, materials, rigs, animation poses, and face expression atlases, rendered in Blender. Gameplay images are actual development-build screenshots compressed to WebP. No AI-generated promotional imagery is used. Game content and visual quality remain in development.
