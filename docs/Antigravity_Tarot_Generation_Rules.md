# 🤖 Antigravity Tarot Generation Rules

이 문서는 **Antigravity(AI Agent)**가 `generate_image` 도구를 사용하여 타로 카드를 생성할 때 **반드시 준수해야 할 규칙**을 정의합니다.
사용자가 "이 규칙대로 카드를 그려줘"라고 요청하면, 본 문서의 프롬프트 형식을 엄격하게 따르십시오.

---

## 1. Absolute Style Tokens (절대 불변 스타일)

모든 카드 생성 요청 시, **`Art style` 파라미터는 아래의 문자열을 토씨 하나 틀리지 않고 그대로 사용**해야 합니다. 이것이 전체 덱의 시각적 일관성(Visual Consistency)을 보장하는 핵심입니다.

> **`Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio`**

*   **변경 금지**: 순서를 바꾸거나, 단어를 추가/삭제하지 마십시오.
*   **추가 금지**: "Watercolor", "Oil painting", "Realistic" 등의 다른 스타일 수식어를 절대 섞지 마십시오.

---

## 2. Prompt Template (프롬프트 양식)

`generate_image` 툴의 `Prompt` 인자를 작성할 때 다음 포맷을 사용하십시오.

```markdown
Tarot card design for '{English Name}' ({Korean Name}). Keywords: {Keywords}. Meaning: {Visual Meaning Description}. Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio.
```

*   **{English Name}**: 카드의 영문명 (예: The Sun)
*   **{Korean Name}**: 카드의 한글명 (예: 태양)
*   **{Keywords}**: 핵심 키워드 3~4개 (예: Success, Joy)
*   **{Visual Meaning Description}**: 추상적인 의미보다는 **'화면에 보여야 할 시각적 요소'** 위주로 서술하십시오.
    *   *Bad*: "기다리던 소식이 온다." (너무 추상적)
    *   *Good*: "하늘에서 천사가 나팔을 불고 있고, 사람들이 기뻐하며 하늘을 쳐다본다." (구체적)

---

## 3. Image Naming Convention (파일 작명 규칙)

생성된 이미지를 저장하거나 이동할 때 다음 규칙을 따르십시오.

*   **Major Arcana**: `major_{number}_{name}.png` (예: `major_00_fool.png`, `major_19_sun.png`)
*   **Minor Arcana**: `minor_{suit}_{number}_{name}.png` (예: `minor_wands_01_ace.png`)

---

## 4. Minor Arcana Color Themes (확장 규칙)

마이너 아르카나 생성 시에는 `Art style` 앞에 **Suit별 색상 테마**를 살짝 추가하여 구분을 줍니다. 단, **Absolute Style Tokens**는 그대로 유지합니다.

*   **Wands (불)**: `Warm lighting, fire elements, red and orange tones. `
*   **Cups (물)**: `Soft dreamlike atmosphere, water elements, blue and cyan tones. `
*   **Swords (공기)**: `Sharp contrast, wind elements, grey, pale blue and silver tones. `
*   **Pentacles (땅)**: `Nature elements, vines and flowers, green, brown and gold tones. `

**적용 예시 (Wands):**
> ... Meaning: A hand holding a sprouting wand. **Warm lighting, fire elements, red and orange tones.** Art style: Mystical, fantasy, ... (이하 동일)

---

## 5. Agent Behavior Checklist

이미지를 생성하기 전 스스로 다음을 체크하십시오:

1.  [ ] **스타일 토큰 확인**: `Mystical, fantasy...` 문자열이 프롬프트 끝에 정확히 포함되었는가?
2.  **형식 확인**: `Tarot card design for...` 로 시작하는 표준 템플릿을 사용했는가?
3.  **구체성 확인**: `Meaning` 부분이 AI가 그림으로 그릴 수 있도록 시각적으로 묘사되었는가?
