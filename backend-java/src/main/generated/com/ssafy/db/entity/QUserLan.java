package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserLan is a Querydsl query type for UserLan
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserLan extends EntityPathBase<UserLan> {

    private static final long serialVersionUID = -700953652L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserLan userLan = new QUserLan("userLan");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Integer> fluent = createNumber("fluent", Integer.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QLanguage language;

    public final NumberPath<Integer> priority = createNumber("priority", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public final QUser user;

    public QUserLan(String variable) {
        this(UserLan.class, forVariable(variable), INITS);
    }

    public QUserLan(Path<? extends UserLan> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserLan(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserLan(PathMetadata metadata, PathInits inits) {
        this(UserLan.class, metadata, inits);
    }

    public QUserLan(Class<? extends UserLan> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.language = inits.isInitialized("language") ? new QLanguage(forProperty("language")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

