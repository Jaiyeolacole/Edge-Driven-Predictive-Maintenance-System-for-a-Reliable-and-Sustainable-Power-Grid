import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function useFetch({queryFn, key}) {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: queryFn,
  });

  return { isPending, error, data };
}
