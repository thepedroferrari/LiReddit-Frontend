import { withUrqlClient } from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import {NavBar} from "../components/NavBar";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
    <div>Hello World</div>
      {!data
        ? <p>loading...</p>
        : data.posts.map(post => (
          <article key={post.id}>
            <header>
              <h1>{post.title}</h1>
              <p>
                Created at: <time>{post.createdAt}</time>
              </p>
              <p>
                Updated at: <time>{post.updatedAt}</time>
              </p>
            </header>
          </article>
        ))
      }
  </>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
