insert into
    authority
    value
    ('ROLE_USER'), ('ROLE_ADMIN'), ('ROLE_VIP');
insert into
    country
    values
    (0, now(), 'KR'), (0, now(), 'US'), (0,now(),'AU'),(0, now(), 'JP'), (0, now(), 'FR'), (0, now(), 'CN');
insert into
    language
    values
    (0, now(), 'KOR'),(0, now(), 'ENG'), (0,now(), 'JPN'), (0, now(), 'CHN');
# insert into
#     user
#     value
#     (0, true, 1000, null, null, false, 'admin', 'MALE', 'admin', 'admin','admin', '$2a$10$bCE.fZaerqsxjhyWfG6ctOKz6uQz1ZWed9q6Rdx5zCsv4z.Q8gD5e', now(), 1);
insert into
    user (id, activated, age, avatar_src, black_expire_date, black_listny, email, gender, mobile_number, name, nickname, pw, reg_date, country_id)
    value
    (0, true, 1000, null, null, false, 'admin', 'MALE', 'admin', 'admin','admin', '$2a$10$bCE.fZaerqsxjhyWfG6ctOKz6uQz1ZWed9q6Rdx5zCsv4z.Q8gD5e', now(), 1);
insert into
    user_auth
    value
    (1,'ROLE_ADMIN'), (1,'ROLE_USER'), (1,'ROLE_VIP');
