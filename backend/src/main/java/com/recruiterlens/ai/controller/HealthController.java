package com.recruiterlens.ai.controller;

import com.recruiterlens.ai.dto.HealthResponse;
import com.recruiterlens.ai.service.AnalysisService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Health check controller for monitoring service readiness and AI configuration.
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    private final AnalysisService analysisService;

    public HealthController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    /**
     * GET /api/health
     * Returns server status, current timestamp, and Gemini readiness.
     */
    @GetMapping("/health")
    public ResponseEntity<HealthResponse> getHealth() {
        boolean configured = analysisService.isAiConfigured();
        return ResponseEntity.ok(HealthResponse.up(configured));
    }
}
