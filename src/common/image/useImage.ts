import { useEffect, useState } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface ImageProps {
  url: string | null;
}

export default function useImage(props: ImageProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const response = useQuery({
    queryKey: [props.url],
    queryFn: async () => {
      return props.url == null ? null : (await axios.get(props.url, { responseType: 'blob' })).data;
    },
    enabled: !!props.url,
  });

  useEffect(() => {
    if (response.isSuccess && response.data) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(response.data);
    } else {
      setImageUrl(undefined);
    }
  }, [response.isSuccess, response.data]);

  return {
    isLoading: response.isLoading,
    isError: response.isError,
    isPending: response.isPending,
    url: imageUrl,
  };
}
