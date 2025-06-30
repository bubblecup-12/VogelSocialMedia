This is DBML Code. It can be edited and viewed on [dbdiagram.io](https://dbdiagram.io/d)

```
// Docs: https://dbml.dbdiagram.io/docs

Table follows {
  following_user_id integer
  followed_user_id integer
  created_at timestamp
}

Table users {
  id integer [primary key]
  username varchar [unique]
  role varchar
  email string
  password string
  profile_picture integer
  bio string
  created_at timestamp
}

Table posts {
  id integer [primary key]
  description varchar
  user_id integer [not null]
  status varchar
  created_at timestamp
}
Table media {
  id integer [primary key]
  path string
  created_at timestamp
}

Table post_media {
  media_id integer
  post_id integer
}

Table comments {
  id integer [primary key]
  post_id integer
  content string
  created_at timestamp
}
Table likes {
  id integer [primary key]
  post_id integer
  user_id integer
  created_at timestamp

}
Table tags {
  id integer [primary key]
  name varchar [unique]
}

Table post_tags {
  post_id integer
  tag_id integer
}

Ref: post_tags.post_id > posts.id
Ref: post_tags.tag_id > tags.id

Ref: post_media.post_id < posts.id
Ref: post_media.media_id < media.id
Ref: users.profile_picture < media.id

Ref: likes.user_id < users.id

Ref: likes.post_id < posts.id

Ref: posts.id < comments.post_id

Ref user_posts: posts.user_id > users.id // many-to-one

Ref: users.id < follows.following_user_id

Ref: users.id < follows.followed_user_id


```
