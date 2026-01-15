# 개발 가이드 (Development Guide)

이 문서는 타로2026 프로젝트의 개발 환경 설정, 코딩 컨벤션, 그리고 협업 규칙을 정의합니다.

## 1. 개발 환경 설정 (Setup)

### 1.1 필수 요구사항 (Prerequisites)
*   **Node.js**: v18.0.0 이상 (LTS 권장)
*   **Package Manager**: npm (Node.js 설치 시 포함)
*   **Editor**: VS Code (권장 확장 프로그램: ESLint, Prettier, Tailwind CSS IntelliSense)

### 1.2 설치 및 실행 (Installation & Run)
```bash
# 저장소 클론
git clone https://github.com/space-cap/tarot-web.git
cd tarot-web

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 2. 프로젝트 구조 (Project Structure)
```text
src/
├── assets/          # 이미지, 폰트 등 정적 리소스
├── components/      # 재사용 가능한 UI 컴포넌트
│   ├── common/      # 공통 컴포넌트 (Button, Header 등)
│   └── feature/     # 기능별 컴포넌트 (Deck, ResultCard 등)
├── hooks/           # 커스텀 훅 (useTarot, useScroll 등)
├── pages/           # 라우트 페이지 컴포넌트
├── services/        # API 호출 및 비즈니스 로직
├── styles/          # 전역 스타일 및 디자인 토큰
├── utils/           # 유틸리티 함수
└── App.jsx
```

## 3. 코딩 컨벤션 (Coding Conventions)

### 3.1 파일 네이밍 (Naming)
*   **컴포넌트 파일**: PascalCase (예: `TarotCard.jsx`)
*   **일반 JS/TS 파일**: camelCase (예: `tarotUtils.js`)
*   **상수/설정 파일**: SCREAMING_SNAKE_CASE (예: `API_CONFIG.js`) 또는 camelCase
*   **폴더명**: 소문자, 케밥 케이스 권장 (예: `tarot-card`), 단 컴포넌트 폴더는 PascalCase 허용.

### 3.2 컴포넌트 작성 (React)
*   함수형 컴포넌트(Functional Component)와 Hooks 사용을 원칙으로 합니다.
*   `prop-types` 또는 TypeScript Interface를 통해 Props 타입을 명시합니다.
*   컴포넌트 내부 로직은 가능한 Custom Hook으로 분리하여 가독성을 높입니다.

### 3.3 스타일링 (Styling)
*   **Module CSS**: 컴포넌트별 스타일 격리를 위해 `.module.css` 사용을 권장합니다.
*   또는 **Styled-components** / **Tailwind CSS** 사용 시 팀 내 합의된 규칙을 따릅니다.

## 4. 깃 워크플로우 (Git Workflow)

### 4.1 브랜치 전략 (Branch Strategy)
*   `main`: 배포 가능한 안정 버전.
*   `develop`: 개발 중인 최신 버전 (선택 사항).
*   `feature/기능명`: 새로운 기능 개발 (예: `feature/card-shuffle`).
*   `fix/버그명`: 버그 수정 (예: `fix/typo-correction`).

### 4.2 커밋 메시지 (Commit Message)
[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.
*   `feat`: 새로운 기능 추가
*   `fix`: 버그 수정
*   `docs`: 문서 수정
*   `style`: 코드 포맷팅, 세미콜론 누락 등 (로직 변경 없음)
*   `refactor`: 코드 리팩토링
*   `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

**예시**:
```text
feat: 카드 셔플 애니메이션 구현
fix: 결과 페이지 이미지 로딩 오류 수정
docs: 개발 가이드 문서 작성
```

## 5. 배포 (Deployment)
*   Vercel 또는 Netlify를 통한 자동 배포를 권장합니다.
*   `main` 브랜치에 푸시되면 자동으로 프로덕션 배포가 트리거되도록 설정합니다.
