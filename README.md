Code for Jamstack Denver meetup

```
yarn create redwood-app ./redwood-denver
```

```
cd redwood-denver
yarn rw dev
```

```
yarn rw g page home /
```

```javascript
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

```
yarn rw g page about
```

```javascript
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

```
yarn rw g layout blog
```

```javascript
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

```javascript
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

```javascript
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

```
yarn rw db save
```

```
yarn rw db up
```

```
yarn rw g scaffold post
```

```
yarn rw g cell BlogPosts
```

```javascript
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

```javascript
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

```javascript
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ posts }) => {
  return JSON.stringify(posts)
}
```

```javascript
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

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
