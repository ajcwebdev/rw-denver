## This project was built during an online meetup and uses a very old version of Redwood; it is intended for demonstrative and archival purposes only

[Jamstack Denver - 09/02/2020 - A First Look at RedwoodJS w/Anthony Campolo](https://www.youtube.com/watch?v=0krdC_D42IU)

### Run locally

```bash
git clone https://github.com/ajcwebdev/rw-denver.git
cd rw-denver
yarn install
yarn rw dev
```

## Code for Jamstack Denver meetup

### HomePage.js

```
yarn rw g page home /
```

```javascript
// web/src/pages/HomePage/HomePage.js

const HomePage = () => {
  return (
    <>
      <h1>RedwoodJS Jamstack Denver</h1>
      <p>This is the home page!</p>
    </>
  )
}

export default HomePage
```

### AboutPage.js

```
yarn rw g page about
```

```javascript
// web/src/pages/AboutPage/AboutPage.js

const AboutPage = () => {
  return (
    <>
      <h1>About</h1>
      <p>This page tells you about stuff!</p>
    </>
  )
}

export default AboutPage
```

### BlogLayout.js

```
yarn rw g layout blog
```

```javascript
// web/src/layouts/BlogLayout/BlogLayout.js

import { Link, routes } from '@redwoodjs/router'

const BlogLayout = ({ children }) => {
  return (
    <>
      <header>
        <h1>RedwoodJS Jamstack Denver</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
```

### Wrap HomePage content with BlogLayout

```javascript
// web/src/pages/HomePage/HomePage.js

import BlogLayout from 'src/layouts/BlogLayout'

const HomePage = () => {
  return (
    <>
      <BlogLayout>
        <p>This it the home page!</p>
      </BlogLayout>
    </>
  )
}

export default HomePage
```

### Wrap AboutPage content with BlogLayout

```javascript
// web/src/pages/AboutPage/AboutPage.js

import BlogLayout from 'src/layouts/BlogLayout'

const AboutPage = () => {
  return (
    <>
      <BlogLayout>
        <p>This page tells you about stuff!</p>
      </BlogLayout>
    </>
  )
}

export default AboutPage
```

### schema.prisma

```prisma
datasource DS {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = "native"
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  body      String
  createdAt DateTime @default(now())
}
```

### WARNING: CURRENT VERSIONS OF REDWOOD/PRISMA NO LONGER USE NEXT TWO COMMANDS, WE'RE LIVING IN THE FUTURE BABY

```
yarn rw db save
```

```
yarn rw db up
```

### Scaffold

```
yarn rw g scaffold post
```

### BlogPostsCell.js

```
yarn rw g cell BlogPosts
```

```javascript
// web/src/components/BlogPostsCell/BlogPostsCell.js

export const QUERY = gql`
  query BlogPostsQuery {
    posts {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>
export const Empty = () => <div>Empty</div>
export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ posts }) => {
  return JSON.stringify(posts)
}
```

### Import BlogPostsCell into HomePage

```javascript
// web/src/pages/HomePage/HomePage.js

import BlogLayout from 'src/layouts/BlogLayout'
import BlogPostsCell from 'src/components/BlogPostsCell'

const HomePage = () => {
  return (
    <>
      <BlogLayout>
        <p>This it the home page!</p>
        <BlogPostsCell />
      </BlogLayout>
    </>
  )
}

export default HomePage
```

### Update QUERY

```javascript
// web/src/components/BlogPostsCell/BlogPostsCell.js

export const QUERY = gql`
  query BlogPostsQuery {
    posts {
      id
      title
      body
      createdAt
    }
  }
`
```

### Update Success

```javascript
// web/src/components/BlogPostsCell/BlogPostsCell.js

export const Success = ({ posts }) => {
  return posts.map(post => (
    <article key={post.id}>
      <header>
        <h2>{post.title}</h2>
      </header>
      
      <div>
        <time>{post.createdAt}</time>
      </div>
      
      <p>{post.body}</p>
    </article>
  ))
}
```
