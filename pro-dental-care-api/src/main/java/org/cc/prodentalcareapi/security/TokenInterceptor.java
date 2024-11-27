package org.cc.prodentalcareapi.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.reflect.Method;
import java.util.regex.Pattern;

@Component
public class TokenInterceptor implements HandlerInterceptor {

	private static final Pattern bearerTokenPattern = Pattern.compile("^Bearer \\w+$");

	public TokenInterceptor() {}

	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
		if (handler instanceof HandlerMethod) {
			HandlerMethod handlerMethod = (HandlerMethod) handler;
			Method method = handlerMethod.getMethod();
			if (!method.isAnnotationPresent(RequireToken.class)) {
				return true;
			}
		}

		String authHeader = request.getHeader("Authorization");

		if (ObjectUtils.isEmpty(authHeader) || !authHeader.startsWith("Bearer ") || !bearerTokenPattern.matcher(authHeader).matches()) {
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return false;
		}

		return true;
	}

}
