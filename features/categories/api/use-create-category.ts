
import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {toast} from "sonner"
import {client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories.$post({json});
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Category Created")
            queryClient.invalidateQueries({queryKey:["categories"]})
        },
        onError: () => {
            toast.success("Failed to create category")
            queryClient.invalidateQueries({queryKey:["categories"]})
        },
    })
    return mutation;
}