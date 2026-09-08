package com.recruiterlens.ai.dto;

import java.util.List;

/**
 * Structured compatibility analysis returned by the AI service.
 */
public record AnalysisResponse(
        int matchScore,
        List<String> matchedSkills,
        List<String> missingSkills,
        List<String> experienceGaps,
        List<String> interviewQuestions,
        List<String> recommendations,
        String shortlistRecommendation,
        String shortlistReason
) {
    public AnalysisResponse {
        // Defensive defaults to guarantee non-null collections for the frontend
        if (matchedSkills == null) matchedSkills = List.of();
        if (missingSkills == null) missingSkills = List.of();
        if (experienceGaps == null) experienceGaps = List.of();
        if (interviewQuestions == null) interviewQuestions = List.of();
        if (recommendations == null) recommendations = List.of();
        if (shortlistRecommendation == null) shortlistRecommendation = "UNDETERMINED";
        if (shortlistReason == null) shortlistReason = "No reason provided.";
    }
}
