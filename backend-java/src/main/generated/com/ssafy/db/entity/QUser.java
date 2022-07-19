package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 846542477L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DatePath<java.time.LocalDate> birthday = createDate("birthday", java.time.LocalDate.class);

    public final DatePath<java.time.LocalDate> blackExpireDate = createDate("blackExpireDate", java.time.LocalDate.class);

    public final StringPath blackListNY = createString("blackListNY");

    public final QCountry country;

    public final StringPath email = createString("email");

    public final EnumPath<GENDER> gender = createEnum("gender", GENDER.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageSrc = createString("imageSrc");

    public final StringPath mobile_number = createString("mobile_number");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final StringPath pw = createString("pw");

    public final EnumPath<USER_ROLE> role = createEnum("role", USER_ROLE.class);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.country = inits.isInitialized("country") ? new QCountry(forProperty("country")) : null;
    }

}

