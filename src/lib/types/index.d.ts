interface FormState<T> {
  message?: string;
  data?: T | null;
  errors?: {
    [key: string]: string[] | undefined;
  };
}
