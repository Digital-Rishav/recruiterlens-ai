package com.recruiterlens.ai.dto;

import java.time.Instant;
import java.util.List;

/**
 * Standardized error payload returned for validation or server failures.
 */
public record ErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        List<String> details
) {
    public static ErrorResponse of(int status, String error, String message, List<String> details) {
        return new ErrorResponse(Instant.now(), status, error, message, details != null ? details : List.of());
    }

    public static ErrorResponse of(int status, String error, String message) {
        return of(status, error, message, List.of());
    }
}
