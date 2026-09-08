package com.recruiterlens.ai.service.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recruiterlens.ai.config.GeminiProperties;
import com.recruiterlens.ai.dto.AnalysisResponse;
import com.recruiterlens.ai.exception.AnalysisException;
import com.recruiterlens.ai.exception.MissingApiKeyException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

// import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * Gemini implementation of AiAnalysisClient.
 * Interacts with Google Gemini REST API using Spring's RestClient.
 */
@Service
public class GeminiAiClient implements AiAnalysisClient {

    private static final Logger log = LoggerFactory.getLogger(GeminiAiClient.class);

    private final GeminiProperties properties;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.mock-mode:false}")
    private boolean mockMode;

    public GeminiAiClient(GeminiProperties properties, ObjectMapper objectMapper) {
        this.properties = properties;
        this.objectMapper = objectMapper;
        this.restClient = RestClient.builder()
                .baseUrl(properties.getBaseUrl())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Override
    public boolean isConfigured() {
        return mockMode || properties.hasApiKey();
    }

    @Override
    public AnalysisResponse analyzeCompatibility(String resume, String jobDescription) {
        // If mock mode is explicitly enabled and no API key is provided, return simulated analysis
        if (mockMode && !properties.hasApiKey()) {
            log.info("Mock mode active: generating simulated candidate analysis");
            return generateMockAnalysis(resume, jobDescription);
        }

        if (!properties.hasApiKey()) {
            throw new MissingApiKeyException();
        }

        String prompt = buildPrompt(resume, jobDescription);
        String requestUrl = String.format("/models/%s:generateContent", properties.getModel());

        Map<String, Object> requestPayload = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                ),
                "generationConfig", Map.of(
                        "responseMimeType", "application/json",
                        "temperature", 0.2
                )
        );

        try {
            log.info("Sending candidate analysis request to Gemini model: {}", properties.getModel());

            String rawResponse = restClient.post()
                    .uri(requestUrl)
                    .header("x-goog-api-key", properties.getApiKey())
                    .body(requestPayload)
                    .retrieve()
                    .body(String.class);

            if (rawResponse == null || rawResponse.isBlank()) {
                throw new AnalysisException("Received empty response from Gemini API");
            }

            return parseGeminiResponse(rawResponse);

        } catch (MissingApiKeyException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Failed to invoke Gemini API: {}", ex.getMessage(), ex);
            throw new AnalysisException("AI analysis service error: " + ex.getMessage(), ex);
        }
    }

    /**
     * Extracts and deserializes the structured JSON from Gemini's response wrapper.
     */
    private AnalysisResponse parseGeminiResponse(String responseBody) {
        try {
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode candidates = root.path("candidates");

            if (candidates.isMissingNode() || !candidates.isArray() || candidates.isEmpty()) {
                throw new AnalysisException("No candidates returned from Gemini API");
            }

            JsonNode textNode = candidates.get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            if (textNode.isMissingNode()) {
                throw new AnalysisException("Gemini response missing text part");
            }

            String contentText = textNode.asText().trim();

            // Sanitize potential markdown code fences if present
            if (contentText.startsWith("```json")) {
                contentText = contentText.substring(7);
            } else if (contentText.startsWith("```")) {
                contentText = contentText.substring(3);
            }
            if (contentText.endsWith("```")) {
                contentText = contentText.substring(0, contentText.length() - 3);
            }
            contentText = contentText.trim();

            return objectMapper.readValue(contentText, AnalysisResponse.class);

        } catch (Exception ex) {
            log.error("Failed to parse Gemini JSON output: {}", ex.getMessage(), ex);
            throw new AnalysisException("Failed to parse structured JSON from AI output: " + ex.getMessage(), ex);
        }
    }

    /**
     * Constructs a system prompt with strict schema requirements for deterministic JSON.
     */
    private String buildPrompt(String resume, String jobDescription) {
        return """
                You are an expert technical recruiter and talent evaluation specialist.
                Analyze the candidate's resume against the target job description.
                Evaluate technical qualifications, relevant experience, seniority level, and skill overlap.

                CANDIDATE RESUME:
                \"\"\"
                %s
                \"\"\"

                TARGET JOB DESCRIPTION:
                \"\"\"
                %s
                \"\"\"

                You MUST return ONLY a strictly valid JSON object conforming to this exact schema (no markdown, no backticks, no commentary):
                {
                  "matchScore": <integer between 0 and 100 representing overall suitability>,
                  "matchedSkills": [<array of string skills present in both resume and job description>],
                  "missingSkills": [<array of string skills required/preferred by job description but missing in resume>],
                  "experienceGaps": [<array of specific gaps in experience, seniority, domain, or tooling>],
                  "interviewQuestions": [<array of 3 to 5 targeted technical or behavioral interview questions to probe gaps>],
                  "recommendations": [<array of actionable recommendations for hiring team and candidate>],
                  "shortlistRecommendation": "<one of: 'SHORTLIST', 'CONSIDER', 'REJECT'>",
                  "shortlistReason": "<concise executive summary explaining why the candidate was shortlisted, considered, or rejected>"
                }
                """.formatted(resume, jobDescription);
    }

    /**
     * Provides realistic dynamic analysis when mock mode is enabled.
     * Accurately reflects strong matches, moderate matches, and high mismatches.
     */
    private AnalysisResponse generateMockAnalysis(String resume, String jobDescription) {
        String lowerResume = resume.toLowerCase();
        String lowerJd = jobDescription.toLowerCase();

        // 1. High Mismatch Scenario (e.g. Frontend specialist vs Database/DevOps/Reliability JD)
        boolean isFrontendHeavy = (lowerResume.contains("react") || lowerResume.contains("frontend") || lowerResume.contains("css") || lowerResume.contains("tailwind")) 
                && !lowerResume.contains("spring boot");
        boolean isDevOpsOrDbJd = lowerJd.contains("database") || lowerJd.contains("devops") || lowerJd.contains("reliability") || lowerJd.contains("linux kernel");

        if (isFrontendHeavy && isDevOpsOrDbJd) {
            return new AnalysisResponse(
                    24,
                    List.of("Git", "Vite / Build Tooling"),
                    List.of("PostgreSQL Administration", "Cassandra", "Linux Kernel Tuning", "Terraform", "Kubernetes Cluster Management", "On-Call Incident Response"),
                    List.of(
                            "Severe domain mismatch: candidate's primary expertise is client-side web UI, whereas the role demands enterprise database administration and systems reliability.",
                            "Zero demonstrated commercial experience with Linux kernel tuning or infrastructure-as-code (Terraform).",
                            "No background in database cluster disaster recovery or distributed storage engines."
                    ),
                    List.of(
                            "What motivated your application for an infrastructure & database role given your extensive frontend specialization?",
                            "How familiar are you with Linux systems troubleshooting and network socket diagnostics?",
                            "Have you ever operated production databases under high write-throughput conditions?"
                    ),
                    List.of(
                            "Do not advance for this Database / Reliability engineering role.",
                            "Candidate has strong UI/Frontend credentials; redirect profile to Senior Frontend or Design Systems openings."
                    ),
                    "REJECT",
                    "Critical domain mismatch. The candidate's 6-year background is focused entirely on frontend user interfaces (React, Next.js, CSS), while the role requires deep database administration, Linux kernel tuning, and cluster reliability."
            );
        }

        // 2. Moderate Match / Mid-Level Candidate Scenario (e.g., Jordan Lee vs Senior JD)
        boolean isJuniorOrMid = lowerResume.contains("junior") || lowerResume.contains("3 years") || lowerResume.contains("jordan lee") || lowerResume.contains("django");
        boolean isSeniorJd = lowerJd.contains("senior") || lowerJd.contains("5+ years") || lowerJd.contains("lead");

        if (isJuniorOrMid && isSeniorJd) {
            return new AnalysisResponse(
                    63,
                    List.of("REST APIs", "PostgreSQL", "Docker (Basics)", "Java (Foundational)", "Git"),
                    List.of("5+ Years Enterprise Experience", "Spring Boot (Advanced)", "Apache Kafka Event Streaming", "Kubernetes Orchestration", "Architectural Leadership"),
                    List.of(
                            "Seniority gap: candidate brings ~3 years of professional experience, whereas the role specifies 5+ years of enterprise engineering.",
                            "Limited exposure to enterprise event streaming (Kafka/RabbitMQ) and distributed transactions.",
                            "Java/Spring Boot experience is auxiliary (1 year) rather than candidate's primary production stack."
                    ),
                    List.of(
                            "Can you walk us through the most complex Spring Boot endpoint you rewrote from Django?",
                            "How would you approach scaling an API when database read/write latency starts spiking under heavy load?",
                            "What experience do you have with event-driven architectures versus synchronous REST calls?"
                    ),
                    List.of(
                            "Candidate is likely overextended for a Senior/Lead title, but demonstrates strong growth potential.",
                            "Consider evaluating candidate for a Mid-Level Backend Engineer role instead.",
                            "Conduct a focused live coding session to verify core Java object-oriented design depth."
                    ),
                    "CONSIDER",
                    "Promising foundational backend skill set and clean coding habits, but candidate possesses ~3 years of experience and limited event-driven distributed system exposure compared to the 5+ year senior requirements."
            );
        }

        // 3. Strong Match Scenario (e.g. Alex Rivera or solid backend alignment)
        return new AnalysisResponse(
                88,
                List.of("Java 21", "Spring Boot", "REST APIs", "Microservices", "PostgreSQL", "Docker", "AWS (ECS/RDS)", "Redis Caching"),
                List.of("Kubernetes Orchestration", "Apache Kafka Event Streaming"),
                List.of(
                        "Container orchestration experience is currently AWS ECS-centric; no demonstrated production Kubernetes cluster management.",
                        "Event-driven streaming (Kafka) is not explicitly highlighted in recent commercial projects."
                ),
                List.of(
                        "How have you maintained distributed transactional consistency across independent Spring Boot microservices?",
                        "Walk me through how you would migrate your AWS ECS container workloads to a Kubernetes cluster.",
                        "What cache invalidation strategies have you implemented using Redis and PostgreSQL?"
                ),
                List.of(
                        "Strong candidate for immediate advancement to the technical round.",
                        "Probe Kubernetes container orchestration readiness during system architecture discussions.",
                        "Candidate's migration and latency optimization background brings immediate high value."
                ),
                "SHORTLIST",
                "Exceptional technical alignment with the core backend requirements (Java/Spring Boot, PostgreSQL, AWS). Missing tools (Kubernetes/Kafka) are adjacent and easily bridgeable given the candidate's deep container and microservice background."
        );
    }
}
