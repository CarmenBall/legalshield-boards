"use client";

import { useState } from "react";
import Link from "next/link";
import { Language } from "@/types";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Shield, Heart, CheckCircle, XCircle, Sparkles, AlertCircle, Phone } from "lucide-react";

const CARMEN_STORY = {
  en: `My son Steve became seriously ill as a child. Doctors told us he had an autoimmune condition, and that by the time he reached his 20s, he'd likely be in a wheelchair. When I dug into the research, I found something that changed everything: stress was one of the biggest triggers for his flare-ups.
Steve needed his mom raising him — not strangers. So I set out to find a way to work from home.
Nine months after starting this business, I quit my job. I haven't worked for anyone else in over 30 years.
Because I could be the one raising my kids, in a calm and positive environment, Steve has never been in that wheelchair. He's grown up, and now he's raising a family of his own.
That's why I do this. Not for hype — for the ability to be there for the people who need me.`,
  es: `Mi hijo Steve se enfermó gravemente cuando era niño. Los médicos nos dijeron que tenía una enfermedad autoinmune, y que para cuando llegara a sus 20 años, probablemente estaría en silla de ruedas. Cuando investigué, encontré algo que cambió todo: el estrés era uno de los mayores factores que provocaban sus crisis.
Steve necesitaba que su mamá lo cuidara — no desconocidos. Así que me propuse encontrar una manera de trabajar desde casa.
Nueve meses después de empezar este negocio, renuncié a mi trabajo. No he trabajado para nadie más en más de 30 años.
Porque pude ser yo quien criara a mis hijos, en un ambiente tranquilo y positivo, Steve nunca estuvo en esa silla de ruedas. Creció, y ahora está formando su propia familia.
Por eso hago esto. No por exageración — por la capacidad de estar presente para quienes me necesitan.`,
};

const COPY = {
  en: {
    heroTag: "A Different Path Forward",
    storyHeading: "Why I Started",
    isIsntHeading: "What This Is & Isn't",
    isnt: ["Not a 9-to-5", "Not products to stock, sell, or store", "Not endless cold-calling strangers", "Not a get-rich-quick scheme"],
    is: [
      "A simple system you plug into, not reinvent",
      "Flexible hours you build around your life, not the other way around",
      "Payouts based on real memberships used by real families",
      "Mentorship and support from day one",
    ],
    benefitsHeading: "What You Get",
    benefits: [
      "Next-day direct deposit",
      "A compensation plan built on real usage, not just recruiting",
      "A team and leadership that actually shows up for you",
      "A business that works in the hours you already have",
    ],
    whoHeading: "Who This Is For",
    who: [
      "You've said \"I need another stream of income\" more than once this year",
      "You want to be present for your family, not just providing for them",
      "You're coachable and willing to follow a system that already works",
      "You're tired of trading all your time for someone else's paycheck",
    ],
    ctaHeading: "Ready to Take a Closer Look?",
    ctaBody: "No pressure, no obligation — just a conversation and the real information.",
    ctaButton: "Save My Seat",
    questionsText: "Have questions? Text or call",
    disclaimer:
      "Results are not typical and vary based on individual effort, consistency, and circumstances. No income is guaranteed. This information is for educational purposes and reflects one associate's personal experience.",
    presentedBy: "Presented by",
  },
  es: {
    heroTag: "Un Camino Diferente",
    storyHeading: "Por Qué Empecé",
    isIsntHeading: "Qué Es y Qué No Es",
    isnt: ["No es un trabajo de 9 a 5", "No hay productos que almacenar, vender o guardar", "No es llamar en frío a desconocidos sin fin", "No es un esquema para hacerte rico rápido"],
    is: [
      "Un sistema simple al que te conectas, no que reinventas",
      "Horarios flexibles que construyes alrededor de tu vida, no al revés",
      "Pagos basados en membresías reales usadas por familias reales",
      "Mentoría y apoyo desde el primer día",
    ],
    benefitsHeading: "Lo Que Obtienes",
    benefits: [
      "Depósito directo al día siguiente",
      "Un plan de compensación basado en uso real, no solo en reclutamiento",
      "Un equipo y liderazgo que realmente está presente para ti",
      "Un negocio que funciona con las horas que ya tienes",
    ],
    whoHeading: "Para Quién Es Esto",
    who: [
      "Has dicho \"necesito otra fuente de ingresos\" más de una vez este año",
      "Quieres estar presente para tu familia, no solo mantenerla",
      "Eres coachable y estás dispuesto/a a seguir un sistema que ya funciona",
      "Estás cansado/a de cambiar todo tu tiempo por el sueldo de otra persona",
    ],
    ctaHeading: "¿Listo/a Para Verlo Más de Cerca?",
    ctaBody: "Sin presión, sin obligación — solo una conversación y la información real.",
    ctaButton: "Reservar Mi Lugar",
    questionsText: "¿Tienes preguntas? Envía un mensaje o llama al",
    disclaimer:
      "Los resultados no son típicos y varían según el esfuerzo individual, la constancia y las circunstancias de cada persona. Ningún ingreso está garantizado. Esta información es con fines educativos y refleja la experiencia personal de una asociada.",
    presentedBy: "Presentado por",
  },
};

interface OpportunityContentProps {
  associateName?: string;
  associatePhone?: string;
  customStory?: string;
  vipHref?: string;
}

export function OpportunityContent({ associateName, associatePhone, customStory, vipHref = "/vip" }: OpportunityContentProps) {
  const [language, setLanguage] = useState<Language>("en");
  const t = COPY[language];
  const isPersonalized = Boolean(customStory);
  const displayName = associateName || "Carmen";

  const heroHeading = isPersonalized
    ? language === "en"
      ? "This Business Changed Everything For Me"
      : "Este Negocio Cambió Todo Para Mí"
    : language === "en"
    ? "This Business Gave Me My Life — and My Son — Back"
    : "Este Negocio Me Devolvió Mi Vida — y a Mi Hijo";

  const story = isPersonalized ? customStory! : CARMEN_STORY[language];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <span className="text-sm font-semibold text-muted-foreground">LegalShield</span>
              {isPersonalized && (
                <p className="text-xs text-muted-foreground">
                  {t.presentedBy} {displayName}
                </p>
              )}
            </div>
          </div>
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>
      </header>

      <section className="bg-gradient-to-b from-primary/10 to-background px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 flex items-center justify-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-4 w-4" /> {t.heroTag}
          </p>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl">{heroHeading}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-2xl space-y-14 px-6 py-12">
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Heart className="h-5 w-5 text-primary" /> {t.storyHeading}
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{story}</p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold">{t.isIsntHeading}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              {t.isnt.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {t.is.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm font-medium">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold">{t.benefitsHeading}</h2>
          <div className="space-y-2">
            {t.benefits.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm font-medium">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold">{t.whoHeading}</h2>
          <div className="space-y-2">
            {t.who.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-primary/10 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold">{t.ctaHeading}</h2>
          <p className="mb-5 text-sm text-muted-foreground">{t.ctaBody}</p>
          <Button size="lg" asChild>
            <Link href={vipHref}>{t.ctaButton}</Link>
          </Button>
          {isPersonalized && associatePhone && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Phone className="h-3.5 w-3.5" /> {t.questionsText} {associatePhone}
            </p>
          )}
        </section>

        <section className="flex items-start gap-2 rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{t.disclaimer}</p>
        </section>
      </div>
    </div>
  );
}
