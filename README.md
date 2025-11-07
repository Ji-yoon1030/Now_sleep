# NowSleep 💤

수면의 질을 측정하고 최적의 취침 시간을 계산해주는 웹 애플리케이션입니다.

## 주요 기능

- 일어날 시간을 입력하면 최적의 취침 시간을 계산
- 수면 주기(90분 단위)를 고려한 추천 시간 제공
- 백엔드 API와 통신하여 수면 데이터 저장 및 조회

## 시작하기

### 의존성 설치

```bash
npm install
```

### 환경 변수 설정 (선택사항)

프로젝트는 기본적으로 배포된 백엔드 API를 사용합니다. 다른 API URL을 사용하려면 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 백엔드 API URL (Vercel 배포)
VITE_API_URL=https://sleep-icv23b6fl-casings-projects-2809687a.vercel.app/api/v1

# 또는 로컬 개발 시
# VITE_API_URL=http://localhost:8000/api/v1
```

**기본 설정**: 환경 변수가 없어도 프로젝트는 정상적으로 작동합니다. 배포된 Vercel API를 자동으로 사용합니다.

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 프로젝트 구조

```
nowsleep/
├── src/
│   ├── main.jsx          # React 앱 엔트리 포인트
│   ├── App.jsx           # 메인 App 컴포넌트 (수면 계산 UI)
│   ├── App.css           # 앱 스타일
│   ├── index.css         # 전역 스타일
│   └── api/
│       └── sleepApi.js   # 백엔드 API 통신 유틸리티
├── public/
├── package.json
├── vite.config.js
└── index.html
```

## API 엔드포인트

현재 백엔드는 Vercel에 배포되어 있습니다:
- **Base URL**: `https://sleep-icv23b6fl-casings-projects-2809687a.vercel.app/api/v1`

### POST `/api/v1/sleep/recommend`

수면 시간을 계산합니다.

**요청:**
```json
{
  "wake_time": "07:00"
}
```

**응답:**
```json
{
  "wake_time": "07:00",
  "perfect_condition": {
    "sleep_time": "21:45",
    "sleep_duration": "9.2시간",
    "cycles": 6
  },
  "good_condition": {
    "sleep_time": "23:15",
    "sleep_duration": "7.8시간",
    "cycles": 5
  },
  "minimum_condition": {
    "sleep_time": "02:15",
    "sleep_duration": "4.8시간",
    "cycles": 3
  },
  "recommendation": "좋은 기상 시간입니다! 권장 시간에 취침하시면 상쾌한 아침을 맞이할 수 있어요. ☀️",
  "quality_score": {
    "score": 85,
    "grade": "A",
    "description": "충분한 수면"
  },
  "sleep_tips": [
    "😴 충분히 주무셨나요? 수면의 질도 중요합니다.",
    "🌙 어두운 환경에서 자는 것이 멜라토닌 분비에 좋습니다.",
    "☕ 오후 2시 이후에는 카페인을 피하세요."
  ]
}
```

## 기술 스택

- React 19
- Vite
- JavaScript (JSX)
- CSS3
- Fetch API

## 개발 노트

- 백엔드 서버가 준비되지 않은 경우, 임시 데이터가 표시됩니다.
- 수면 주기는 90분(1.5시간) 단위로 계산됩니다.
- 잠드는 데 걸리는 시간은 평균 14분으로 설정되어 있습니다.

## 라이선스

MIT
