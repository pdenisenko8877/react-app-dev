import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';

import { Post } from '../interfaces';

export interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
  const navigate = useNavigate();

  const handleEdit = useCallback((id: string) => () => navigate(`/posts/${id}`), [navigate]);

  return (
    <Box py={2}>
      <Grid container spacing={3}>
        {posts.map(post => (
          <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea sx={{ minHeight: '100%' }} onClick={handleEdit(String(post.id))}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
