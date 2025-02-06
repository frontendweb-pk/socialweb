import { createPost } from "@/lib/actions/post";
import { useActionState } from "react";
import Form from "../ui/form";

export default function AddPost() {
  const [state, formAction, isPending] = useActionState(createPost, {
    message: "",
    data: null,
  });

  return <Form></Form>;
}
