# masterpiece_project

## User Story

- Signup: As an anon I can sign up in the platform so that I can start communicate with a specialists in autism disorders and other parent of an autisitc child.
- Login: As a user I can login to the platform so that I can show previous conversations and saved articles, researches, videos. add new posts, answer other users questions or connect with a specialist.
- Logout: As a user I can logout from the platform so no one else can use it.
- Therapies & Services: As a user I can find where is the nearest center can help me diagnose, treat, educate my child
- Add Post : As a user I can add post that may help another users or ask for help.
- Edit Post : As a user I can edit my previous post.
- Delete Post : As a user I can delete my previous post.
- Update Post : As a user I can edit my previous post.
- Edit User As a user I can edit my profile.
- Private chat: As a user I can chat privately with a specialist or any other users.
- Delete Messages As a user I can delete my private messages.
- Admin: As an admin I can check registration of the specialist, whether have an accredited certification in any field that related to child and parents health, educate, communicate, therapy and other services.
- Admin Delete: As an admin I can delete any user or specialist or any post.

---

### Installing Dependencies

#### Node js

Node.js
You can install it here: [Node js docs](https://nodejs.org/en/)

#### NPM Dependencies

You can install dependencies by running in you terminal:

```
npm i
```

#### Libraries Used

- [React](https://reactjs.org/)

- [firebase](https://www.npmjs.com/package/firebase)

- [axios](https://www.npmjs.com/package/axios)

- [redux](https://www.npmjs.com/package/redux)

- [react-redux](https://www.npmjs.com/package/react-redux)

- [redux-devtools-extension](https://www.npmjs.com/package/redux-devtools-extension)

- [react-icons](https://react-icons.github.io/react-icons/)

---

## Running the server

To run the server, in you terminal:

```
npm start
```

## Router Routes

| Path                  | Component         | Permissions | Behavior                                              |
| --------------------- | ----------------- | ----------- | ----------------------------------------------------- |
| `/`                   | Home              | public      | Home page                                             |
| `/register`           | Register          | public      | Register page                                         |
| `/verifyAccount/:id`  | VerifyAccount     | public      | Verify Account page                                   |
| `/reearch`            | Research          | public      | List of research                                      |
| `/reearch/:id`        | Research          | public      | Details of a research                                 |
| `/events`             | Events            | public      | List of events                                        |
| `/event/:id`          | Events            | public      | Details of an event                                   |
| `/center`             | Center            | public      | List of centers                                       |
| `/center/:id`         | Center            | public      | Details of a center                                   |
| `/login`              | Login             | user only   | Login page after register                             |
| `/profile/:id`        | Profile           | user only   | Profile page of the user                              |
| `/resetPassword/:id`  | ResetPassword     | user only   | Reset Password if user forget it or want to change it |
| `/posts`              | Posts             | user only   | Shows all posts in site                               |
| `/post/:id`           | Post              | user only   | Shows a post, comments of the post in site            |
| `/dashboard/accounts` | DashboardAccounts | admin only  | Shows all users accounts                              |
| `/dashboard/posts`    | DashboardPosts    | admin only  | Shows all posts in site                               |
| `/dashboard/research` | DashboardResearch | admin only  | Shows all research in site                            |
| `/dashboard/event`    | DashboardEvents   | admin only  | Shows all events in site                              |

## Components

- Home
- Register
- VerifyAccount
- Research
- Events
- Center
- Login
- Profile
- ResetPassword
- Posts
- Post
- DashboardAccounts
- DashboardPosts
- DashboardResearch
- DashboardEvents

---

# UML Diagram:

![umld](https://github.com/MP-Project-Ghadier/client/blob/main/Untitled%20Diagram.drawio.png?raw=true)

---

# Links

- [trello](https://trello.com/b/tkoa9kQQ/mp-project-ghadier)
- [deploy](https://id.heroku.com/login)
- [presentation](www.nothing.com)
- [server_Repo](https://github.com/MP-Project-Ghadier/server)
