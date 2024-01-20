import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { gql, useMutation } from "@apollo/client"
import { useDispatch } from "react-redux"
import { login } from '../redux/authslice'


const formSchema = z.object({

    username: z.string().min(1,{
      message: "give at least 1 char"
    }),
    email: z.string().email({
      message: "give at least 1 char"
    }),
    password:z.string().min(6,{
      message: "give at least 6 char"
    }),
    confirmPassword:z.string().min(6,{
      message:"give at least 6 char"
    }),
  })


const Signup=()=> {

  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password:"",
      confirmPassword:"",
    },
  })

  const REGISTER_USER = gql`
    mutation ($registerInput:  RegisterInput){
      registerUser(registerInput:$registerInput){
        id
        email
        username
        token
      }
    }
  `

  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(_, {data: {regisrerUser: userData}}){
      dispatch(login(userData))
      navigate('/')
    }
  })
 
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   addUser({
    variables:{registerInput:values},
   })
  }

if(loading){
  return <h1>loading</h1>
}

  return (
    <div className="h-[100vh] flex flex-col gap-4 justify-center items-center m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[320px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" type="text"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="confirm password" type="password"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Form>
      <p className="capitalize">Already have an account<Link className="text-blue-400" to="/login">Login</Link></p>
    </div>
  )
}
export default Signup