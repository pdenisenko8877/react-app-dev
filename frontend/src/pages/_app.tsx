import { Route, Routes, Navigate } from 'react-router-dom';

import { PostsPage } from './posts';
import { PostPage } from './posts/PostPage';
import { PostFormPage } from './posts/PostFormPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/posts" />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/posts/new" element={<PostFormPage />} />
      <Route path="/posts/:id/edit" element={<PostFormPage />} />
    </Routes>
  );
};
