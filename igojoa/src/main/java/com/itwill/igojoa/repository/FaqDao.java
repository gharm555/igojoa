package com.itwill.igojoa.repository;

import java.util.List;

import com.itwill.igojoa.entity.Faq;

public interface FaqDao {
    List<Faq> selectAll();
}
