import { Footer } from '@/components/ui/footer-section';

export default function FooterDemo() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-mono text-4xl font-bold">Footer Demo</h1>
          <p className="text-muted-foreground">
            Scroll down to see the footer!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
