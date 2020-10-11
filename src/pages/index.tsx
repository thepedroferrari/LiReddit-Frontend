import { withUrqlClient } from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { Link } from "@chakra-ui/core";
import NextLink from 'next/link';

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>
        Create Post
        </Link>
      </NextLink>
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
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
