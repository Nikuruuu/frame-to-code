import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Zap, Code, Sparkles } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section
      id="Features"
      className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent"
    >
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            AI-Powered Code Generation
          </h2>
          <p className="mt-4">
            Convert wireframe images into clean, production-ready React code in
            seconds.
          </p>
        </div>
        <div className="mx-auto mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:max-w-none *:text-center md:mt-16">
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Fast & Accurate Conversion</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Upload a JPG or PNG wireframe, and our AI instantly generates
                optimized React + Tailwind CSS code.
              </p>
            </CardContent>
          </Card>
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Code className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Clean & Editable Code</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Get production-ready code that follows best practices—easy to
                edit, customize, and integrate into your project.
              </p>
            </CardContent>
          </Card>
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">AI-Powered Optimization</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Our AI ensures responsive layouts and optimized Tailwind classes
                for a seamless front-end development experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto h-36 w-36 duration-200 group-hover:bg-zinc-50/50 dark:group-hover:bg-white/5">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.zinc.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.200)_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,theme(colors.zinc.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.zinc.800)_1px,transparent_1px)]"
    />
    <div
      aria-hidden
      className="absolute inset-0 bg-gradient-radial from-transparent to-white to-75% dark:to-black"
    />
    <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center border-l border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      {children}
    </div>
  </div>
);
