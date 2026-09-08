package com.recruiterlens.ai.service.ai;

import com.recruiterlens.ai.dto.AnalysisResponse;

/**
 * Clean abstraction interface for AI compatibility analysis.
 * Decouples the business layer from the underlying AI model provider.
 */
public interface AiAnalysisClient {

    /**
     * Performs structured compatibility analysis between a resume and job description.
     *
     * @param resume         the candidate resume text
     * @param jobDescription the job description text
     * @return structured AnalysisResponse
     */
    AnalysisResponse analyzeCompatibility(String resume, String jobDescription);

    /**
     * Checks if the AI client is properly configured with an API key.
     *
     * @return true if ready to handle requests
     */
    boolean isConfigured();
}
