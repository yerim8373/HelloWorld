package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRuntime is a Querydsl query type for Runtime
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRuntime extends EntityPathBase<Runtime> {

    private static final long serialVersionUID = 997160406L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRuntime runtime = new QRuntime("runtime");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DateTimePath<java.time.LocalDateTime> endDate = createDateTime("endDate", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public final DateTimePath<java.time.LocalDateTime> startDate = createDateTime("startDate", java.time.LocalDateTime.class);

    public final QUser user;

    public QRuntime(String variable) {
        this(Runtime.class, forVariable(variable), INITS);
    }

    public QRuntime(Path<? extends Runtime> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRuntime(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRuntime(PathMetadata metadata, PathInits inits) {
        this(Runtime.class, metadata, inits);
    }

    public QRuntime(Class<? extends Runtime> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}

