package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHeartHistory is a Querydsl query type for HeartHistory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QHeartHistory extends EntityPathBase<HeartHistory> {

    private static final long serialVersionUID = 1499740720L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHeartHistory heartHistory = new QHeartHistory("heartHistory");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final NumberPath<Integer> cnt = createNumber("cnt", Integer.class);

    public final QUser fromUser;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath name = createString("name");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public final EnumPath<Route> route = createEnum("route", Route.class);

    public final QUser toUser;

    public QHeartHistory(String variable) {
        this(HeartHistory.class, forVariable(variable), INITS);
    }

    public QHeartHistory(Path<? extends HeartHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHeartHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHeartHistory(PathMetadata metadata, PathInits inits) {
        this(HeartHistory.class, metadata, inits);
    }

    public QHeartHistory(Class<? extends HeartHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fromUser = inits.isInitialized("fromUser") ? new QUser(forProperty("fromUser"), inits.get("fromUser")) : null;
        this.toUser = inits.isInitialized("toUser") ? new QUser(forProperty("toUser"), inits.get("toUser")) : null;
    }

}

