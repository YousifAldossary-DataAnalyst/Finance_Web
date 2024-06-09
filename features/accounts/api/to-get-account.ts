//This is a hook. It meant to communicate with account.ts end-point
//First Create RPC client in a file "/lib/hono.ts". This will use the AppType in route.ts.

import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

//client.api.accounts.$get -> type safety

export const useToGetAccount = (id?:string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", {id}],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: {id}
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
