import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import EditDeletePostButtons from '_/components/EditDeletePostButtons';
import { Layout } from '_/components/Layout';
import UpdootSection from '_/components/UpdootSection';
import { usePostsQuery } from '_/generated/graphql';
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });


  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
          <Stack spacing={8}>
            {data!.posts.posts.map((p) =>
              !p ? null : (
                <Flex
                  key={p.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  align="center"
                  justify="center"
                >
                  <UpdootSection
                    points={p.points}
                    id={p.id}
                    voteStatus={p.voteStatus}
                  />
                  <Box flex={1}>
                    <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>Posted by {p.author.username}</Text>
                    <Text flex={1} mt={4}>
                      {p.excerpt}
                    </Text>
                  </Box>
                  <Flex flexDirection="column" h="100px" justifyContent="space-between">
                    <EditDeletePostButtons id={p.id} authorId={p.author.id} />
                  </Flex>
                </Flex>
              ))}
          </Stack>
        )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
