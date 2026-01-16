# 🎨 Tarot Card Asset Generation Guide

이 문서는 `타로2026` 프로젝트의 타로 카드 이미지를 생성할 때, **일관된 화풍과 품질**을 유지하기 위한 프롬프트 엔지니어링 및 워크플로우 가이드입니다.

메이저 아르카나 22장뿐만 아니라, 추후 마이너 아르카나(56장) 확장 시에도 동일한 분위기를 유지하는 것을 목표로 합니다.

---

## 1. Visual Style Identity (화풍 정의)

우리가 추구하는 타로 카드의 시각적 정체성은 다음과 같습니다.

*   **Core Style**: **Mystical Fantasy (신비로운 판타지)**
*   **Inspiration**: Rider-Waite Smith (라이더 웨이트 스미스) - 전통적인 상징을 계승하되 현대적인 디지털 아트로 재해석
*   **Tone & Mood**: 
    - 몽환적이고 신비로운 분위기
    - 고해상도의 섬세한 디테일 (High Detailed)
    - 빛과 그림자의 극적인 대비
*   **Format**: 세로 비율 (Vertical Aspect Ratio), 8K Resolution

---

## 2. Prompt Engineering (프롬프트 설계)

일관성을 위해 **[주제(가변)] + [스타일(고정)]** 구조의 프롬프트 템플릿을 엄격하게 준수합니다.

### 2.1 Base Template

```python
f"Tarot card design for '{English Name}' ({Korean Name}). " \
f"Keywords: {Keyword1, Keyword2, ...}. " \
f"Meaning: {Description of the card's meaning}. " \
f"Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio."
```

### 2.2 Style Tokens (고정 키워드)

다음 키워드들은 **모든 카드 생성 시 반드시 포함**되어야 합니다. 이것이 그림체를 통일하는 핵심 DNA입니다.

> **`Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio`**

*   `Rider-Waite Smith inspired`: 타로의 표준적인 도상학(iconography)을 따르도록 유도합니다.
*   `Mystical, fantasy`: 몽환적인 분위기를 형성합니다.
*   `High detailed, 8k resolution`: 뭉개짐 없는 선명한 화질을 요구합니다.

---

## 3. Workflow & Tooling

### 3.1 Python Script (`scripts/generate_tarot_images.py`)

수동으로 프롬프트를 입력하는 것보다, 스크립트를 통해 데이터를 주입하는 것이 실수를 줄이고 일관성을 높입니다.

**데이터 구조 예시:**
```python
{
    "id": 19,
    "name_en": "The Sun",
    "name_ko": "태양",
    "keywords": ["성공", "기쁨", "활력"],
    "desc": "모든 것이 밝게 빛나는 시기입니다."
}
```
스크립트는 위 데이터를 받아 자동으로 템플릿에 적용합니다.

### 3.2 Model Settings

*   **Model**: Google Gemini 2.5 Flash Image (또는 상위 버전)
    *   *Note*: 모델 버전에 따라 화풍이 달라질 수 있으므로, 한 세트(예: 메이저 아르카나 전체)는 가급적 **같은 모델 버전**으로 한 번에 생성하거나, 버전을 고정해서 사용하는 것이 좋습니다.

---

## 4. Tips for Consistency (일관성 유지 팁)

### 4.1 Do's (권장 사항)
*   **일괄 생성**: 화풍의 미묘한 변화를 막기 위해 카드 세트를 짧은 시차를 두고 연속으로 생성하는 것이 좋습니다.
*   **Seed 고정을 고려**: 만약 API가 Seed 파라미터를 지원한다면, 동일한 Seed를 사용하여 기본적인 화풍(색감, 붓터치 등)을 고정할 수 있습니다. (현재 스크립트에는 미적용)
*   **구체적인 묘사 추가**: 추상적인 개념(예: "심판")의 경우, 프롬프트의 `Meaning` 부분에 구체적인 시각적 묘사를 추가하면 좋습니다.
    *   *Bad*: "Meaning: It signifies judgement." (너무 모호함)
    *   *Good*: "Meaning: An angel blowing a trumpet in the sky, people rising from graves." (표준 도상학 묘사)

### 4.2 Don'ts (주의 사항)
*   **스타일 키워드 변경 금지**: 'Watercolor'(수채화)나 'Oil painting'(유화) 같은 새로운 매체 키워드를 중간에 섞지 마세요. 전체 덱의 통일성이 깨집니다.
*   **복잡한 프레임 요청 지양**: 카드 테두리(Frame)나 텍스트는 이미지 생성 단계보다는, **CSS/UI 단계에서 오버레이**로 처리하는 것이 훨씬 깔끔하고 일관됩니다. AI는 텍스트 렌더링에 약할 수 있습니다.

---

## 5. Future Expansion (마이너 아르카나 확장 시)

마이너 아르카나(Wands, Cups, Swords, Pentacles) 작업 시에는 각 수트(Suit)별 색상 테마를 프롬프트에 살짝 추가하여 구분을 줄 수 있습니다.

*   **Wands**: `Fiery colors, red and orange tones`
*   **Cups**: `Watery atmosphere, blue and cyan tones`
*   **Swords**: `Airy, windy, grey and pale blue tones`
*   **Pentacles**: `Earthy, lush green and gold tones`

단, **기본 Style Tokens**는 절대 유지해야 합니다.
