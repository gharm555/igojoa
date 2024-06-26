package com.itwill.igojoa.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/application-context.xml" })
public class JdbcTest {

    @Test
    public void testMySQLConnection() throws SQLException {

        DriverManager.registerDriver(new com.mysql.cj.jdbc.Driver());
        log.info("등록성공");

        final String url = "jdbc:mysql://igojoa.c3gagc46czkf.ap-northeast-2.rds.amazonaws.com:3306/igojoa";
        final String Users = "igojoa";
        final String password = "igojoa";

        Connection conn = DriverManager.getConnection(url, Users, password);
        Assertions.assertNotNull(conn);
        log.info("연결성공");

        conn.close();
        log.info("연결해제");
    }
}
