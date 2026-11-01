"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroSearch } from "@/components/home/HeroSearch";
import { MotorcycleIllustration } from "@/components/home/MotorcycleIllustration";
import { fadeUp, staggerChildren } from "@/lib/motion/variants";
import type { MotorcycleBrand } from "@/types";

export function HeroSection({ brands }: { brands: MotorcycleBrand[] }) {
  return (
    <section className="bg-radial-lime relative overflow-hidden border-b border-ink-700">
      <div className="bg-tech-grid absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-lime"
          >
            Bangladesh parts desk
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 max-w-xl text-4xl leading-tight font-semibold text-ink-100 sm:text-6xl"
          >
            Parts for the bike you actually ride.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-7 text-ink-500 sm:text-lg"
          >
            Search authentic spare parts by motorcycle, then request a live quotation.
            BikeSphere does not publish catalog prices because the market does not sit still.
          </motion.p>
          <motion.div variants={fadeUp}>
            <HeroSearch brands={brands} />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            <Button href="/products" variant="secondary">
              Browse All Parts
            </Button>
            <Button href="/find-parts" variant="limeOutline">
              Find Parts for My Bike
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="overflow-hidden rounded-md border border-ink-700"
        >
          <MotorcycleIllustration className="h-auto w-full" />
        </motion.div>
      </div>
    </section>
  );
}
