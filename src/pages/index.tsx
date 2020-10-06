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
        : data.posts.map(p => (
          <article key={p.id}>
            <header>
              <h1>{p.title}</h1>
              <p>
                Created at: <time>{p.createdAt}</time>
              </p>
              <p>
                Updated at: <time>{p.updatedAt}</time>
              </p>
            </header>
          </article>
        ))
      }
  </>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
