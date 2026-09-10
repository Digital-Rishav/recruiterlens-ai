package com.recruiterlens.ai.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



/**
 * Enables Cross-Origin Resource Sharing (CORS) for frontend clients.
 * Uses a CorsFilter bean to ensure all preflight and direct requests are permitted.
 */
@Configuration 
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "https://recruiterlens-ai-frontend.vercel.app"
                )
                .allowedMethods(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS",
                        "HEAD"
                )
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }
}