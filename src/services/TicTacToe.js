const API_URL = 'http://localhost:3003/oxgame/api';

export const makeAIMove = async (board) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // ตั้ง timeout 5 วินาที

  try {
    const response = await fetch(`${API_URL}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ board }),
      signal: controller.signal, // ใช้ signal สำหรับ timeout
    });

    clearTimeout(timeoutId); // ล้าง timeout ถ้าสำเร็จ

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || typeof data.move !== 'number') {
      throw new Error('Invalid AI response');
    }

    return data.move
  } catch (error) {
    console.error('Error making AI move:', error.message || error);
    return -1; 
  }
}