const API_URL = 'http://localhost:3003/oxgame/api'

export const makeAIMove = async (board) => {
  try {
    const response = await fetch(`${API_URL}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ board })
    })
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    const data = await response.json()
    return data.move
  } catch (error) {
    console.error('Error making AI move:', error)
    throw error
  }
}