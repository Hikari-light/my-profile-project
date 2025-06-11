"use client"

import { use, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { getClientDictionary } from "@/lib/i18n/client-dictionary"
import type { Locale } from "@/lib/i18n/get-dictionary"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import { checkSubmissionLimit } from "@/lib/submission-limit"
import { cn } from "@/lib/utils"

const MAX_NAME_LENGTH = 20
const MAX_EMAIL_LENGTH = 30
const MAX_MESSAGE_LENGTH = 80

interface Props {
  params: Promise<{
    lang: Locale
  }>
}

export default function ContactPage({ params }: Props) {
  const { lang } = use(params)
  const dict = getClientDictionary(lang)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [remainingSubmissions, setRemainingSubmissions] = useState<number | null>(null)
  const [validationState, setValidationState] = useState({
    name: { isValid: true, message: "" },
    email: { isValid: true, message: "" },
    message: { isValid: true, message: "" }
  })

  const formSchema = z.object({
    name: z.string()
      .min(2, dict.contact.errors.nameRequired)
      .max(MAX_NAME_LENGTH, dict.contact.errors.nameTooLong),
    email: z.string()
      .min(1, dict.contact.errors.emailRequired)
      .max(MAX_EMAIL_LENGTH, dict.contact.errors.emailTooLong)
      .email(dict.contact.errors.emailInvalid),
    message: z.string()
      .min(10, dict.contact.errors.messageRequired)
      .max(MAX_MESSAGE_LENGTH, dict.contact.errors.messageTooLong)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    },
    mode: "onChange"
  })

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name) {
        const result = formSchema.shape[name as keyof typeof formSchema.shape].safeParse(value[name as keyof typeof value])
        setValidationState(prev => ({
          ...prev,
          [name]: {
            isValid: result.success,
            message: result.success ? "" : result.error.errors[0].message
          }
        }))
      }
    })
    return () => subscription.unsubscribe()
  }, [form, formSchema])

  useEffect(() => {
    const checkSubmissionLimit = async () => {
      try {
        const response = await fetch('/api/check-limit')
        const data = await response.json()
        setRemainingSubmissions(data.remainingSubmissions)
      } catch (error) {
        console.error('Error checking submission limit:', error)
      }
    }

    checkSubmissionLimit()
  }, [])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)
      
      // 检查提交限制
      const { canSubmit, remainingSubmissions: remaining, error: limitError } = await checkSubmissionLimit(lang)
      
      if (!canSubmit) {
        setSubmitError(limitError || dict.contact.errorMessage)
        return
      }
      
      const { error: submitError } = await supabase
        .from("contacts")
        .insert([
          {
            name: data.name,
            email: data.email,
            message: data.message,
            language: lang
          }
        ])

      if (submitError) throw submitError
      
      setRemainingSubmissions(remaining)
      setIsSubmitted(true)
    } catch (err) {
      console.error("提交表单时出错:", err)
      setSubmitError(dict.contact.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {dict.contact.thankYou}
          </h1>
          <p className="text-muted-foreground mb-4">
            {dict.contact.responsePromise}
          </p>
          {remainingSubmissions !== null && (
            <p className="text-sm text-muted-foreground mb-8">
              {dict.contact.remainingSubmissions.replace('{count}', remainingSubmissions.toString())}
            </p>
          )}
          <Button onClick={() => {
            setIsSubmitted(false)
            setValidationState({
              name: { isValid: true, message: "" },
              email: { isValid: true, message: "" },
              message: { isValid: true, message: "" }
            })
          }}>
            {dict.contact.sendAnother}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8">
          {dict.nav.contact}
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
                <Label htmlFor="name">{dict.contact.nameLabel}</Label>
                <div className="relative">
                  <Input 
                    id="name"
                    {...form.register("name")}
                    aria-invalid={!validationState.name.isValid}
                    placeholder={dict.contact.namePlaceholder}
                    maxLength={MAX_NAME_LENGTH}
                    className={cn(
                      !validationState.name.isValid && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {form.watch("name").length}/{MAX_NAME_LENGTH}
                  </div>
                </div>
                {!validationState.name.isValid && (
                  <p className="text-sm text-red-500">{validationState.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{dict.contact.emailLabel}</Label>
                <div className="relative">
                  <Input 
                    id="email"
                    type="email"
                    {...form.register("email")}
                    aria-invalid={!validationState.email.isValid}
                    placeholder={dict.contact.emailPlaceholder}
                    maxLength={MAX_EMAIL_LENGTH}
                    className={cn(
                      !validationState.email.isValid && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    {form.watch("email").length}/{MAX_EMAIL_LENGTH}
                  </div>
                </div>
                {!validationState.email.isValid && (
                  <p className="text-sm text-red-500">{validationState.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">{dict.contact.messageLabel}</Label>
                <div className="relative">
                  <Textarea 
                    id="message"
                    {...form.register("message")}
                    aria-invalid={!validationState.message.isValid}
                    placeholder={dict.contact.messagePlaceholder}
                    rows={6}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className={cn(
                      !validationState.message.isValid && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <div className="absolute right-2 bottom-2 text-xs text-muted-foreground">
                    {form.watch("message").length}/{MAX_MESSAGE_LENGTH}
                  </div>
                </div>
                {!validationState.message.isValid && (
                  <p className="text-sm text-red-500">{validationState.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? dict.contact.submitting || "发送中..." : dict.contact.submitButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
