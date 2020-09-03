import BlogLayout from 'src/layouts/BlogLayout'
import BlogPostsCell from 'src/components/BlogPostsCell'

const HomePage = () => {
  return (
    <>
      <BlogLayout>
        <p>This is the home page!</p>
        <BlogPostsCell />
      </BlogLayout>
    </>
  )
}

export default HomePage
