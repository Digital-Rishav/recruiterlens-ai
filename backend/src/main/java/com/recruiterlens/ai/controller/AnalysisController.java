package com.recruiterlens.ai.controller;

import com.recruiterlens.ai.dto.AnalysisRequest;
import com.recruiterlens.ai.dto.AnalysisResponse;
import com.recruiterlens.ai.service.AnalysisService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller exposing candidate analysis endpoint.
 */
@RestController
@RequestMapping("/api")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    /**
     * POST /api/analyze
     * Analyzes candidate-job compatibility and returns structured evaluation metrics.
     */
    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeCandidate(@Valid @RequestBody AnalysisRequest request) {
        AnalysisResponse response = analysisService.analyze(request);
        return ResponseEntity.ok(response);
    }
}
