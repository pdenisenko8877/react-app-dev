import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { Loader } from 'src/modules/ui/loader';
import { Breadcrumbs } from 'src/modules/ui/breadcrumbs';
import { PostForm } from 'src/modules/posts/components/PostForm';
import { useGetOnePost } from 'src/modules/posts/hooks/crud';

export const PostFormPage = () => {
  const { id: postId } = useParams<{ id: string }>();
  const isEdit = Boolean(postId);

  const { data: post, isLoading } = useGetOnePost(postId || '');

  const pageTitle = isEdit ? 'Edit Post' : 'Create Post';

  const breadcrumbs = useMemo(
    () => [
      {
        title: 'Posts',
        to: '/posts',
      },
      ...(isEdit
        ? [
            {
              title: post?.title,
              to: `/posts/${postId}`,
            },
          ]
        : []),
      {
        title: pageTitle,
      },
    ],
    [isEdit, pageTitle, post?.title, postId],
  );

  return (
    <Box px={5} py={3}>
      <Breadcrumbs options={breadcrumbs} />
      <Loader isLoading={isLoading} />
      <Typography variant="h3" mb={2}>
        {pageTitle}
      </Typography>
      <PostForm post={post!} postId={postId!} isEdit={isEdit} />
    </Box>
  );
};
