import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { Loader } from 'src/modules/ui/loader';
import { PostItem } from 'src/modules/posts/components/PostItem';
import { useGetOnePost } from 'src/modules/posts/hooks/crud';
import { Breadcrumbs } from 'src/modules/ui/breadcrumbs';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading } = useGetOnePost(id || '');

  const breadcrumbs = useMemo(
    () => [
      {
        title: 'Posts',
        to: '/posts',
      },
      {
        title: post?.title,
      },
    ],
    [post],
  );

  return (
    <Box px={5} py={3}>
      <Breadcrumbs options={breadcrumbs} />
      <Loader isLoading={isLoading}>{post && <PostItem post={post} />}</Loader>
    </Box>
  );
};
