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

The cinematic presentation follows a design mockup selected by the owner. Generated mockups served as design references only; the live page uses actual game assets. Botanical details, the parchment texture, and the irregular paper edge are SVG/CSS.

The gameplay showcases use eight short silent MP4s captured October 31, 2026. Their posters come from the same media pack. Camera captures omit HUD overlays; gameplay inputs are scripted, and equipment funds and supplemental stock are staged in an isolated developer save. The dusk hero remains a crop of the October 30 skyline capture. Original game saves and logs are not published.

Videos appear as silent inline loops without player controls or click-to-pause behavior. Only visible clips start automatically, and offscreen clips pause. Reduced-motion and data-saving preferences show capture posters instead, as does blocked autoplay. Without JavaScript, posters remain visible. GIFs and the internal review gallery remain in the local media pack and are not needed for the live page.

## Friends invite — `/brewingbad/invite/`

The invite is a separate vanilla HTML/CSS/JS page in `invite/`. The existing public promo page, its download config, CSS, JavaScript and social image stay unchanged. No build step or additional hosting is required: the parent Pages workflow includes the new directory automatically when this branch lands through a pull request. The invite is unlisted and carries `noindex, nofollow`; its files are public, which is not access control.

Edit **`invite/demo-config.js`** for the friends build. It uses `window.BREWING_BAD_INVITE`, independent of the public page's `BREWING_BAD_DEMO`. Set `url`, `label`, `buildDate` (`YYYY-MM-DD`), `fileSize` and `sha256` from the exact downloadable ZIP. Use `Get-FileHash <build.zip> -Algorithm SHA256` for the checksum. Blank URL means no download link, with an honest “ask me for the current build” message. Unknown metadata says “To be confirmed”; capture dates are never presented as a distributable build date. Only absolute HTTP(S) URLs without embedded credentials become download links. Bump the corresponding `?v=` queries in `invite/index.html` whenever its CSS, script or config changes. Shared asset queries remain unchanged because their files are unchanged.

### Invite artwork and staging — 1 November 2026

All new pictures are real game captures, compressed to WebP (1600 × 900). No generated imagery, saves, profiles or logs are published. The source captures and isolated saves remain under the development workspace's `PlaytestData/Invite-20261101/`; capture-only scripts/builds remain in `tmp/`, outside this website repository.

Town scenes came from `Builds/Windows-20261101/Underseal.exe` with `--capture-city --fresh-start --save-dir <isolated City folder>` and a separate capture port. `CityEvidence.cs` renders the real game camera without the HUD. Its evidence setup stages workshop stock and gate access; the Lower Market shot uses developer-granted papers/rank, not a naturally completed opening.

Matching byre, co-op, ferry and current menu captures use an isolated copy of that player's game assets with the current `Assets/Apothecary/Scripts` compiled into its game assembly, plus a local capture-only helper. This includes the current five-slot menu. A temporary explicit `System.Action` cast accommodates the installed C# compiler; gameplay rules are unchanged. The Unity project and original player were not edited. The helper teleports for framing, grants 200 purse coin, buys the byre and starter junk through actual game actions, and places equipment at legal floor positions. Before/after use the same camera position. Co-op runs two real processes of the same capture build on loopback with separate host/guest save folders; the players are positioned by the host for framing, and their existing models are sampled in an idle pose at full detail, with the local model made visible only for the third-person camera render. There are no invented players or composited crowds.

Ferry captures run `--host --capture-intro --fresh-start --save-dir <isolated FerryCamera folder>`. The capture copy replaces the screen-grab call with a render from the same live intro camera, omitting its HUD/subtitles and avoiding black frames from hidden windows. The final wide still is the 21.5-second pier shot. No new ferry loop is shipped; the arrival is shown as a still. Title and save-menu screenshots retain the UI and require a visible game window; the helper calls the actual title and `ShowSlots()` screens. Slot 1 contains only a developer save; the other four are empty. The supplied `--capture-slots` script was inspected; menu pictures use the same current game UI via the helper rather than its full save-overwrite test sequence.

Every new shipped media file:

| File under `invite/assets/` | Source and staging |
| --- | --- |
| `ferry-arrival.webp` | `FerryCamera/intro-4.png`; live ferry intro camera, 21.5 seconds, HUD omitted. |
| `tallow-square.webp` | `City/evidence/city-square-n.png`; street-level square and live crowd. |
| `morra-stall.webp` | `City/evidence/fresh-morra-barrow.png`; real Morra and her second-hand stall. Linked from the opening beat. |
| `byre-before.webp` | `Staged/Host/byre-before.png`; fresh byre before starter gear is placed. |
| `byre-after.webp` | `Staged/Host/byre-after.png`; identical camera after starter purchases/placement with the grant described above. |
| `odd-job.webp` | `City/evidence/fresh-alms-barrel.png`; Sister Rook's real Relief Hall barrel, HUD omitted. |
| `lower-gate.webp` | `City/evidence/fresh-gate-shut.png`; Lower City Gate without papers. |
| `lower-market.webp` | `City/evidence/fresh-market-yard.png`; real Lower Market with staged access. |
| `coop.webp` | `CoopSky/Host/coop.png`; connected host and joiner on the road, camera framing and local-player visibility staged. |
| `title.webp` | `Menu/title.png`; actual title screen, including Host Address, UI retained. |
| `save-slots.webp` | `Menu/save-slots.png`; actual five-slot menu, developer save in slot 1. |
| `social.jpg` | 1200 × 675 crop/resize of `FerryCamera/intro-4.png`, darkened with a plain title/pitch overlay. Used only by the invite's share metadata. The public promo's `assets/social.jpg` is unchanged. |

Existing `assets/alchemists.webp` (Morra/Hazel's game meshes posed in Blender), `assets/town-dusk-current.webp`, the SVG/CSS paper textures and the four October 31 craft loops/posters (`harvesting`, `grinding`, `stirring`, `bottling`) are reused. Their filming notes above still apply: scripted real inputs, HUD hidden, isolated developer-funded equipment/stock. The invite copies the existing visible-only autoplay logic, pauses offscreen/hidden clips, and uses posters for reduced motion, data saver, blocked autoplay and no JavaScript.

### Invite review

The four new page captures below are browser screenshots compressed to WebP; before is the unchanged public promo, after is the separate invite. They contain no game runtime saves/logs or personal data.

| Width | Before | After |
| --- | --- | --- |
| Desktop, 1440 px | [Before](review/invite/before-desktop.webp) | [After](review/invite/after-desktop.webp) |
| Phone, 390 px | [Before](review/invite/before-phone.webp) | [After](review/invite/after-phone.webp) |

Browser QA serves the repo at `/brewingbad/`, matching production nesting. Checked 320, 390, 768 and 1440 px: no horizontal overflow, all images load, no script errors. Verified empty URL/no href; a test HTTPS URL with config-driven date/size/SHA; invalid/unsafe URL fallback; no-JavaScript messaging; keyboard craft tabs; reduced-motion and data-saver posters; normal visible-only playback/offscreen pause. The example URL is injected only during QA and is not saved in config. Existing promo files are unchanged.

The game-wide `Tests/Smoke-FreshCoop.ps1` was also attempted with the pre-existing November 1 player. It timed out waiting for the guest to try the gate, so this work does not claim a passing full co-op gameplay smoke test. The final co-op media capture separately confirms two connected players of the current-source capture build. This website change does not modify game behavior.
