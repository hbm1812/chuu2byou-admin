import { useReducer } from 'react';

const useRefresh = () => {
  const [ignored, forceUpdate] = useReducer(() => ({}), {});

  return [ignored, forceUpdate] as const;
};

export default useRefresh;
