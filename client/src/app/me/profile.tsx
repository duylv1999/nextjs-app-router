'use client'

import { handleErrorApi } from '~/lib/utils'
import {  useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '~/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { UpdateMeBody, UpdateMeBodyType } from '~/schemaValidations/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import accountApiRequest from '~/apiRequests/account'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

type Profile = {
  id: number
  name: string
  email: string
}

export default function ProfileForm({profile} : {profile: Profile}) {

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  async function onSubmit(values: UpdateMeBodyType) {
    if(loading) return;
    setLoading(true)

    try {
      await accountApiRequest.updateMe(values.name);

      toast({
        description: 'Update thong tin thanh cong',
      });

      router.refresh()
    } catch (error: any) {
      handleErrorApi({error, setError: form.setError})
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[60%] w-full"
      >
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" value={profile.email} placeholder="shadcn" readOnly/>
        </FormControl>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="!mt-8 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
