"use client";
import React from "react";

import qs from "query-string";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-account";

type Props = {};

const AccountFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const { isLoading: isLoadingSummary } = useGetSummary();
  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };
    if (newValue === "all") {
      query.accountId = "";
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingSummary || isLoadingAccounts}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 mb-2 font-normal bg-primary/10 hover:bg-primary/20 hover:text-primary focus:ring-offset-0 focus-ring-transparent outline-none text-primary/80 focus:bg-primary/20 transition">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountFilter;
