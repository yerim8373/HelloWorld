package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCredit is a Querydsl query type for Credit
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCredit extends EntityPathBase<Credit> {

    private static final long serialVersionUID = 1262243131L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCredit credit = new QCredit("credit");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public final QSubscribe subscribe;

    public final QUser user;

    public QCredit(String variable) {
        this(Credit.class, forVariable(variable), INITS);
    }

    public QCredit(Path<? extends Credit> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCredit(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCredit(PathMetadata metadata, PathInits inits) {
        this(Credit.class, metadata, inits);
    }

    public QCredit(Class<? extends Credit> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.subscribe = inits.isInitialized("subscribe") ? new QSubscribe(forProperty("subscribe")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

