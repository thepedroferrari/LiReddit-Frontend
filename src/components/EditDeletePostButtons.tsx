import { IconButton, Link } from '@chakra-ui/core';
import NextLink from 'next/link';

import { useDeletePostMutation, useMeQuery } from '_/generated/graphql';

interface Props {
  authorId: number;
  id: number;
}

const EditDeletePostButtons = ({ authorId, id }: Props) => {
  const [, deletePost] = useDeletePostMutation();
  const handleDelete = () => deletePost({ id })
  const [{ data: sayMyName }] = useMeQuery();

  if (sayMyName?.me?.id !== authorId) return null;

  return (
    <>
      <NextLink
        href="/post/edit/[id]"
        as={`/post/edit/${id}`}
      >
        <IconButton
          as={Link}
          icon="edit"
          aria-label="Edit Post"
        />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="Delete Post"
        onClick={handleDelete}
      />
    </>
  )
}

export default EditDeletePostButtons
