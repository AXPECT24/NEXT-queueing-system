"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import DialogBox from "../utilities/DialogBox"
import { useEffect, useState } from "react"
import { UserFormValidation } from "@/lib/validations"
import { useFetchData, usePostData } from "@/api/hooks"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../ui/select"

export enum FormFieldType {
  INPUT = 'input',
  PHONE_INPUT = 'phoneInput',
  SELECT = 'select',
}
 
const PatientForm = () => {
  interface QueueingSystem {
    name: string
  }

  interface QueueData {
    name: string,
    customer_name: string,
    queueing_system: string
  }

  const { isLoading: postLoading, postData } = usePostData();
  const { error: fetchError, fetchData } = useFetchData();
  const [queueData, setQueueData] = useState<QueueData | null>(null)
  const [queueSystem, setQueueSystem] = useState<QueueingSystem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchQueueSystems = async () => {
    const res = await fetchData(
      'LOCAL',
      'RESOURCE',
      'Queueing System'
    )

    console.log(res)
    setQueueSystem(res)
  }

  useEffect(() => {
    fetchQueueSystems();
  }, [])

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      customer_name: "",
      queue_number: "",
      phone: "",
      queueing_system: ""
    },
  })
 
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsSubmitting(true)

    try {
      const response = await postData('LOCAL', values, 'Queue')
      console.log(response)
      if (response) {
        setQueueData(response)
        console.log(queueData)
        setIsDialogOpen(true)
      }
    } catch(e){
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Queue yourself in</p>
          </section>

          <FormControl>
            <Controller
              name="queueing_system"
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="shad-select-trigger">
                      <SelectValue placeholder="Ex. Front Desk" />
                    </SelectTrigger>
                  </FormControl>
                  
                  <SelectContent className="shad-select-content">
                    {queueSystem.map((item, index) => (
                      <SelectItem key={index} value={item.name} className="hover:bg-dark-200 rounded-lg">
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="customer_name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="queue_number"
            label="Prefix"
            placeholder="Ex: 'AS or XF'"
            iconSrc="/assets/icons/email.svg"
            iconAlt="prefix"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123-4567"
          />

          <SubmitButton isLoading={isSubmitting}>Queue</SubmitButton>
        </form>
      </Form>

      {/* {isDialogOpen && (
        <DialogBox
          props={queueData}
        />
      )} */}

    </>
  )
}

export default PatientForm