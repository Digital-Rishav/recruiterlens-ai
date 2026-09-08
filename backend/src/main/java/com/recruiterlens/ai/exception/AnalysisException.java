package com.recruiterlens.ai.exception;

/**
 * Exception thrown when candidate analysis fails during processing or parsing.
 */
public class AnalysisException extends RuntimeException {

    public AnalysisException(String message) {
        super(message);
    }

    public AnalysisException(String message, Throwable cause) {
        super(message, cause);
    }
}
