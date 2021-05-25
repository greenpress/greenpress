# Auth Roles & Permissions

## What can your users do?

### All users

All visitors in your blog are able to:
- **see public posts** 
- **comment anonymously**

### Authenticated users

Authenticated users can:
- **subscribe to your newslatter**
- **delete their own comments**

### Editors

Editors are able to:
- **create, update and delete posts and other contents** (editors can only mutate their own posts)
- **change a post's visibility** (of their own posts)
- **delete comments of commenters in their posts**

### Priviledged users

Priviledged users can get full access to the admin panel. 

They are able to:
- **change other user's roles**
- **mutate all posts and change their visibility** (of all editors)
- **create storages**
- **delete all comments on any post**

## What are the default ranks?

By default, there are three roles: `user`, `editor` and `admin`.

- A `user` role is the default role of every new user on your blog. They have every authenticated user's permissions.
- The `editor` and `admin` roles are editor roles, allowing them to post content on your blog.
- The `admin` role is also a priviledged role.

## What are other role patterns?

### Marketing Team

- A `user` role for every user on the website
- An `emloyee` role for every marketing employee. this rank has an editor role.
- A `manager` role will be a priviledged and editor role, given to marketing managers.
- The `admin` role will be given to head of market=ing

### Online Community

- The default role, `member`, will have an editor role.
- An `elite-member` role will have an editor role.
- A `co-admin` role will have an editor and priviledged roles, allowing them to premote and demote other users.
- The `admin` role will be given to the creator of the community.