# Data Structure & Schema (데이터 구조 정의서)

## 1. 타로 카드 데이터 (Tarot Card Data)
`src/data/tarot-data.json` 파일에 정적 데이터로 저장될 구조입니다.
메이저 아르카나 22장을 기본으로 합니다.

```json
[
  {
    "id": 0,
    "name_en": "The Fool",
    "name_ko": "광대",
    "image_url": "/assets/cards/major_00_fool.webp",
    "keywords": ["순수한 시작", "모험", "자유", "무계획"],
    "description": "새로운 시작을 의미하며, 순수한 마음으로 모험을 떠나는 상태를 상징합니다...",
    "prediction": {
      "2026_general": "예상치 못한 기회가 찾아올 2026년입니다. 과감하게 도전해보세요.",
      "love": "새로운 만남이 예고되어 있습니다. 계산 없이 마음을 표현하세요.",
      "wealth": "계획적인 지출이 필요하지만, 새로운 수입원이 생길 수 있습니다."
    }
  },
  {
    "id": 1,
    "name_en": "The Magician",
    "name_ko": "마법사",
    "image_url": "/assets/cards/major_01_magician.webp",
    "keywords": ["창조", "능력", "자신감", "실행"],
    "description": "당신은 이미 필요한 모든 능력을 가지고 있습니다. 이제 행동으로 옮길 때입니다...",
    "prediction": {
      "2026_general": "당신의 재능이 꽃피우는 한 해가 될 것입니다.",
      "love": "주도적으로 관계를 이끌어갈 힘이 있습니다.",
      "wealth": "자신의 능력을 활용하여 부를 창출할 수 있는 시기입니다."
    }
  }
  // ... continue to id 21
]
```

### 필드 설명
*   `id` (Number): 카드 고유 ID (0~21)
*   `name_en` (String): 영문 이름 (이미지 파일명 매칭용)
*   `name_ko` (String): 화면 표시용 한글 이름
*   `image_url` (String): 카드 이미지 경로
*   `keywords` (Array<String>): 핵심 키워드 (해시태그 등에 활용)
*   `description` (String): 카드의 일반적인 의미
*   `prediction` (Object): 2026년 운세 데이터
    *   `2026_general`: 총운
    *   `love`: 연애운
    *   `wealth`: 금전운

## 2. 결과 데이터 모델 (Result State Model)
앱 실행 중 메모리에서 관리하거나 공유 시 URL 파라미터로 변환될 데이터 모델입니다.

```typescript
interface TarotResult {
  timestamp: number;        // 점을 본 시간 (Unix timestamp)
  selectedCardIds: number[]; // 사용자가 뽑은 카드 ID 배열 (예: [0, 5, 12])
  userName?: string;        // 사용자 닉네임 (Optional)
  shareId?: string;         // 공유를 위한 고유 해시값 (Server 연동 시)
}
```
