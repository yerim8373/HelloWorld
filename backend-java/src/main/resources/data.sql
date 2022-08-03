insert into
    authority
    value
    ('ROLE_USER'), ('ROLE_ADMIN'), ('ROLE_VIP');
insert into
    user
    value
    (0, true, 1000, null, null, null, 'admin', 'MALE', null, 'admin', 'admin', 'admin', '$2a$10$bCE.fZaerqsxjhyWfG6ctOKz6uQz1ZWed9q6Rdx5zCsv4z.Q8gD5e', now(), null);
insert into
    user_auth
    value
    (1,'ROLE_ADMIN');
insert into
    user_auth
    value
    (1,'ROLE_USER');
insert into
    user_auth
    value
    (1,'ROLE_VIP');
insert into
    country
    values
    (0, now(), 'KOR'), (0, now(), 'ENG'), (0, now(), 'JPN'), (0, now(), 'FRN'), (0, now(), 'CHN');
insert into
    language
    values
    (0, now(), 'KOR'),(0, now(), 'ENG');