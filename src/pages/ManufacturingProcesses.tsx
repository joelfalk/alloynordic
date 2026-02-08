import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import machiningImg from "@/assets/manufacturing/machining.jpg";
import castingImg from "@/assets/manufacturing/casting.jpg";
import sinteringImg from "@/assets/manufacturing/sintering.jpg";
import hotPressingImg from "@/assets/manufacturing/hot-pressing.jpg";

interface ProcessSectionProps {
  image: string;
  titleKey: string;
  descKey: string;
  detailsKey: string;
  index: number;
  t: (key: string) => string;
}

const ProcessSection = ({ image, titleKey, descKey, detailsKey, index, t }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container relative z-10 px-4 py-20"
        style={{ opacity }}
      >
        <div className={`max-w-2xl ${index % 2 === 1 ? "ml-auto text-right" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block text-accent font-semibold text-lg mb-4 tracking-wider uppercase">
              0{index + 1}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              {t(titleKey)}
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-light mb-6">
              {t(descKey)}
            </p>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">
              {t(detailsKey)}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator for first section */}
      {index === 0 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

const ManufacturingProcesses = () => {
  const { t } = useLanguage();

  const processes = [
    {
      id: "machining",
      image: machiningImg,
      titleKey: "manufacturing.machining.title",
      descKey: "manufacturing.machining.desc",
      detailsKey: "manufacturing.machining.details",
    },
    {
      id: "casting",
      image: castingImg,
      titleKey: "manufacturing.casting.title",
      descKey: "manufacturing.casting.desc",
      detailsKey: "manufacturing.casting.details",
    },
    {
      id: "sintering",
      image: sinteringImg,
      titleKey: "manufacturing.sintering.title",
      descKey: "manufacturing.sintering.desc",
      detailsKey: "manufacturing.sintering.details",
    },
    {
      id: "hotpressing",
      image: hotPressingImg,
      titleKey: "manufacturing.hotpressing.title",
      descKey: "manufacturing.hotpressing.desc",
      detailsKey: "manufacturing.hotpressing.details",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <LanguageSwitcher />

      {/* Fixed Back Button */}
      <motion.div
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/">
          <Button
            variant="ghost"
            className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("manufacturing.back")}
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <motion.div
          className="container relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
            {t("manufacturing.title")}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto">
            {t("manufacturing.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Process Sections */}
      {processes.map((process, index) => (
        <ProcessSection
          key={process.id}
          image={process.image}
          titleKey={process.titleKey}
          descKey={process.descKey}
          detailsKey={process.detailsKey}
          index={index}
          t={t}
        />
      ))}

      {/* CTA Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <motion.div
          className="container relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            {t("manufacturing.cta.title")}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            {t("manufacturing.cta.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 font-semibold"
            >
              <Link to="/#kontakt">{t("manufacturing.cta.contact")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 font-semibold bg-transparent"
            >
              <Link to="/">{t("manufacturing.cta.home")}</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ManufacturingProcesses;
