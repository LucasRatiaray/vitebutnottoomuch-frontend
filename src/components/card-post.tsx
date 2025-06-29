// File: src/components/card-post.tsx
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ArrowRight, Shapes } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function CardPost() {
  return (
    <Card className="gap-4 px-4">
      <CardHeader className="flex-row items-center gap-2 px-0 font-semibold">
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
          <Shapes className="h-5 w-5" />
        </div>
        Shadcn UI Blocks
      </CardHeader>

      <CardContent className="text-muted-foreground flex flex-col gap-2 px-0">
        <div className="bg-muted aspect-video w-full rounded-xl" />
        <p>
          Explore a collection of Shadcn UI blocks and components, ready to
          preview and copy.
        </p>
      </CardContent>

      <CardFooter className="p-0">
        <Button asChild className="group w-full sm:w-auto">
          <Link href="/blocks">
            Explore Blocks
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
