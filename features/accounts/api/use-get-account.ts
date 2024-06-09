//This is a hook. It meant to communicate with account.ts end-point
//First Create RPC client in a file "/lib/hono.ts". This will use the AppType in route.ts.

import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

//client.api.accounts.$get -> type safety

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
