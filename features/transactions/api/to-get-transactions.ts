//This is a hook. It meant to communicate with account.ts end-point
//First Create RPC client in a file "/lib/hono.ts". This will use the AppType in route.ts.

import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

//client.api.accounts.$get -> type safety

export const useToGetTransactions = (id?:string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", {id}],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: {id}
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transaction");
      }

      const { data } = await response.json();
      return {
        ...data,
        amount: convertAmountFromMiliunits(data.amount),
      };
    },
  });
  return query;
};
