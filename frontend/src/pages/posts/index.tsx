import { Link as RouterLink } from 'react-router-dom';

import { Box, Stack, Typography, Button } from '@mui/material';

import { Loader } from 'src/modules/ui/loader';
import { PostList } from 'src/modules/posts/components/List';
import { usePostsGetMany } from 'src/modules/posts/hooks/crud';

export const PostsPage = () => {
  const { data: posts, isLoading } = usePostsGetMany();

  return (
    <Box px={5} py={3}>
      <Stack justifyContent="space-between" direction="row" alignItems="center" spacing={3}>
        <Typography variant="h3" mb={2}>
          Posts
        </Typography>
        <Button component={RouterLink} to="/posts/new" variant="contained" color="primary">
          Create Post
        </Button>
      </Stack>
      <Loader isLoading={isLoading}>{posts && <PostList posts={posts} />}</Loader>
    </Box>
  );
};
