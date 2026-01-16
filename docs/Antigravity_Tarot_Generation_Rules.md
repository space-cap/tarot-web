# 🤖 Antigravity Tarot Generation Rules

이 문서는 **Antigravity(AI Agent)**가 `generate_image` 도구를 사용하여 타로 카드를 생성할 때 **반드시 준수해야 할 규칙**을 정의합니다.
사용자가 "이 규칙대로 카드를 그려줘"라고 요청하면, 본 문서의 프롬프트 형식을 엄격하게 따르십시오.

---

## 1. Absolute Style Tokens (절대 불변 스타일)

모든 카드 생성 요청 시, **`Art style` 파라미터는 아래의 문자열을 토씨 하나 틀리지 않고 그대로 사용**해야 합니다. 이것이 전체 덱의 시각적 일관성(Visual Consistency)을 보장하는 핵심입니다.

> **`Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio (9:16)`**

*   **변경 금지**: 순서를 바꾸거나, 단어를 추가/삭제하지 마십시오.
*   **추가 금지**: "Watercolor", "Oil painting", "Realistic" 등의 다른 스타일 수식어를 절대 섞지 마십시오.

---

## 2. Text Layout & Numeral Rules (텍스트 배치 규칙)

카드에 포함되는 텍스트 위치와 숫자 형식을 명확히 지정해야 합니다.

*   **Layout**:
    *   **Top (상단)**: 카드 번호 (Number)
    *   **Bottom (하단)**: 카드 영문 이름 (English Name)
*   **Number Format**:
    *   **The Fool**: 숫자 **`0`** (아라비아 숫자) 사용.
    *   **Other Major Arcana**: **로마자 (Roman Numerals)** 사용 (e.g., I, II, III ... XXI).
    *   **Minor Arcana**: 하단에 이름만 표기하거나, 상단에 숫자만 표기.

---

## 3. Prompt Template (프롬프트 양식)

`generate_image` 툴의 `Prompt` 인자를 작성할 때 다음 포맷을 사용하십시오.
**Meaning 부분에 텍스트 배치에 대한 지시사항을 반드시 포함해야 합니다.**

```markdown
Tarot card design for '{English Name}'. Keywords: {Keywords}. Meaning: {Visual Meaning Description}. Text layout: Number '{Number}' on top, Name '{English Name}' on bottom. Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio (9:16), full frame design.
Constraint: Main character must appear ONLY ONCE in the center. Background must be abstract pattern or simple texture. NO ghosting, NO repeated faces in background, clean decorative border.
```

*   **{English Name}**: 카드의 영문명 (예: The Sun)
*   **{Number}**: 카드의 번호 (The Fool은 '0', 나머지는 'XIX', 'XXI' 등 로마자)
*   **{Keywords}**: 핵심 키워드 3~4개 (예: Success, Joy)
*   **{Visual Meaning Description}**: 화면에 보여야 할 시각적 요소 위주로 서술.

---

## 4. Output Format & Aspect Ratio (출력 형식)

타로 카드는 반드시 **세로형(Vertical/Portrait)**이어야 하며, 구체적으로 **9:16 비율**을 지향합니다.

*   제공된 `generate_image` 툴이 비율(Aspect Ratio) 설정 파라미터를 지원하지 않으므로, 프롬프트 내의 **`vertical aspect ratio (9:16)`** 키워드가 누락되지 않도록 특히 주의하십시오.

---

## 5. Image Naming Convention (파일 작명 규칙)

생성된 이미지를 저장하거나 이동할 때 다음 규칙을 따르십시오.

*   **Major Arcana**: `major_{number}_{name}.png` (예: `major_00_fool.png`, `major_19_sun.png`)
*   **Minor Arcana**: `minor_{suit}_{number}_{name}.png` (예: `minor_wands_01_ace.png`)

---

## 6. Agent Behavior Checklist

이미지를 생성하기 전 스스로 다음을 체크하십시오:

1.  [ ] **텍스트 배치 확인**: 상단 숫자(로마자/0), 하단 영문 이름 배치를 프롬프트에 포함했는가?
2.  [ ] **스타일 토큰 확인**: `vertical aspect ratio (9:16)`을 포함한 전체 문자열이 정확한가?
3.  [ ] **형식 확인**: `Tarot card design for...` 로 시작하는 표준 템플릿을 사용했는가?
