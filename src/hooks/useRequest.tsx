import { useState } from "react";

interface RequestState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

interface UseRequestOptions<T> {
  initialData?: T | null;
}

interface UseRequestReturn<T> {
  state: RequestState<T>;
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  makeRequest: (requestFn: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

const useRequest = <T,>(
  options?: UseRequestOptions<T>
): UseRequestReturn<T> => {
  const initialState: RequestState<T> = {
    loading: false,
    error: null,
    data: options?.initialData || null,
  };

  const [state, setState] = useState<RequestState<T>>(initialState);

  const setData = (data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  };

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  };

  const setLoading = (loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  };

  const reset = () => {
    setState(initialState);
  };

  const makeRequest = async (
    requestFn: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await requestFn();
      setData(response);
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Произошла ошибка";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    setData,
    setError,
    setLoading,
    makeRequest,
    reset,
  };
};

export default useRequest;
