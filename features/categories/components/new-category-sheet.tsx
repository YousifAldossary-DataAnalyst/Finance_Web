import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategoriesSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "../api/use-create-category";
import { useNewCategory } from "../hooks/use-new-category";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FromValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();
  const onSumbit = (values: FromValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          defaultValues={{ name: "" }}
          onSumbit={onSumbit}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
