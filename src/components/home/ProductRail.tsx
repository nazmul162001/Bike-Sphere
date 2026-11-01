"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerChildren } from "@/lib/motion/variants";
import type { Category, MotorcycleModel, Product } from "@/types";

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  categories,
  models,
}: {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  categories: Category[];
  models: MotorcycleModel[];
}) {
  return (
    <section className="border-b border-ink-700 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <motion.div
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerChildren}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard
                product={product}
                category={categories.find((category) => category.id === product.categoryId)}
                models={models}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
