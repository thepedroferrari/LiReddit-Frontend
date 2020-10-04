import { withUrqlClient } from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
  const [] = usePostsQuery();
  return (
    <div>Hello World</div>
  )
}

export default withUrqlClient(createUrqlClient)(Index)
