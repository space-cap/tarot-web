# Development Roadmap (개발 로드맵)

## Phase 0: 초기 설정 (Initial Setup)
- [x] 프로젝트 디렉토리 및 Git 초기화 (`vite create`, `git init`)
- [x] PRD 작성 (`docs/PRD.md`)
- [x] 기술 문서 작성 (`Architecture.md`, `DataStructure.md`)
- [x] 기본 패키지 설치 (`react-router-dom`, `framer-motion`, `lucide-react`)
- [x] 디렉토리 구조 생성 (`src/components`, `src/pages`, `src/assets`, `src/data`)

## Phase 1: 기본 UI/UX 구현 (Foundation)
- [x] **디자인 시스템 구축**: 컬러 팔레트, 타이포그래피, 공통 버튼/레이아웃 컴포넌트 CSS 정의.
- [x] **라우터 설정**: `react-router-dom` 활용하여 페이지 라우팅 구성.
- [x] **인트로 페이지(Intro Page)**:
    - [x] 타이틀 로고 애니메이션
    - [x] '시작하기' 버튼 구현
    - [x] 배경 효과 구현 (Particle & 3D Cards)

## Phase 2: 핵심 기능 개발 (Core Features)
- [x] **데이터 관리**: `tarotData.js` 데이터 작성 및 로드 로직 구현.
- [x] **카드 덱 & 셔플 (Deck & Shuffle)**:
    - [x] CSS 3D Transform을 활용한 카드 뒷면 렌더링.
    - [x] 셔플 애니메이션 구현 (Framer Motion).
- [x] **질문 입력 단계 (New)**:
    - [x] 사용자 고민 입력 및 추천 질문(Chips) 기능.
- [x] **카드 선택 로직**:
    - [x] 사용자 인터랙션(클릭) 이벤트 핸들링.
    - [x] 3장 선택 제한 로직.

## Phase 3: 결과 및 해석 (Result & Logic)
- [x] **결과 페이지(Result Page)**:
    - [x] 선택된 카드 뒤집기(Flip) 연출.
    - [x] 사용자가 입력한 질문 표시.
    - [x] 카드별 상세 설명 및 운세 텍스트 표시 UI.
    - [x] **스토리텔링 라벨**: 현재/조언/미래 3단 구성 적용.
- [x] **공유 기능**:
    - [x] Web Share API 연동.

## Phase 4: 고도화 및 배포 (Polish & Deploy)
- [x] **이미지 에셋 적용**: 실제 고퀄리티 타로 카드 이미지 적용 (Major Arcana).
- [x] **사운드 효과**: 배경음악(Gymnopedie No 1) 및 On/Off 기능 추가.
- [ ] **반응형 테스트**: 모바일/태블릿/데스크탑 뷰포트 점검 (진행 중).
- [ ] **배포**: Vercel/Netlify 연동 및 배포.
