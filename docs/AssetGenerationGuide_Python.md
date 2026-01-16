# 🐍 Tarot Card Asset Generation Guide (Python Version)

이 문서는 `scripts/generate_tarot_images.py` 스크립트를 사용하여 타로 카드를 **일괄 생성(Batch Generation)** 할 때의 가이드입니다.

개발자가 데이터를 정의하고 스크립트를 실행하여 파이프라인을 통해 이미지를 생성할 때 참조하세요.

---

## 1. Script Location & Setup

*   **Script Path**: `scripts/generate_tarot_images.py`
*   **Output Path**: `src/assets/cards/`
*   **Dependency**: `google-genai`, `Pillow`
*   **Environment Variable**: `GEMINI_API_KEY`가 설정되어 있어야 합니다.

---

## 2. Data Structure (in Code)

스크립트 내부의 `cards` 리스트에 딕셔너리 형태로 카드 정보를 추가하여 사용합니다.

```python
cards = [
    {
        "id": 19,
        "name_en": "The Sun",              # 카드 영문명 (프롬프트 주어)
        "name_ko": "태양",                  # 카드 한글명 (보조 설명)
        "filename": "major_19_sun.png",    # 저장될 파일명
        "keywords": ["성공", "기쁨", "활력"], # 키워드 리스트
        "desc": "모든 것이 밝게 빛나는 시기입니다." # 카드의 의미/묘사
    },
    # 추가 카드...
]
```

---

## 3. How it Works (Logic)

스크립트는 정의된 데이터를 아래의 구조로 조합하여 API에 요청을 보냅니다.

```python
prompt = f"Tarot card design for '{card_data['name_en']}' ({card_data['name_ko']}). "
prompt += f"Keywords: {', '.join(card_data['keywords'])}. "
prompt += f"Meaning: {card_data['desc']} "
prompt += "Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio."
```

마지막 줄의 `Art style` 문자열이 코드 내에 하드코딩되어 있어, 모든 카드가 동일한 스타일 토큰을 강제로 사용하게 됩니다. 이를 통해 일관성을 프로그래매틱하게 보장합니다.

---

## 4. Usage Instructions

1.  `scripts/generate_tarot_images.py` 파일을 엽니다.
2.  `cards` 리스트에 생성하고자 하는 새로운 카드 정보(예: 마이너 아르카나)를 추가합니다.
3.  터미널에서 스크립트를 실행합니다.
    ```bash
    python scripts/generate_tarot_images.py
    ```
4.  이미 존재하는 파일(`filename`)은 자동으로 건너뛰고(Skip), 없는 파일만 생성합니다.

---

## 5. Maintenance (유지보수)

*   **스타일 변경**: 화풍을 바꾸려면 스크립트 내의 `prompt += "Art style: ..."` 라인을 수정하세요. (모든 카드에 일괄 적용됨)
*   **모델 변경**: `client.models.generate_content(model='...')` 부분에서 모델 버전을 변경할 수 있습니다.
