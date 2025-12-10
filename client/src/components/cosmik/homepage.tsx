import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

export const Homepage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-[350px] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Next.js 16 + shadcn/ui</CardTitle>
            <CardDescription>
              Secure, patched, and ready for 2025. 🚀
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button>Click me!</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
