"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryFormSchema } from "@/lib/zod-schemas/categoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import SaveCategoryButton from "./SaveCategoryButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateCategory } from "@/actions/category-actions";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";

type EditCategoryFormProps = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  closeDialog: () => void;
};

const EditCategoryForm = ({
  id,
  name,
  type,
  closeDialog,
}: EditCategoryFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryName: name,
      categoryType: type,
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
    const result = await updateCategory(
      id,
      data.categoryName,
      data.categoryType
    );

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error.message,
      });
      return;
    }

    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col items-center gap-4">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Category Name"
                    {...field}
                    autoFocus
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOME">Income</SelectItem>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-4 mt-4 justify-end">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <SaveCategoryButton isSubmitting={isSubmitting} isDirty={isDirty} />
        </div>
      </form>
    </Form>
  );
};

export default EditCategoryForm;