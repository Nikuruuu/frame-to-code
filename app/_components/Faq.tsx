import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "faq-1",
    question: "What is Frame2Code?",
    answer:
      "Frame2Code is an AI-powered tool that converts wireframe images into clean, production-ready React code in seconds, helping developers streamline their workflow.",
  },
  {
    id: "faq-2",
    question: "How accurate is the generated code?",
    answer:
      "Frame2Code produces highly precise code that closely matches your wireframe. While simple designs require minimal adjustments, complex layouts may need slight refinements for pixel-perfect implementation.",
  },
  {
    id: "faq-3",
    question: "What file formats can I upload?",
    answer:
      "Currently, Frame2Code supports JPG and PNG file formats. Simply upload an image of your wireframe, and our AI will generate the corresponding React code.",
  },
  {
    id: "faq-4",
    question: "Which frameworks and technologies are supported?",
    answer:
      "Frame2Code generates React code with Tailwind CSS. We plan to expand support to additional frameworks like Vue and Angular in future updates.",
  },
  {
    id: "faq-5",
    question: "How does the credit system work?",
    answer:
      "Each wireframe conversion requires credits. Free users receive 10 credits per month, Pro users get 50 credits, and Enterprise users have unlimited access. Additional credits can be purchased as needed.",
  },
  {
    id: "faq-6",
    question: "How do I integrate the generated code into my project?",
    answer:
      "Simply copy the generated React code and paste it into your project. The code is clean and optimized for easy integration.",
  },
  {
    id: "faq-7",
    question: "Can I customize the generated code?",
    answer:
      "Yes! The generated code follows best practices, making it easy to modify. Pro and Enterprise users may also get access to additional customization options in the future.",
  },
  {
    id: "faq-8",
    question: "What if I run out of credits?",
    answer:
      "You can purchase additional credits at any time. Simply visit your account dashboard to buy more credits and continue converting designs without interruption.",
  },
];

export default function Faq() {
  const items = faqItems;

  return (
    <section id="FAQ" className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-2 text-2xl font-semibold sm:text-3xl md:mb-3 lg:mb-6 lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Find answers to common questions about our service
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60 px-1 py-3 sm:py-4">
                <div className="font-medium text-sm sm:text-base md:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-1 sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
