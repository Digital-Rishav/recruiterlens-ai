package com.recruiterlens.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recruiterlens.ai.controller.AnalysisController;
import com.recruiterlens.ai.controller.HealthController;
import com.recruiterlens.ai.dto.AnalysisRequest;
import com.recruiterlens.ai.dto.AnalysisResponse;
import com.recruiterlens.ai.service.AnalysisService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({AnalysisController.class, HealthController.class})
class AnalysisControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

//     @MockBean
    private AnalysisService analysisService;

    @Test
    @DisplayName("GET /api/health should return UP status")
    void testHealthEndpoint() throws Exception {
        when(analysisService.isAiConfigured()).thenReturn(true);

        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.geminiConfigured").value(true));
    }

    @Test
    @DisplayName("POST /api/analyze with empty fields should return 400 Bad Request")
    void testAnalyzeValidationFailure() throws Exception {
        AnalysisRequest invalidRequest = new AnalysisRequest("", "");

        mockMvc.perform(post("/api/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }

    @Test
    @DisplayName("POST /api/analyze with valid request should return 200 and AnalysisResponse")
    void testAnalyzeSuccess() throws Exception {
        AnalysisRequest validRequest = new AnalysisRequest(
                "Experienced Senior Java Engineer with 7 years of Spring Boot and cloud expertise.",
                "Seeking Senior Java Engineer with Spring Boot and AWS experience."
        );

        AnalysisResponse mockResponse = new AnalysisResponse(
                88,
                List.of("Java", "Spring Boot", "AWS"),
                List.of("Kubernetes"),
                List.of("No direct Kubernetes experience"),
                List.of("Describe a Spring Boot microservice design you implemented."),
                List.of("Proceed to technical interview stage."),
                "SHORTLIST",
                "Strong candidate with matching core stack."
        );

        when(analysisService.analyze(any())).thenReturn(mockResponse);

        mockMvc.perform(post("/api/analyze")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.matchScore").value(88))
                .andExpect(jsonPath("$.shortlistRecommendation").value("SHORTLIST"))
                .andExpect(jsonPath("$.matchedSkills[0]").value("Java"));
    }
}
