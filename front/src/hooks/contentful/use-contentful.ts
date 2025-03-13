'use client';

import { contentfulAccessToken, contentfulSpaceID } from '@/src/utils/api/env';
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';

interface UseContentfulProps {
  contentType: string;
  options?: object;
}

const client = createClient({
  space: contentfulSpaceID,
  accessToken: contentfulAccessToken,
});

export const useContentful = <T>({ contentType, options }: UseContentfulProps) => {
  const [content, setContent] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .getEntries({
        content_type: contentType,
        ...options,
      })
      .then((entries) => {
        setContent(entries.items as T);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [contentType, options]);

  return { content, isLoading };
};
