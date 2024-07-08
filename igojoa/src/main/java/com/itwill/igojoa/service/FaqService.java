package com.itwill.igojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.itwill.igojoa.entity.Faq;
import com.itwill.igojoa.repository.FaqDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FaqService {
    private final FaqDao faqDao;

    public List<Faq> getAllFaqs() {
        return faqDao.selectAll();
    }
}
