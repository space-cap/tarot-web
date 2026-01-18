<div align="center">

# 🔮 Tarot 2026 (타로2026)
### AI 기반 인터랙티브 운세 리더 (AI-Powered Interactive Destiny Reader)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT_3.5-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)

**타로2026**은 신비로운 타로의 전통과 OpenAI의 최신 GPT 모델을 결합한 현대적인 인터랙티브 웹 애플리케이션입니다. 아름다운 모션 그래픽과 함께 "그랜드 마스터" 레벨의 깊이 있는 AI 해석을 경험해 보세요.

[주요 기능](#-주요-기능-features) | [시작하기](#-시작하기-getting-started) | [기술 스택](#-기술-스택-tech-stack) | [스크린샷](#-스크린샷-screenshots)

</div>

---

## ✨ 주요 기능 (Features)

### 🃏 인터랙티브 리딩 경험
- **현실적인 셔플 & 드로우**: `Framer Motion`을 활용하여 실제 카드를 섞고 뽑는 듯한 부드러운 애니메이션과 터치감을 구현했습니다.
- **3카드 스프레드**: 과거/현재/미래 (또는 상황/조언/결과)의 클래식한 레이아웃으로 인생의 해답을 제시합니다.

### 🧠 그랜드 마스터 AI 오라클
- **페르소나 기반 AI**: 50년 경력의 "타로 그랜드 마스터"가 따뜻하고 권위 있는 어조로 상담해 드립니다.
- **심층 서사 (Narrative)**: 단순한 키워드 나열이 아닌, 선택된 카드들을 하나의 이야기로 엮어내는 **마크다운 에세이** 형식의 답변을 제공합니다.
- **운세 스코어**: 금전, 애정, 건강, 학업/사업운을 백분율 그래프로 시각화하여 보여줍니다.
- **투명한 디버깅**: AI에게 전송된 **프롬프트(Prompt)**와 AI가 답변한 **Raw JSON** 데이터를 화면에서 바로 확인할 수 있습니다.

### 📖 신비의 서 (가이드)
- **인터랙티브 역사**: 15세기 이탈리아부터 현대 AI 타로까지의 여정을 탐험하는 타임라인.
- **카드의 구조**: 메이저 아르카나와 마이너 아르카나의 의미를 시각 자료와 함께 학습.
- **리딩 가이드**: 타로를 대하는 마음가짐과 초보자를 위한 해석법 가이드.

---

## 🚀 시작하기 (Getting Started)

로컬 환경에서 프로젝트를 실행하려면 다음 단계를 따라주세요.

### 사전 요구 사항 (Prerequisites)
- Node.js (v18 이상)
- npm 또는 yarn
- OpenAI API 키

### 설치 및 실행

1. **저장소 클론 (Clone)**
   ```bash
   git clone https://github.com/yourusername/tarot-web.git
   cd tarot-web
   ```

2. **의존성 설치 (Install)**
   ```bash
   npm install
   ```

3. **개발 서버 실행 (Run)**
   ```bash
   npm run dev
   ```

4. **브라우저 접속**
   `http://localhost:5173` 주소로 접속합니다.

5. **API 키 입력**
   첫 AI 리딩 요청 시, OpenAI API 키를 입력하는 모달이 나타납니다. 키는 서버로 전송되지 않고 브라우저의 `localStorage`에 안전하게 저장됩니다.

---

## 🛠 기술 스택 (Tech Stack)

| 카테고리 | 기술 | 설명 |
|----------|------------|-------------|
| **Framework** | [React](https://react.dev/) | 컴포넌트 기반 UI 라이브러리 |
| **Build Tool** | [Vite](https://vitejs.dev/) | 빠르고 가벼운 프론트엔드 빌드 툴 |
| **Styling** | [CSS Modules](https://github.com/css-modules/css-modules) | 모듈화된 CSS 스타일링 |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | 복잡한 애니메이션 및 제스처 구현 |
| **AI** | [OpenAI API](https://platform.openai.com/docs/api-reference) | '그랜드 마스터' 페르소나 구현 (gpt-3.5-turbo) |
| **Icons** | [Lucide React](https://lucide.dev/) | 깔끔하고 일관된 오픈소스 아이콘 |

---

## 📂 프로젝트 구조 (Project Structure)

```
src/
├── assets/          # 이미지 리소스 (카드, 배경 등)
├── components/      # 재사용 가능한 UI 컴포넌트
│   ├── common/      # 헤더, 모달 등 공통 컴포넌트
│   └── feature/     # 가이드 섹션, 탭 로직 등 기능별 컴포넌트
├── data/            # 정적 타로 데이터 (78장 정보)
├── pages/           # 라우트 페이지 (인트로, 결과, 가이드)
├── services/        # OpenAI API 연동 로직
├── styles/          # 전역 및 컴포넌트 CSS
└── App.jsx          # 메인 라우터 설정
```

---

## 📜 라이선스 (License)

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

---

<div align="center">
  <sub>Built with ❤️ by the Tarot 2026 Team</sub>
</div>
