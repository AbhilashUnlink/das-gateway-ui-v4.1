import { useSearchParams } from "react-router";

export default function useQueryParam(name: string) {
  const [searchParams] = useSearchParams();
  return searchParams.get(name);
}
