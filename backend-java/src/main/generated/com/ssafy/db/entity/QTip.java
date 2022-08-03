package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTip is a Querydsl query type for Tip
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTip extends EntityPathBase<Tip> {

    private static final long serialVersionUID = -1219619431L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTip tip = new QTip("tip");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final QLanguage language;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public QTip(String variable) {
        this(Tip.class, forVariable(variable), INITS);
    }

    public QTip(Path<? extends Tip> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTip(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTip(PathMetadata metadata, PathInits inits) {
        this(Tip.class, metadata, inits);
    }

    public QTip(Class<? extends Tip> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.language = inits.isInitialized("language") ? new QLanguage(forProperty("language")) : null;
    }

}

