/**
 * API service for communicating with the RecruiterLens Spring Boot backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://recruiterlens-ai-backend.onrender.com/';

/**
 * Checks backend health status and Gemini configuration.
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Health check returned status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('Backend health check failed:', error.message);
    return {
      status: 'DOWN',
      service: 'RecruiterLens AI Backend',
      geminiConfigured: false,
      error: error.message,
    };
  }
}

/**
 * Analyzes resume and job description compatibility.
 *
 * @param {Object} payload
 * @param {string} payload.resume
 * @param {string} payload.jobDescription
 * @returns {Promise<Object>} AnalysisResponse
 */
export async function analyzeCandidate({ resume, jobDescription }) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      resume: resume.trim(),
      jobDescription: jobDescription.trim(),
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.message ||
      (data?.details && data.details.join(', ')) ||
      `Server error (${response.status}): ${response.statusText}`;
    
    const error = new Error(errorMessage);
    error.status = response.status;
    error.details = data?.details || [];
    error.title = data?.error || 'Analysis Error';
    throw error;
  }

  return data;
}
