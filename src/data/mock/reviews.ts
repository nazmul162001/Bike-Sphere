import type { CustomerReview } from "@/types";

export const customerReviews: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Rahim Uddin",
    city: "Mirpur, Dhaka",
    rating: 5,
    title: "Quoted against actual stock",
    body: "I needed an R15 clutch plate the same week. The desk asked for year and variant, then sent a quotation instead of a guessed website price. That is how parts should be sold here.",
    motorcycle: "Yamaha R15 V3",
  },
  {
    id: "rev-2",
    author: "Farzana Akter",
    city: "Agrabad, Chattogram",
    rating: 5,
    title: "Workshop-friendly wholesale notes",
    body: "We requested a mixed Pulsar and Apache list. Individual and wholesale preferences were separate, and delivery was itemized apart from the parts amount.",
    motorcycle: "Bajaj Pulsar 150",
  },
  {
    id: "rev-3",
    author: "Arif Chowdhury",
    city: "Zindabazar, Sylhet",
    rating: 4,
    title: "Clear on what was genuine",
    body: "The product page marked OEM versus aftermarket before I requested a quote. No surprise classification later.",
    motorcycle: "Honda CBR150R",
  },
  {
    id: "rev-4",
    author: "Nusrat Jahan",
    city: "Boalia, Rajshahi",
    rating: 5,
    title: "Saved my bike profile",
    body: "Once the Splendor was stored in My Bikes, later searches stayed relevant. Useful when the same commuter is serviced every month.",
    motorcycle: "Hero Splendor Plus",
  },
];
