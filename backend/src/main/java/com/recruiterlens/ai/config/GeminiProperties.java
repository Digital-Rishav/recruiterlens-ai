package com.recruiterlens.ai.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Configuration properties for Google Gemini API integration.
 * Injected automatically from application.yml / environment variables.
 */
@ConfigurationProperties(prefix = "gemini")
public class GeminiProperties {

    /**
     * Gemini API key. Passed via GEMINI_API_KEY environment variable.
     */
    private String apiKey = "";

    /**
     * Model name to use for analysis. Defaults to gemini-2.5-flash.
     */
    private String model = "gemini-3.6-flash";

    /**
     * Base URL for Google Generative Language API.
     */
    private String baseUrl = "https://generativelanguage.googleapis.com/v1beta";

    /**
     * HTTP timeout in seconds for Gemini API requests.
     */
    private int timeoutSeconds = 60;

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey != null ? apiKey.trim() : "";
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model != null && !model.isBlank() ? model : "gemini-3.6-flash";
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl != null && !baseUrl.isBlank() ? baseUrl : "https://generativelanguage.googleapis.com/v1beta";
    }

    public int getTimeoutSeconds() {
        return timeoutSeconds;
    }

    public void setTimeoutSeconds(int timeoutSeconds) {
        this.timeoutSeconds = timeoutSeconds > 0 ? timeoutSeconds : 60;
    }

    public boolean hasApiKey() {
        return apiKey != null && !apiKey.isBlank();
    }
}
