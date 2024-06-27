package com.itwill.igojoa.repository;

import java.util.List;

import com.itwill.igojoa.entity.PlaceVerified;

public interface PlaceVerifiedDao {
    void insert(PlaceVerified placeVerified);

    List<PlaceVerified> findAll();
}
