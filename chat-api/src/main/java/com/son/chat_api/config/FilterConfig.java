package com.son.chat_api.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.son.chat_api.filters.JwtFilter;

@Configuration
public class FilterConfig {

    @Bean
    public JwtFilter jwtFilterBean(JwtConfig jwtConfig) {
        return new JwtFilter(jwtConfig);
    }

    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter(JwtFilter jwtFilter) {
        FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(jwtFilter);
        registrationBean.addUrlPatterns("/api/v1/*"); // apply to chat endpoints
        return registrationBean;
    }
}