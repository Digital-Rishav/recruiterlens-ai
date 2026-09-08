package com.recruiterlens.ai.service;

import com.recruiterlens.ai.dto.AnalysisRequest;
import com.recruiterlens.ai.dto.AnalysisResponse;

/**
 * Service interface for candidate evaluation operations.
 */
public interface AnalysisService {

    /**
     * Analyzes candidate-job compatibility.
     *
     * @param request the validated request containing resume and JD
     * @return structured AnalysisResponse
     */
    AnalysisResponse analyze(AnalysisRequest request);

    /**
     * Checks if the underlying AI service is operational.
     */
    boolean isAiConfigured();
}
