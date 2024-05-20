'use client'

import { handleErrorApi } from '~/lib/utils'
import {  useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '~/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { CreateProductBody, CreateProductBodyType } from '~/schemaValidations/product.schema'
import productApiRequest from '~/apiRequests/product'
import { Textarea } from '~/components/ui/textarea'

export default function ProductAddForm() {

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      image: '',
    },
  });

  async function onSubmit(values: CreateProductBodyType) {
    if(loading) return;
    setLoading(true)

    try {
      const result = await productApiRequest.create(values);

      toast({
        description: result.payload.message,
      });

      router.push('/products')
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" accept='image/*'  />
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
