package com.ssafy.db.entity;

public enum Route {
    EVENT, LIKE, REVIEW, EXTENTION;

    public static Route value(String name){
        if(name.equalsIgnoreCase("event")) return EVENT;
        else if(name.equalsIgnoreCase("like")) return LIKE;
        else if(name.equalsIgnoreCase("review")) return REVIEW;
        else if(name.equalsIgnoreCase("extention")) return EXTENTION;
        throw new IllegalArgumentException("잘못된 하트 경로입니다.");
    }
}

