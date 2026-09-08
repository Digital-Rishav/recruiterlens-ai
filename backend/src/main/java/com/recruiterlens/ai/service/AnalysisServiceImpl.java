package com.recruiterlens.ai.service;

import com.recruiterlens.ai.dto.AnalysisRequest;
import com.recruiterlens.ai.dto.AnalysisResponse;
import com.recruiterlens.ai.service.ai.AiAnalysisClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Default implementation of AnalysisService.
 * Coordinates input sanitation and delegates compatibility analysis to the AI client.
 */
@Service
public class AnalysisServiceImpl implements AnalysisService {

    private static final Logger log = LoggerFactory.getLogger(AnalysisServiceImpl.class);

    private final AiAnalysisClient aiAnalysisClient;

    public AnalysisServiceImpl(AiAnalysisClient aiAnalysisClient) {
        this.aiAnalysisClient = aiAnalysisClient;
    }

    @Override
    public AnalysisResponse analyze(AnalysisRequest request) {
        log.info("Initiating candidate compatibility analysis (resume length: {}, JD length: {})",
                request.resume().length(), request.jobDescription().length());

        String sanitizedResume = request.resume().trim();
        String sanitizedJd = request.jobDescription().trim();

        AnalysisResponse response = aiAnalysisClient.analyzeCompatibility(sanitizedResume, sanitizedJd);

        log.info("Analysis completed successfully: score={}, recommendation={}",
                response.matchScore(), response.shortlistRecommendation());

        return response;
    }

    @Override
    public boolean isAiConfigured() {
        return aiAnalysisClient.isConfigured();
    }
}
