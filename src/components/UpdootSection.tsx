import { Flex, IconButton } from '@chakra-ui/core';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  id: PostSnippetFragment['id']
  points: PostSnippetFragment['points']
}

const UpdootSection = ({ id, points }: UpdootSectionProps) => {

  const [{ fetching }, vote] = useVoteMutation();

  const upVote = async () => await vote({ postId: id, value: 1 })
  const downVote = async () => await vote({ postId: id, value: -1 })

  return (
    <Flex direction="column" justify="center" align="center" mr={5}>
      <IconButton
        icon="chevron-up"
        aria-label="updoot post"
        onClick={upVote}
        isLoading={fetching}
      />
      {points}
      <IconButton
        icon="chevron-down"
        aria-label="downvote post"
        onClick={downVote}
        isLoading={fetching}
      />
    </Flex>
  )
}

export default UpdootSection
