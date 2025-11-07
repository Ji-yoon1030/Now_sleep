import { useState } from "react";
import "./App.css";

function App() {
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [sleepResult, setSleepResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    // 입력값 검증
    if (!wakeUpTime) {
      setError("일어날 시간을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 백엔드 API 호출
      const response = await fetch(
        "http://10.50.99.93:8000/api/v1/sleep/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wake_time: wakeUpTime,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await response.json();
      setSleepResult(data);

      // 개발 중에는 콘솔에 로그 출력
      console.log("백엔드로 전송된 데이터:", { wake_time: wakeUpTime });
      console.log("백엔드 응답:", data);
    } catch (err) {
      console.error("API 호출 오류:", err);

      // 백엔드가 아직 준비되지 않았을 경우 임시 데이터 표시
      setError("백엔드 서버에 연결할 수 없습니다. (임시 데이터를 표시합니다)");

      // 임시 응답 데이터 (개발용)
      const mockData = calculateSleepQuality(wakeUpTime);
      setSleepResult(mockData);

      console.log("전송할 데이터:", { wake_time: wakeUpTime });
    } finally {
      setIsLoading(false);
    }
  };

  // 임시 수면 계산 함수 (백엔드가 준비되면 제거)
  const calculateSleepQuality = (wakeTime) => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const wakeUpMinutes = hours * 60 + minutes;

    // 수면 주기는 90분(1.5시간) 단위
    const sleepCycle = 90;

    const calculateBedtime = (cycles) => {
      const sleepMinutes = cycles * sleepCycle + 14; // 잠드는데 걸리는 시간 14분
      let bedtimeMinutes = wakeUpMinutes - sleepMinutes;

      if (bedtimeMinutes < 0) {
        bedtimeMinutes += 24 * 60;
      }

      const bedHours = Math.floor(bedtimeMinutes / 60);
      const bedMins = bedtimeMinutes % 60;

      return {
        sleep_time: `${String(bedHours).padStart(2, "0")}:${String(
          bedMins
        ).padStart(2, "0")}`,
        sleep_duration: `${(cycles * 1.5).toFixed(1)}시간`,
        cycles: cycles,
      };
    };

    // 수면 품질 점수 계산 (간단한 로직)
    const calculateQualityScore = (wakeHour) => {
      if (wakeHour >= 6 && wakeHour <= 8) {
        return { score: 95, grade: "A+", description: "최적의 기상 시간" };
      } else if (wakeHour >= 5 && wakeHour <= 9) {
        return { score: 85, grade: "A", description: "충분한 수면" };
      } else if (wakeHour >= 9 && wakeHour <= 11) {
        return { score: 75, grade: "B", description: "양호한 수면" };
      } else {
        return { score: 60, grade: "C", description: "개선이 필요" };
      }
    };

    const sleepTips = [
      "😴 충분히 주무셨나요? 수면의 질도 중요합니다.",
      "🌙 어두운 환경에서 자는 것이 멜라토닌 분비에 좋습니다.",
      "☕ 오후 2시 이후에는 카페인을 피하세요.",
    ];

    return {
      wake_time: wakeTime,
      perfect_condition: calculateBedtime(6),
      good_condition: calculateBedtime(5),
      minimum_condition: calculateBedtime(3),
      recommendation:
        "좋은 기상 시간입니다! 권장 시간에 취침하시면 상쾌한 아침을 맞이할 수 있어요. ☀️",
      quality_score: calculateQualityScore(hours),
      sleep_tips: sleepTips,
    };
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>💤 NowSleep</h1>
          <p className="subtitle">수면의 질 측정 및 최적 취침 시간 계산기</p>
        </header>

        <div className="input-section">
          <label htmlFor="wakeUpTime" className="label">
            일어날 시간을 입력하세요
          </label>
          <input
            type="time"
            id="wakeUpTime"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            className="time-input"
            placeholder="07:00"
          />

          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="calculate-button"
          >
            {isLoading ? "계산 중..." : "계산하기"}
          </button>

          {error && <div className="error-message">⚠️ {error}</div>}
        </div>

        {sleepResult && (
          <div className="result-section">
            <h2>추천 취침 시간</h2>
            <p className="result-message">{sleepResult.recommendation}</p>

            {/* {sleepResult.quality_score && (
              <div className="quality-score-box">
                <div className="score-badge">
                  <div className="score-number">
                    {sleepResult.quality_score.score}
                  </div>
                  <div className="score-grade">
                    {sleepResult.quality_score.grade}
                  </div>
                </div>
                <div className="score-description">
                  {sleepResult.quality_score.description}
                </div>
              </div>
            )} */}

            <div className="bedtimes-grid">
              <div className="bedtime-card perfect">
                <div className="condition-label">완벽한 컨디션</div>
                <div className="bedtime-time">
                  {sleepResult.perfect_condition.sleep_time}
                </div>
                <div className="bedtime-info">
                  <span className="duration">
                    {sleepResult.perfect_condition.sleep_duration}
                  </span>
                  <span className="cycles">
                    {sleepResult.perfect_condition.cycles}주기
                  </span>
                </div>
              </div>

              <div className="bedtime-card good">
                <div className="condition-label">좋은 컨디션</div>
                <div className="bedtime-time">
                  {sleepResult.good_condition.sleep_time}
                </div>
                <div className="bedtime-info">
                  <span className="duration">
                    {sleepResult.good_condition.sleep_duration}
                  </span>
                  <span className="cycles">
                    {sleepResult.good_condition.cycles}주기
                  </span>
                </div>
              </div>

              <div className="bedtime-card minimum">
                <div className="condition-label">최소 컨디션</div>
                <div className="bedtime-time">
                  {sleepResult.minimum_condition.sleep_time}
                </div>
                <div className="bedtime-info">
                  <span className="duration">
                    {sleepResult.minimum_condition.sleep_duration}
                  </span>
                  <span className="cycles">
                    {sleepResult.minimum_condition.cycles}주기
                  </span>
                </div>
              </div>
            </div>

            {sleepResult.sleep_tips && sleepResult.sleep_tips.length > 0 && (
              <div className="sleep-tips-box">
                <h3 className="tips-title">💡 수면 꿀팁</h3>
                <ul className="tips-list">
                  {sleepResult.sleep_tips.map((tip, index) => (
                    <li key={index} className="tip-item">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="info-box">
              <p>💡 수면 주기 사이에 깨면 피곤함을 느낄 수 있습니다.</p>
              <p>수면 주기가 끝나는 시점에 일어나는 것이 가장 좋습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
