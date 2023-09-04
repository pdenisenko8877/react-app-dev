import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Stack } from '@mui/material';

import { Text } from 'src/modules/ui/forms';

import { Post } from '../interfaces';
import { useCreatePost, useUpdatePost } from '../hooks/crud';

export interface PostFormProps {
  post: Post;
  postId: string;
  isEdit?: boolean;
}

export const PostForm = ({ post, postId, isEdit }: PostFormProps) => {
  const navigate = useNavigate();

  const { mutateAsync: mutateAsyncCreate } = useCreatePost();
  const { mutateAsync: mutateAsyncUpdate } = useUpdatePost(postId || '');

  const handleFormSubmit = useCallback(
    async (data: Post) => {
      try {
        if (isEdit) {
          await mutateAsyncUpdate({
            ...data,
          });
          navigate(`/posts/${postId}`);
        } else {
          await mutateAsyncCreate({
            ...data,
          });
          navigate('/posts');
        }
      } catch (e) {
        console.log(e);
      }
    },
    [isEdit, mutateAsyncCreate, mutateAsyncUpdate, navigate, postId],
  );

  const schema = useMemo(
    () =>
      yup.object({
        title: yup.string().required('Required field'),
        body: yup.string().required('Required field'),
      }),
    [],
  );

  const { handleSubmit, control } = useForm<Post>({
    defaultValues: {
      title: post?.title ?? '',
      body: post?.body ?? '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box py={2}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate autoComplete="off">
        <Text label="Title" name="title" control={control} required />

        <Text label="Text" name="body" control={control} required multiline rows={10} />

        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Edit' : 'Create'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
