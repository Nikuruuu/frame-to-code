import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="Pricing" className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Pricing that Scales with You
          </h1>
          <p>
            Get started with our AI-powered wireframe-to-code tool. Choose a
            plan that fits your needs, whether you're a solo developer or a
            growing team.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-medium">Free</CardTitle>

              <span className="my-3 block text-2xl font-semibold">
                10 Credits / mo
              </span>

              <CardDescription className="text-sm">
                For personal projects
              </CardDescription>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Convert up to 10 wireframes per month",
                  "Basic React component export",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="relative">
            <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-gradient-to-br from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Most Popular
            </span>

            <CardHeader>
              <CardTitle className="font-medium">Pro</CardTitle>

              <span className="my-3 block text-2xl font-semibold">
                $14 for 50 Credits
              </span>

              <CardDescription className="text-sm">
                For professionals & freelancers
              </CardDescription>

              <Button asChild className="mt-4 w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Everything in Free Plan",
                  "50 wireframe conversions",
                  "Optimized React code",
                  "Styled components (Tailwind, CSS-in-JS)",
                  "Ability to save & manage projects",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-medium">Enterprise</CardTitle>

              <span className="my-3 block text-2xl font-semibold">
                Custom Pricing
              </span>

              <CardDescription className="text-sm">
                For teams & businesses
              </CardDescription>

              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Everything in Pro Plan",
                  "Unlimited conversions",
                  "Team collaboration & shared projects",
                  "API access for integrations",
                  "Priority support",
                  "Custom AI fine-tuning for design systems",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
