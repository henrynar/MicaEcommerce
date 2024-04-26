package com.icodeap.ecommerce.backend.infrastructure.jwt;

import com.icodeap.ecommerce.backend.infrastructure.service.CustomUserDetailService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import static com.icodeap.ecommerce.backend.infrastructure.jwt.Constants.*;

public class JWTValidate {
    public static boolean tokenExists(HttpServletRequest request, HttpServletResponse response){
        //validar qu el token venga en la peticion
        String header = request.getHeader(HEADER_AUTHORIZATION);

        if(header == null || !header.startsWith(TOKEN_BEARER_PREFIX))
            return false;
        return  true;
    }
    //validar qu el token sea correcto
    public static Claims JWTValid(HttpServletRequest request){
        String jwtToken = request.getHeader(HEADER_AUTHORIZATION).replace(TOKEN_BEARER_PREFIX, "");
        return Jwts.parserBuilder()
                .setSigningKey(getSignaedKey(SUPER_SECRET_KEY))
                .build()
                .parseClaimsJws(jwtToken).getBody();

    }
    //auntenticar al usuario en el contexto de spring
    public static void setAuthentication(Claims claims, CustomUserDetailService customUserDetailService){
        UserDetails userDetails = customUserDetailService.loadUserByUsername(claims.getSubject());
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
