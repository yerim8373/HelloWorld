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

    public final NumberPath<Integer> age = createNumber("age", Integer.class);

    public final StringPath avatarSrc = createString("avatarSrc");

    public final DatePath<java.time.LocalDate> blackExpireDate = createDate("blackExpireDate", java.time.LocalDate.class);

    public final BooleanPath blackListNY = createBoolean("blackListNY");

    public final QCountry country;

    public final StringPath email = createString("email");

    public final EnumPath<Gender> gender = createEnum("gender", Gender.class);

    public final ListPath<HeartHistory, QHeartHistory> heartHistoryList = this.<HeartHistory, QHeartHistory>createList("heartHistoryList", HeartHistory.class, QHeartHistory.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath mobileNumber = createString("mobileNumber");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final ListPath<Notification, QNotification> notificationList = this.<Notification, QNotification>createList("notificationList", Notification.class, QNotification.class, PathInits.DIRECT2);

    public final ListPath<Post, QPost> postList = this.<Post, QPost>createList("postList", Post.class, QPost.class, PathInits.DIRECT2);

    public final StringPath pw = createString("pw");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> regDate = _super.regDate;

    public final ListPath<Report, QReport> reportList = this.<Report, QReport>createList("reportList", Report.class, QReport.class, PathInits.DIRECT2);

    public final ListPath<Review, QReview> reviewList = this.<Review, QReview>createList("reviewList", Review.class, QReview.class, PathInits.DIRECT2);

    public final EnumPath<UserRole> role = createEnum("role", UserRole.class);

    public final ListPath<Runtime, QRuntime> runtimeList = this.<Runtime, QRuntime>createList("runtimeList", Runtime.class, QRuntime.class, PathInits.DIRECT2);

    public final ListPath<Subscribe, QSubscribe> subscribeList = this.<Subscribe, QSubscribe>createList("subscribeList", Subscribe.class, QSubscribe.class, PathInits.DIRECT2);

    public final ListPath<UserLan, QUserLan> userLanList = this.<UserLan, QUserLan>createList("userLanList", UserLan.class, QUserLan.class, PathInits.DIRECT2);

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

