import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { logout } from '../redux/authslice';
import { gql, useMutation, useQuery } from "@apollo/client";

// Define a type for the message data
interface MessageData {
  getMsgs: { message: string }[];
}

const formSchema = z.object({
  msg: z.string().min(2, {
    message: "give at least 2 char"
  }),
});

const Home = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      msg: "",
    },
  });

  const CREATE_MSG = gql`
    mutation ($msg:String!){
      createMsg(msg:$msg){
        message
      }
    }
  `;

  const GET_MSG = gql`
    {
      getMsgs{
        message
      }
    }
  `;

const [createMessage] = useMutation(CREATE_MSG, {
  update(proxy, result) {
    const newMsg = result.data.createMsg.message;

    const olddata = proxy.readQuery<MessageData>({
      query: GET_MSG,
    });

    if (olddata) {
      proxy.writeQuery({
        query: GET_MSG,
        data: {
          getMsgs: [...olddata.getMsgs, newMsg],
        },
      });
    }
  }
});

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    createMessage({
      variables: { msg: values.msg }
    });
  }
  const { loading, data } = useQuery<MessageData>(GET_MSG);

  if (loading) {
    return <h1>loading</h1>;
  }
  const messages = data?.getMsgs;

  if (!messages || messages.length === 0) {
    return <h1>No data available</h1>;
  }

  return (
    <div className="flex flex-col gap-4 my-6 justify-center items-center m-auto">
      <Button onClick={() => dispatch(logout())}>Logout</Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[320px]">
          <FormField
            control={form.control}
            name="msg"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Create Message" type="text"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Msg</Button>
        </form>
      </Form>
      <div className="flex p-5 mt-4 flex-col gap-4 justify-center items-start">
        {/* Use optional chaining here */}
        {messages?.map((m, index) => (
          <p className="flex px-4 py-2 bg-green-300 border-green-700 text-green-600 rounded-md border-2" key={index}>{m.message}</p>
        ))}
      </div>
    </div>
  );
}
export default Home