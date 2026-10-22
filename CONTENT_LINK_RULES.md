# Content Link Rules — Phase 2

## Link graph design

The common graph represents the seven existing views, four existing wheel keys and eight new media references without copying the legacy story, catalogue or 151 image-library records. Stable existing story IDs/product IDs remain owned by `app.js` and the original JSON files. Later phases may import those records into a unified manifest only after IDs and storage are tested for equivalence.

## Allowed links

- `related_destination`: one existing view to another view, rendered as a small bottom rail.
- `displayed_in`: a photo is rendered on a particular existing view and in a named concept gallery.
- Future-approved relations can include `next_chapter`, `alternate_ending`, `wheel_outcome`, `related_guide`, `product_category`, and `collection` after their source records have been inventoried.

## Do not infer

- A campaign image does not prove product name, SKU, actual stock, material, size range, battery claims, waterproof claims, medical/health benefits, returns policy or price.
- Similar spelling such as BLACKED / BLXCKED / INNERWERE is not proof of a shared legal or commercial identity.
- A story or wheel result does not obligate the user to carry out an act or buy anything.
- A product concept image does not create a sellable product. Keep sales disabled until product data, seller, fulfilment, payment and applicable provider policies are verified.

## Validation rules

1. All route/media/component IDs must be unique.
2. Every graph edge source and target must exist.
3. Every local asset path must resolve and its SHA-256 must match the manifest.
4. Every asset carries alt text, provenance, rights status and claim status.
5. Current four wheel keys (`boy`, `dildo`, `plug`, `wild`) remain unchanged.
6. New galleries are mounted additively. If the host selector cannot be found, record a diagnostic error rather than silently replacing content.
7. Cross-route buttons activate the existing static navigation control so current age self-attestation flow is still invoked.
