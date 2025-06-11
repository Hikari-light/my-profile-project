"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { submitContactForm } from '@/lib/actions/contact'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

const MAX_NAME_LENGTH = 20
const MAX_EMAIL_LENGTH = 30
const MAX_MESSAGE_LENGTH = 80

export default function ContactPage() {
  const t = useTranslations('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const formSchema = z.object({
    name: z.string().min(2, '名字至少需要2个字符').max(MAX_NAME_LENGTH, '名字不能超过20个字符'),
    email: z.string().email('请输入有效的电子邮箱地址').max(MAX_EMAIL_LENGTH, '邮箱不能超过30个字符'),
    message: z.string().min(10, '消息至少需要10个字符').max(MAX_MESSAGE_LENGTH, '消息不能超过80个字符')
  })

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError('')
      
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('message', data.message)

      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitSuccess(true)
        form.reset()
      } else {
        setSubmitError(result.error)
      }
    } catch (error) {
      setSubmitError(t('errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t('thankYou')}
          </h1>
          <p className="text-muted-foreground mb-4">
            {t('responsePromise')}
          </p>
          <Button onClick={() => setSubmitSuccess(false)}>
            {t('sendAnother')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8">
          {t('title')}
        </h1>
        
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('nameLabel')}</Label>
                <div className="relative">
                  <Input 
                    id="name"
                    {...form.register("name")}
                    aria-invalid={!!form.formState.errors.name}
                    placeholder={t('namePlaceholder')}
                    maxLength={MAX_NAME_LENGTH}
                    className={cn(
                      !!form.formState.errors.name && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {form.watch("name").length}/{MAX_NAME_LENGTH}
                  </div>
                </div>
                {!!form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('emailLabel')}</Label>
                <div className="relative">
                  <Input 
                    id="email"
                    type="email"
                    {...form.register("email")}
                    aria-invalid={!!form.formState.errors.email}
                    placeholder={t('emailPlaceholder')}
                    maxLength={MAX_EMAIL_LENGTH}
                    className={cn(
                      !!form.formState.errors.email && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {form.watch("email").length}/{MAX_EMAIL_LENGTH}
                  </div>
                </div>
                {!!form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">{t('messageLabel')}</Label>
                <div className="relative">
                  <Textarea 
                    id="message"
                    {...form.register("message")}
                    aria-invalid={!!form.formState.errors.message}
                    placeholder={t('messagePlaceholder')}
                    rows={6}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className={cn(
                      !!form.formState.errors.message && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <div className="absolute right-2 bottom-2 text-xs text-muted-foreground">
                    {form.watch("message").length}/{MAX_MESSAGE_LENGTH}
                  </div>
                </div>
                {!!form.formState.errors.message && (
                  <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? t('submitting') : t('submitButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
