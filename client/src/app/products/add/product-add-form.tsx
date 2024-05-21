'use client'

import { handleErrorApi } from '~/lib/utils'
import {  useRef, useState } from 'react'
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
import Image from 'next/image'

export default function ProductAddForm() {

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>()
  const inputImageRef = useRef<HTMLInputElement | null>(null)

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
      const formData = new FormData();
      formData.append('file', file as Blob)

      const resultImageUrl = await productApiRequest.uploadImage(formData);

      const imageUrl = resultImageUrl.payload.data
      const result = await productApiRequest.create({
        ...values,
        image: imageUrl
      });

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
        onSubmit={form.handleSubmit(onSubmit, err => console.log(err))}
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
                <Input type="file" accept='image/*'
                ref={inputImageRef}
                onClick={(e: any) => e.target.value = null}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if(file) {
                    setFile(file)
                    field.onChange('http://localhost:3000/' + file.name)
                  }
                }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {file && (
          <div>
            <Image 
               src={URL.createObjectURL(file)}
               width={128}
               height={128}
               alt="preview"
               className='w-32 h-32 object-cover'
            />
            <Button type="button" variant={'destructive'} size={'sm'} onClick={
              () => {
                setFile(null)
                form.setValue('image', '')
                if(inputImageRef.current) {
                  inputImageRef.current.value = ''
                }
              }
            }>Delete image</Button>
          </div>
        )}
        <Button className="!mt-8 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
