package com.icodeap.ecommerce.backend.infrastructure.jwt;

import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;

public class Constants {
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String TOKEN_BEARER_PREFIX = "Bearer";
    public static final String SUPER_SECRET_KEY = "BasBkbVcXzDsHJkgaDfCuGfDsXzPOiu8G4D5fh69jbvcSa123DfgtTRH7890PLkhgCdSxZ34Fcxf&789";
    public static final long TOKEN_EXPIRATION_TIME = 1500000; //15 minutos
    public static Key getSignaedKey(String secreKey){
        byte [] keyBytes = secreKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
