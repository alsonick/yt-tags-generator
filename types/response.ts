export interface Response {
  success: boolean;
  error?: string;
  data: {
    title: string;
    tags: string;
  };
}
