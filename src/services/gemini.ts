/**
 * Sends a message to the AI Election Assistant via the Express backend.
 * @param message The user's query
 * @returns {Promise<string>} The AI's response
 */
export const askElectionAssistant = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from AI assistant');
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('AI Assistant Error:', error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};
