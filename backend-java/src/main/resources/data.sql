insert into
    authority
    value
    ('ROLE_USER'), ('ROLE_ADMIN'), ('ROLE_VIP');
insert into
    country
    values
    (0, now(), 'KOREA'), (0, now(), 'ENGLAND'), (0,now(),'AUSTRAILIA'),(0, now(), 'JAPAN'), (0, now(), 'FRENCH'), (0, now(), 'CHINA');
insert into
    language
    values
    (0, now(), 'KOR'),(0, now(), 'ENG'), (0,now(), 'JPN'), (0, now(), 'CHN');
insert into
    user
    value
    (0, true, 1000, null, null, null, 'admin', 'MALE', null, 'admin', 'admin', 'admin', '$2a$10$bCE.fZaerqsxjhyWfG6ctOKz6uQz1ZWed9q6Rdx5zCsv4z.Q8gD5e', now(), 1);
insert into
    user_auth
    value
    (1,'ROLE_ADMIN'), (1,'ROLE_USER'), (1,'ROLE_VIP');