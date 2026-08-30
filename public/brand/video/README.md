# Hero video

**In use:** `hero.mp4` (1.8MB) / `hero.webm` (1.8MB) — 1200×900, 12 seconds,
silent, with a 1-second crossfade at the loop point so there is no hard cut.

Cut from `mom-and-dad-imitate-roof-of-house-with-their-hands.mov`:

- 4:3 centre crop from the 1920×1080 source. A portrait crop was tried first
  and rejected — it clipped both parents, losing the roof gesture the shot
  exists for.
- Trimmed from 2s to 14s, output as 12s with the first second overlaid and
  faded in over the last second.
- Audio stripped. The video is muted and must read silently.

`hero-poster.webp` is frame one of this video, so the still and the first
frame match exactly and there is no jump when playback starts.

## Replacing it

Drop in a new `hero.mp4` (and optionally `hero.webm`). Nothing else changes —
the component checks the file exists before mounting the video, so a missing
or broken file falls back to the poster rather than showing a black panel.

| | |
| --- | --- |
| Aspect | 4:3. Others work — it is object-cover — but this suits the panel |
| Length | 8–20 seconds, looping cleanly |
| Audio | None |
| Size | Under 4MB. This loads on first paint |
| Content | No burned-in text, logos or watermarks |

```bash
# 4:3 crop, 12s, with a 1s crossfade loop
ffmpeg -ss 2 -t 13 -i source.mov -filter_complex "\
[0:v]crop=1440:1080:240:0,scale=1200:900,setsar=1[v];\
[v]split[body][pre];\
[pre]trim=duration=1,format=yuva420p,fade=t=in:st=0:d=1:alpha=1,setpts=PTS+11/TB[fadein];\
[body]trim=duration=12,setpts=PTS-STARTPTS[main];\
[main][fadein]overlay=format=auto[out]" \
-map "[out]" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart hero.mp4 -y

ffmpeg -i hero.mp4 -c:v libvpx-vp9 -crf 36 -b:v 0 -an hero.webm -y
ffmpeg -i hero.mp4 -frames:v 1 -q:v 2 poster.jpg -y   # then convert to webp
```

Visitors with `prefers-reduced-motion` never see the video — they get the
poster still instead.
