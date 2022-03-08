-- Adminer 4.8.1 PostgreSQL 14.2 (Debian 14.2-1.pgdg110+1) dump

DROP TABLE IF EXISTS "post";
DROP SEQUENCE IF EXISTS post_id_seq;
CREATE SEQUENCE post_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."post" (
    "id" integer DEFAULT nextval('post_id_seq') NOT NULL,
    "title" character varying(255),
    "content" text,
    "created_at" timestamp,
    "updated_at" timestamp,
    "author_id" integer,
    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "post_comment";
DROP SEQUENCE IF EXISTS post_comment_id_seq;
CREATE SEQUENCE post_comment_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."post_comment" (
    "id" integer DEFAULT nextval('post_comment_id_seq') NOT NULL,
    "post_id" integer,
    "author_id" integer,
    "title" character varying(255),
    "content" text,
    "created_at" timestamp,
    "updated_at" timestamp,
    CONSTRAINT "post_comment_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "post_tag";
CREATE TABLE "public"."post_tag" (
    "post_id" integer,
    "tag_id" integer
) WITH (oids = false);


DROP TABLE IF EXISTS "tag";
DROP SEQUENCE IF EXISTS tag_id_seq;
CREATE SEQUENCE tag_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."tag" (
    "id" integer DEFAULT nextval('tag_id_seq') NOT NULL,
    "title" character varying(50),
    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "user";
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "first_name" character varying(50),
    "last_name" character varying(50),
    "email" character varying(50),
    "password" character varying(50),
    "username" character varying(50),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "user_avatar";
DROP SEQUENCE IF EXISTS user_avatar_id_seq;
CREATE SEQUENCE user_avatar_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user_avatar" (
    "id" integer DEFAULT nextval('user_avatar_id_seq') NOT NULL,
    "user_id" integer,
    "url" character varying(255),
    CONSTRAINT "user_avatar_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."post" ADD CONSTRAINT "post_authorid_fkey" FOREIGN KEY (author_id) REFERENCES "user"(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."post_comment" ADD CONSTRAINT "post_comment_author_id_fkey" FOREIGN KEY (author_id) REFERENCES "user"(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."post_comment" ADD CONSTRAINT "post_comment_post_id_fkey" FOREIGN KEY (post_id) REFERENCES post(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."post_tag" ADD CONSTRAINT "post_tag_post_id_fkey" FOREIGN KEY (post_id) REFERENCES post(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."post_tag" ADD CONSTRAINT "post_tag_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tag(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."user_avatar" ADD CONSTRAINT "user_avatar_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) NOT DEFERRABLE;

-- 2022-03-08 15:29:55.320062+00