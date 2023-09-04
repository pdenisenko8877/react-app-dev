import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

import { apiClient } from 'src/modules/app/configs/axios';
import { Error } from 'src/modules/app/interfaces';

import { Post } from '../interfaces';

const endpoint = 'posts';

export const indexPosts = () => apiClient.get<Post[], Post[]>(endpoint, {});
export const usePostsGetMany = () => {
  return useQuery<Post[], Error>(['indexPosts'], () => indexPosts());
};

export const getOnePost = (id: string) => apiClient.get<Post, Post>(`${endpoint}/${id}`);
export const useGetOnePost = (id: string) =>
  useQuery<Post, Error>(['getPost', id], () => getOnePost(id));

export const createPost = (data: Post) => apiClient.post<Post, Post>(`${endpoint}`, data);
export const useCreatePost = (options?: UseMutationOptions<Post, Error, Post>) =>
  useMutation<Post, Error, Post>({
    mutationKey: ['createPost'],
    mutationFn: createPost,
    ...options,
  });

export const updatePost = (id: string, data: Post) =>
  apiClient.patch<Post, Post>(`${endpoint}/${id}`, data);
export const useUpdatePost = (id: string, options?: UseMutationOptions<Post, Error, Post>) =>
  useMutation<Post, Error, Post>({
    mutationKey: ['updateEncounters', id],
    mutationFn: (data: Post) => updatePost(id, data),
    ...options,
  });
