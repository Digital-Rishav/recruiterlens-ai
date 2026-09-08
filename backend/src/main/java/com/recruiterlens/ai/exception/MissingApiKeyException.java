package com.recruiterlens.ai.exception;

/**
 * Exception thrown when the Gemini API key is missing or not configured.
 */
public class MissingApiKeyException extends RuntimeException {

    public MissingApiKeyException() {
        super("Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable or configure it in application.yml.");
    }

    public MissingApiKeyException(String message) {
        super(message);
    }
}
