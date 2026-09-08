package com.recruiterlens.ai.dto;

import java.time.Instant;

/**
 * Health check response payload.
 */
public record HealthResponse(
        String status,
        Instant timestamp,
        String service,
        boolean geminiConfigured
) {
    public static HealthResponse up(boolean geminiConfigured) {
        return new HealthResponse("UP", Instant.now(), "RecruiterLens AI Backend", geminiConfigured);
    }
}
