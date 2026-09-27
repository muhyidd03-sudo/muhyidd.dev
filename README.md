# Muhyiddin — Portfolio V28

V28 keeps the existing portfolio content and interactions, with the **Selected Work** section redesigned around the uploaded Work Gallery reference video.

## Selected Work changes
- Dark showcase section inspired by the reference video's composition.
- Large centered project card with smaller surrounding previews.
- 5-card visual carousel built from the 3 real projects using cyclic previews.
- Smooth project transitions and content reveal animation.
- Previous / next controls and keyboard arrow navigation.
- `View project` opens the existing project case-study modal.
- Responsive behavior for tablet and mobile.

## Projects
1. Sistem Kasir Toko Kitab Pondok
2. Personal Portfolio
3. Dicoding Web Project

The certificate gallery and the rest of the portfolio remain included from V22.


## V28 update
- Selected Work uses the same light background language as the other main sections.
- Gallery is slightly larger.
- Previous/next controls are overlaid directly on the main project image.


V28: gallery animation rebuilt to match the reference motion: five stacked visual slots, continuous one-slot shifting, autoplay, pause on hover/focus, and position-based transforms that prevent cards from jumping after repeated navigation.

## V29 — Reference-matched Work Gallery motion
- Rebuilt the Selected Work carousel motion as a continuous 5-slot 3D conveyor.
- Unified the JavaScript slot classes with the CSS so the animation does not mix incompatible V25/V27 selectors.
- Tuned easing, duration, depth, overlap, scale, opacity, and perspective to more closely follow the supplied reference video.
- Auto-play continues while hovering the gallery, matching the reference behavior more closely.
- Existing 3 real projects are reused across the five visual slots; no fictional projects were added.
