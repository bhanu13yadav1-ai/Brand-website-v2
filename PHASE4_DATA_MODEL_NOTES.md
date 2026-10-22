# Phase 4 Data / UX Notes

## Story item
- `id`: stable story identifier.
- `series`: connected story-world label.
- `mood`, `readingTime`, `characters`: card metadata.
- `teaser`: `clean`, `desi`, `bold` variants.
- `openingScene`: first scene ID.
- `scenes`: heading/prose per tone plus explicit choice edges.
- `choices[].nextScene` stays in the current story; `choices[].nextStory` goes to another story ID.

## Tone rules
- `clean`: accessible Hinglish; no gaali.
- `desi`: everyday Hinglish and teasing.
- `bold`: stronger colloquial swear words in fictional dialogue; no protected-class slurs, pressure, or coercion presented as desirable.
- Tone preference remains ephemeral and is not written to browser storage.

## Boyfriend/Couples character preference groups
- height
- appearance/complexion
- build
- style
- personality
- optional fictional penis-size trope

The six groups are separate controls. A body-size trope is not inferred from complexion, race or any photograph. Choices stay in JS memory only and can be cleared/skipped.

## Wheel connections
- boy → `saale-seedha-bol`
- dildo → `last-chai-first-confession`
- plug → `black-shirt-bad-timing`
- wild → story varies by current category

The current Part C integration remains the one authoritative wheel spin/result implementation. Phase 4 observes result changes and adds a read-story link after the result is complete; it does not register a second spin listener.
