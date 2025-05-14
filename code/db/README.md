This is DBML Code. It can be edited and viewed on [dbdiagram.io](https://dbdiagram.io/d)

```
// Use DBML to define your database structure
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
  created_at timestamp
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer [not null]
  status varchar
  file string
  created_at timestamp
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


Ref: likes.user_id < users.id

Ref: likes.post_id < posts.id

Ref: posts.id < comments.post_id

Ref user_posts: posts.user_id > users.id // many-to-one

Ref: users.id < follows.following_user_id

Ref: users.id < follows.followed_user_id

```
