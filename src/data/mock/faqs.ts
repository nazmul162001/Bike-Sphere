import type { FaqItem, ProcessStep } from "@/types";

export const faqs: FaqItem[] = [
  {
    id: "faq-why-no-price",
    question: "Why are there no prices on the products?",
    answer:
      "Motorcycle part rates in Bangladesh move with import, supplier, and alloy costs. BikeSphere quotes each request against current market rates instead of publishing figures that would be wrong by the time you order.",
  },
  {
    id: "faq-how-quote",
    question: "How does a quotation request work?",
    answer:
      "Add parts to the cart, submit contact and delivery details, and the request appears on the admin desk. A person enters current prices, delivery, and any discount, then generates a quotation you can accept or reject.",
  },
  {
    id: "faq-payment",
    question: "When do I pay?",
    answer:
      "After you accept a quotation, only the delivery charge is collected first in this model. The remaining product amount is collected after the parts reach you. This prototype simulates that flow visually and does not process payments.",
  },
  {
    id: "faq-wholesale",
    question: "Can workshops request wholesale quotations?",
    answer:
      "Yes. Checkout includes an individual or wholesale preference. Wholesale requests are reviewed with quantity and workshop notes in mind. Rates are still entered by the desk, not calculated on the website.",
  },
  {
    id: "faq-genuine",
    question: "Do you sell genuine, OEM, and aftermarket parts?",
    answer:
      "Each product is classified as genuine, OEM, or aftermarket. Condition is listed as new or used. The quotation repeats those labels so you know what you are being offered.",
  },
  {
    id: "faq-delivery",
    question: "Which areas can you deliver to?",
    answer:
      "The prototype is designed around Bangladesh divisions and districts. Delivery charges are entered by the admin during quotation, not guessed in the cart.",
  },
];

export const quotationSteps: ProcessStep[] = [
  {
    id: "step-find",
    title: "Find the exact part",
    description: "Search by name, SKU, brand, or the motorcycle you ride.",
  },
  {
    id: "step-cart",
    title: "Build a request list",
    description: "Add one or many parts. Quantities are saved. No prices are shown.",
  },
  {
    id: "step-submit",
    title: "Submit a quotation request",
    description: "Share contact, delivery, and individual or wholesale preference.",
  },
  {
    id: "step-review",
    title: "Receive a desk quotation",
    description: "An admin enters current prices, delivery, and validity, then issues an invoice.",
  },
  {
    id: "step-accept",
    title: "Accept and pay delivery first",
    description: "The remaining product amount is collected after the parts arrive.",
  },
];
