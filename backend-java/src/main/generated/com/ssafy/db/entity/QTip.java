package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTip is a Querydsl query type for Tip
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTip extends EntityPathBase<Tip> {

    private static final long serialVersionUID = -1219619431L;

    public static final QTip tip = new QTip("tip");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public QTip(String variable) {
        super(Tip.class, forVariable(variable));
    }

    public QTip(Path<? extends Tip> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTip(PathMetadata metadata) {
        super(Tip.class, metadata);
    }

}

