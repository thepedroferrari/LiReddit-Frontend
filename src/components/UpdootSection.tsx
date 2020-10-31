import { Flex, IconButton } from '@chakra-ui/core';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  id: PostSnippetFragment['id']
  points: PostSnippetFragment['points']
  voteStatus: PostSnippetFragment['voteStatus']
}

const UpdootSection = ({ id, points, voteStatus }: UpdootSectionProps) => {

  const [{ fetching }, vote] = useVoteMutation();

  const upVote = async () => {
    console.log({ voteStatus })
    if (voteStatus === 1) return
    await vote({ postId: id, value: 1 })
  }
  const downVote = async () => {
    console.log({voteStatus})
    if (voteStatus === -1) return
    await vote({ postId: id, value: -1 })
  }

  return (
    <Flex direction="column" justify="center" align="center" mr={5}>
      <IconButton
        icon="chevron-up"
        aria-label="updoot post"
        onClick={upVote}
        isLoading={fetching}
        variantColor={voteStatus === 1 ? "green" : undefined}
      />
      {points}
      <IconButton
        variantColor={voteStatus === -1 ? "red" : undefined}
        icon="chevron-down"
        aria-label="downvote post"
        onClick={downVote}
        isLoading={fetching}
      />
    </Flex>
  )
}

export default UpdootSection
