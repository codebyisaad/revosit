"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Marquee } from "@/components/ui/marquee";
import { Bloom } from "@/components/visuals/backdrop";
import { stack } from "@/content/site";
import { fadeUpFast, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      <Bloom />

      <Container>
        <motion.div
          variants={stagger(0, 0.07)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUpFast}>
            <Eyebrow>B2B software house</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUpFast}
            className="mt-6 max-w-4xl text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem]"
          >
            We build the software
            <br className="hidden sm:block" />{" "}
            your business{" "}
            <span className="font-display text-accent italic">runs on</span>.
          </motion.h1>

          <motion.p
            variants={fadeUpFast}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            Revosit is a full-stack, Salesforce and AI engineering partner. Hire us
            to own the delivery end to end — or to embed senior engineers in the
            team you already have.
          </motion.p>

          <motion.div
            variants={fadeUpFast}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button href="/contact">
              Start a project
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Button>
            <Button href="/projects" variant="secondary">
              See our work
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUpFast}
            className="mt-6 font-mono text-xs tracking-tight text-ink-faint"
          >
            Project delivery &middot; Staff augmentation &middot; Advisory
          </motion.p>
        </motion.div>
      </Container>

      <motion.div
        variants={fadeUpFast}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.45 }}
        className="mt-16 sm:mt-20"
      >
        <Marquee items={stack} />
      </motion.div>
    </section>
  );
}
