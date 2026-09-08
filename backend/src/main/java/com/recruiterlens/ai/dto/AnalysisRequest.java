package com.recruiterlens.ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Request payload containing the candidate resume and target job description.
 */
public record AnalysisRequest(
        @NotBlank(message = "Resume must not be blank")
        @Size(min = 20, message = "Resume should contain at least 20 characters for an accurate analysis")
        String resume,

        @NotBlank(message = "Job description must not be blank")
        @Size(min = 20, message = "Job description should contain at least 20 characters for an accurate analysis")
        String jobDescription
) {
}
