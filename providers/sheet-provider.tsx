"use client";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useMountedState } from "react-use";
import { EditAccount } from "@/features/accounts/components/edit-account";

import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { EditCategory } from "@/features/categories/components/edit-category";

import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { EditTransaction } from "@/features/transactions/components/edit-transactions";

export const SheetProvider = () => {
  //This one line is equvilent to useState(false) and usweEffect set to true.
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccount />

      <NewCategorySheet />
      <EditCategory />

      <NewTransactionSheet />
      <EditTransaction/>
    </>
  );
};
