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

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

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

백엔드 서버는 다음 엔드포인트를 제공해야 합니다:

### POST `/api/calculate-sleep`

수면 시간을 계산합니다.

**요청:**
```json
{
  "wakeUpTime": "07:00",
  "timestamp": "2025-11-08T00:00:00.000Z"
}
```

**응답:**
```json
{
  "wakeUpTime": "07:00",
  "recommendedBedtimes": [
    {
      "cycles": 5,
      "hours": 7.5,
      "bedtime": "23:16",
      "quality": "최상"
    }
  ],
  "message": "수면 주기는 90분 단위입니다."
}
```

### POST `/api/sleep-data`

수면 데이터를 저장합니다.

### GET `/api/sleep-history`

사용자의 수면 히스토리를 조회합니다.

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
