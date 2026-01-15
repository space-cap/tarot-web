# 기술 설계서 (Technical Design Document)

이 문서는 **타로2026** 프로젝트의 상세 구현 계획 및 기술적 의사결정 사항을 다룹니다.

## 1. 프론트엔드 아키텍처 (Frontend Architecture)

### 1.1 기술 스택 상세 (Tech Stack Details)
*   **Core**: React v19
    *   **Hooks**: `useTransition`, `useOptimistic` 등 최신 훅 활용 고려.
    *   **Compiler**: React Compiler (Memoization 자동화) 적용 검토.
*   **Build Tool**: Vite
    *   빠른 HMR 및 빌드 성능 활용.
    *   `vite-plugin-pwa`를 통한 PWA 기능 확장 가능성 열어둠.
*   **Language**: JavaScript (ESModule)
*   **Styling**: CSS Modules (+ PostCSS)
    *   BEM Naming Convention 사용하지 않고, 로컬 스코프 활용.
    *   Global Style은 `index.css`에서 변수(CSS Variables)로 관리.

### 1.2 디렉토리 구조 전략 (Directory Strategy)
Atomic Pattern을 변형한 **Feature-based** 구조를 채택하여 유지보수성을 높입니다.

```text
src/
├── features/            # 도메인별 기능 단위 분류
│   ├── deck/            # 카드 덱 관련 (Deck, Card, ShuffleLogic)
│   ├── reading/         # 타로 리딩 관련 (Selection, Interpretation)
│   └── shared/          # 공유 컴포넌트
├── contexts/            # 전역 상태 (Theme, Sound 등)
├── lib/                 # 외부 라이브러리 래퍼 (Analytics, Share API)
└── constants/           # 상수값 (메시지, 설정값)
```

## 2. 주요 로직 구현 (Core Logic Implementation)

### 2.1 카드 셔플 알고리즘 (Shuffle Algorithm)
*   **Fisher-Yates Shuffle** 알고리즘을 사용합니다.
*   단순 `Math.random()` 대신, 암호학적으로 안전한 난수 생성기(`crypto.getRandomValues`) 사용을 고려하여 "운세"의 신뢰성을 (재미 요소를 위해) 더합니다.

```javascript
function secureShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const j = randomBuffer[0] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```

### 2.2 상태 관리 상세 (State Management)
*   **Zustand**를 사용하여 간결하게 구현합니다.
*   `useTarotStore` 스토어 구조:
    *   `cards`: 전체 카드 목록.
    *   `selectedIds`: 선택된 카드 ID Set.
    *   `step`: 현재 진행 단계 ('intro' | 'shuffling' | 'selecting' | 'reading' | 'result').
    *   `actions`: `shuffleDeck()`, `selectCard(id)`, `reset()` 메서드 노출.

## 3. 렌더링 및 성능 최적화 (Optimization)

### 3.1 이미지 최적화 (Image Optimization)
*   타로 카드 이미지는 고해상도이므로 용량이 큽니다.
*   **Format**: WebP 형식을 기본으로 사용 (Fallback: PNG/JPG).
*   **Loading Strategy**:
    *   인트로 진입 시: 카드 뒷면 이미지, 배경 이미지 프리로드.
    *   셔플/선택 중: 결과 카드 앞면 이미지를 `Link rel="preload"` 또는 JS로 백그라운드 로딩.

### 3.2 애니메이션 성능 (Animation Performance)
*   `framer-motion`을 사용하되, Layout Thrashing을 방지하기 위해 `transform`, `opacity` 속성 위주로 애니메이션을 구성합니다.
*   `will-change` 속성을 적절히 사용하여 GPU 가속을 유도합니다.

## 4. 에러 처리 및 안정성 (Error Handling)

### 4.1 에러 바운더리 (Error Boundary)
*   React `ErrorBoundary`를 사용하여 렌더링 중 발생하는 예기치 못한 오류를 포착합니다.
*   "운세를 불러오는 중 별들이 잠시 길을 잃었어요."와 같은 위트 있는 에러 메시지 UI 제공.

### 4.2 예외 케이스 처리
*   이미지 로드 실패 시: 기본 플레이스홀더 카드 표시.
*   공유 API 미지원 브라우저: 클립보드 복사(Fallback) 기능 자동 전환.

## 5. 배포 파이프라인 (Deployment Pipeline)
*   **Hosting**: Vercel (GitHub 연동).
*   **CI Checks**:
    *   Push 시: ESLint, Prettier 체크.
    *   PR 시: Build 테스트 실행.
*   **Environment Variables**:
    *   개발/운영 환경 분리 (`.env.development`, `.env.production`).

## 6. 보안 (Security)
*   **XSS 방지**: 사용자 입력(이름 등)이 있을 경우 React의 기본 이스케이프 기능을 활용하고, URL 파라미터 파싱 시 검증 로직을 추가합니다.
*   **Rate Limiting**: (향후 API 연동 시) 클라이언트 측 요청 빈도 조절.
