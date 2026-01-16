# 🎨 Tarot Card Asset Generation Guide (Nano Banana / Manual Version)

이 문서는 `Nano Banana` (Gemini 2.5 Flash Image) 모델을 사용하여 타로 카드를 생성할 때 사용할 **프롬프트 템플릿과 전략**을 다룹니다.

코드 없이 모델에게 직접 명령을 내릴 때 이 가이드를 참고하세요.

---

## 1. Core Style Identity (화풍 정의)

우리가 추구하는 타로 카드의 시각적 정체성은 다음과 같습니다.

*   **Core Style**: **Mystical Fantasy (신비로운 판타지)**
*   **Inspiration**: Rider-Waite Smith (라이더 웨이트 스미스) - 전통적인 상징을 계승하되 현대적인 디지털 아트로 재해석
*   **Tone & Mood**: 몽환적, 신비로움, 고해상도의 섬세한 디테일, 빛과 그림자의 대비
*   **Format**: 세로 비율 (Vertical Aspect Ratio)

---

## 2. Prompt Formula (프롬프트 공식)

모델에게 입력할 프롬프트는 항상 아래 순서와 형식을 따릅니다.

> **[주제 설명] + [키워드] + [의미/묘사] + [스타일 토큰(고정)]**

### 2.1 Prompt Template (복사/붙여넣기용)

```text
Tarot card design for '[English Name]' ([Korean Name]).
Keywords: [Keyword1], [Keyword2], [Keyword3].
Meaning: [Description of visual elements or meaning].
Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio.
```

### 2.2 Style Tokens (절대 변경 금지)

아래 문구는 화풍 통일을 위해 **토씨 하나 틀리지 않고** 그대로 유지해야 합니다.

> `Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio.`

---

## 3. Examples (실전 예시)

### 예시 1: The Sun (태양)
```text
Tarot card design for 'The Sun' (태양).
Keywords: Success, Joy, Vitality, Positivity.
Meaning: A child riding a white horse under a bright sun, sunflowers in the background. A time when everything shines brightly.
Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio.
```

### 예시 2: Judgement (심판)
```text
Tarot card design for 'Judgement' (심판).
Keywords: Rebirth, Reward, Decision.
Meaning: An angel blowing a trumpet in the sky, people rising from graves with joy.
Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio.
```

---

## 4. Prompting Tips (팁)

1.  **Meaning 부분의 구체화**: "의미"만 적기보다는, **"무엇이 보여야 하는지"**를 함께 적어주면 더 정확한 결과가 나옵니다.
    *   (O) "천사가 나팔을 불고 있다" (시각적 묘사)
    *   (X) "두려움을 극복한다" (추상적 의미)
2.  **화풍 수정 금지**: "수채화 느낌으로 그려줘" 같은 추가 요청을 하지 마세요. 전체 카드 세트와 이질감이 생깁니다.
3.  **Nano Banana 모델 특성**: 영어 프롬프트가 더 정확하게 동작하므로, 템플릿의 영어 구조를 유지하세요.
