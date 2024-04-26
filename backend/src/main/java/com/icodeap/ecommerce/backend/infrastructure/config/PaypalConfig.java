package com.icodeap.ecommerce.backend.infrastructure.config;

import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaypalConfig {
    @Value("${paypal.client.id}")
    private String clienteId;
    @Value("${paypal.client.secret}")
    private String clienteSecret;
    @Value("${paypal.mode}")
    private String mode;

    @Bean
    public APIContext apiContext(){
        return new APIContext(clienteId,clienteSecret,mode);
    }
}

