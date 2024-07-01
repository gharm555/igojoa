package com.itwill.igojoa.filter;

import java.io.IOException;
import java.net.URLEncoder;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AuthFilter extends HttpFilter implements Filter {
    public AuthFilter() {
    }

    public void destroy() {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        log.debug("doFilter()");
        HttpServletRequest req = (HttpServletRequest) request;
        HttpSession session = req.getSession();
        Object userId = session.getAttribute("userId");
        if (userId != null) {
            log.debug("로그인 상태");
            chain.doFilter(request, response);
        } else {
            log.debug("로그아웃 상태 ---> 로그인 페이지로 이동");

            String reqUrl = req.getRequestURL().toString();
            log.debug("요청 주소: {}", reqUrl);

            String qs = req.getQueryString();
            log.debug("쿼리 스트링: {}", qs);

            String target = "";
            if (qs == null) {
                target = URLEncoder.encode(reqUrl, "UTF-8");
            } else {
                target = URLEncoder.encode(reqUrl + "?" + qs, "UTF-8");
            }
            log.debug("target: {}", target);
            String redirectUrl = req.getContextPath() + "/user/loginRegister?target=" + target;
            ((HttpServletResponse) response).sendRedirect(redirectUrl);
        }
    }

    public void init(FilterConfig fConfig) throws ServletException {
    }
}