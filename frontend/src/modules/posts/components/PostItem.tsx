import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, IconButton } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { Post } from '../interfaces';

export interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps) => {
  const navigate = useNavigate();
  const handleEdit = useCallback(() => navigate(`/posts/${post.id}/edit`), [navigate, post.id]);

  return (
    <Box py={2}>
      <Typography variant="h3">
        {post.title}&nbsp;
        <IconButton onClick={handleEdit} color="primary">
          <EditOutlined />
        </IconButton>
      </Typography>
      <Box mt={2}>{post.body}</Box>
    </Box>
  );
};
