// 백엔드 API 통신을 위한 유틸리티 파일

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * 수면 시간 계산 API 호출
 * @param {string} wakeTime - 일어날 시간 (HH:MM 형식)
 * @returns {Promise<Object>} 수면 계산 결과
 */
export const calculateSleepQuality = async (wakeTime) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate-sleep`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wake_time: wakeTime,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('API 호출 실패:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * 수면 데이터 저장 API 호출
 * @param {Object} sleepData - 저장할 수면 데이터
 * @returns {Promise<Object>} 저장 결과
 */
export const saveSleepData = async (sleepData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sleep-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sleepData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('데이터 저장 실패:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * 사용자의 수면 히스토리 조회
 * @returns {Promise<Object>} 수면 히스토리 데이터
 */
export const getSleepHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sleep-history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('히스토리 조회 실패:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

