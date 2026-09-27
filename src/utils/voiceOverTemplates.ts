export const VOICE_OVER_PROMPT_TEMPLATE = `
[TAGLINE: BOISER EMPIRE - POWERING EDUCATIONAL EXCELLENCE]

Generate clear, calm, and naturally-paced narration for this user guide / door guide. Follow these settings:

**Language (Choose one):**
- English
- Bisaya (Cebuano)
- Tagalog (Filipino)

**Pronunciation & Delivery (applies to all voices):**
- Speak clearly and at a moderate, easy-to-follow pace
- Calm, steady tone — no rushing
- Correct pronunciation of technical/product terms
- Natural pauses between steps or sections

**Voice Style (Choose one):**
1. **Sweet Girl Voice** — warm, friendly, gentle, youthful female tone
2. **Male Voice** — confident, clear, neutral-to-warm male tone
3. **Baby Voice** — playful, high-pitched, soft and simple phrasing
4. **Grandma Voice** — warm, slow, nurturing, slightly raspy elderly female tone
5. **Grandpa Voice** — warm, slow, wise, gravelly elderly male tone
6. **Smart Voice** — crisp, professional, articulate, slightly formal tone

**Output instructions:**
- Read the user guide/door guide content exactly as written, adapting only tone/pacing to match the selected voice style.
- Replace any existing user guide/door guide manual instructions with the content provided.
- Keep pronunciation clear regardless of style.
- If Bisaya or Tagalog is selected, use natural regional pronunciation and intonation.
- Always end the narration with: "ENJOY LEARNING!"

[TAGLINE: BOISER EMPIRE - POWERING EDUCATIONAL EXCELLENCE]
`;
