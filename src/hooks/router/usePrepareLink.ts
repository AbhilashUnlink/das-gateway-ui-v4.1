import {
  useLocation,
  useResolvedPath,
  useSearchParams,
} from "react-router";

interface RoutingOptions {
  to?: string;
  isRelativePath?: boolean;
  query?: Record<string, string>;
  pushToQuery?: Record<string, string>;
  keepOldQuery?: boolean;
}

export default function useModifiedRoute({
  to,
  isRelativePath = false,
  query = {},
  pushToQuery = {},
  keepOldQuery = false,
}: RoutingOptions) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const resolved = useResolvedPath(to || ".");
  let pathname = resolved.pathname;

  if (!isRelativePath && !to) {
    pathname = location.pathname;
  }

  const newQuery = keepOldQuery
    ? new URLSearchParams(searchParams)
    : new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    newQuery.set(key, value);
  });

  Object.entries(pushToQuery).forEach(([key, value]) => {
    const currentValue = newQuery.get(key);
    const values = currentValue ? currentValue.split(",") : [];
    values.push(value);
    newQuery.set(key, values.join(","));
  });

  return {
    pathname: pathname.replace(/\/\//g, "/"),
    search: newQuery.toString() ? `?${newQuery.toString()}` : "",
  };
}
