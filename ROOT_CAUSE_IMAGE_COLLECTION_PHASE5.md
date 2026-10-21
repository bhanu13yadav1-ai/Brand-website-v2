# Phase 5 — Root cause of missing innerwear collection images

## Observed source-code cause
The Phase 4 `products` array contains only 8 catalogue records. Six are innerwear/Sanskari references and two are wellness references. The source repositories contain many additional visual files (model/editorial photos, owner references, separate design concepts, cutout concept layers, Sanskari campaign art, and the 8-frame concept series), but those additional files were not represented as cards in the product data. Thus some photos can exist and load by URL while still not appearing in the on-page collection: the issue is also missing catalogue/gallery records, not only image loading.

## Phase 5 action
- Add a separate searchable `All innerwear & campaign images` collection with 151 indexed image-file records across 3 public source repositories.
- Keep each card in the collection even if the original image request fails. A fallback marks the original as unavailable and the card exposes the exact source link and retry button.
- Label external SYRN references as a separate external brand, not BLACKED products or a partnership.
- Label generated 360 frames and cutouts as concepts, not verified products.
- Keep the original Phase 4 catalogue, saved styles, demo bag, compare, Sanskari section, three original wheels and Dirty/Wild Wheel.

## Limitation
Image binary files could not be bundled from the source repositories in this execution environment; the gallery requests the exact public raw-GitHub URLs in `INNERWEAR_IMAGE_LIBRARY_MANIFEST.csv`. A live check is required to know which image requests succeed from your phone/network. `phase5-diagnostics.html` includes a button to request every source image and count success/failure. No external image is represented as a success until that runtime check is performed.
