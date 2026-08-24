"use client";

import { useState } from "react";
import { Language } from "@/types";
import { LanguageToggle } from "@/components/language-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Loader2 } from "lucide-react";

const COPY = {
  en: {
    heading: "Save Your Seat",
    subheadingWith: (name: string) => `Fill this out and ${name} will send you the Zoom link for the day that works best for you.`,
    subheadingDefault: "Fill this out and I'll send you the Zoom link for the day that works best for you.",
    name: "Full Name",
    phone: "Phone Number",
    email: "Email (optional)",
    day: "Which day works better?",
    wednesday: "Wednesday",
    thursday: "Thursday",
    language: "Preferred language for the call",
    english: "English",
    spanish: "Español",
    howFound: "How did you hear about this? (optional)",
    submit: "Reserve My Seat",
    submitting: "Submitting...",
    successTitle: "You're on the list! 💗",
    successBodyWith: (name: string) => `Thanks for signing up — ${name} will text or message you the Zoom link shortly. No pressure, no obligation, just information.`,
    successBodyDefault: "Thanks for signing up — I'll text or message you the Zoom link shortly. No pressure, no obligation, just information.",
    error: "Something went wrong. Please double check your info and try again.",
    required: "Please fill in your name and phone number.",
    notFoundTitle: "Link Not Found",
    notFoundBody: "This personal link doesn't exist. Please double check the URL you were given.",
  },
  es: {
    heading: "Reserva Tu Lugar",
    subheadingWith: (name: string) => `Llena esto y ${name} te enviará el enlace de Zoom para el día que mejor te funcione.`,
    subheadingDefault: "Llena esto y te enviaré el enlace de Zoom para el día que mejor te funcione.",
    name: "Nombre Completo",
    phone: "Número de Teléfono",
    email: "Correo Electrónico (opcional)",
    day: "¿Qué día te funciona mejor?",
    wednesday: "Miércoles",
    thursday: "Jueves",
    language: "Idioma preferido para la llamada",
    english: "English",
    spanish: "Español",
    howFound: "¿Cómo te enteraste de esto? (opcional)",
    submit: "Reservar Mi Lugar",
    submitting: "Enviando...",
    successTitle: "¡Ya estás en la lista! 💗",
    successBodyWith: (name: string) => `Gracias por registrarte — ${name} te enviará el enlace de Zoom pronto por mensaje. Sin presión, sin obligación, solo información.`,
    successBodyDefault: "Gracias por registrarte — te enviaré el enlace de Zoom pronto por mensaje. Sin presión, sin obligación, solo información.",
    error: "Algo salió mal. Por favor revisa tu información e intenta de nuevo.",
    required: "Por favor completa tu nombre y número de teléfono.",
    notFoundTitle: "Enlace No Encontrado",
    notFoundBody: "Este enlace personal no existe. Por favor revisa la URL que te dieron.",
  },
};

interface VipFormProps {
  associateName?: string;
  associateSlug?: string;
  notFound?: boolean;
}

export function VipForm({ associateName, associateSlug, notFound }: VipFormProps) {
  const [language, setLanguage] = useState<Language>("en");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState<string>("");
  const [callLanguage, setCallLanguage] = useState<string>("");
  const [howFound, setHowFound] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const t = COPY[language];

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="max-w-md text-center">
          <CardContent className="flex flex-col items-center gap-3 py-10">
            <Shield className="h-10 w-10 text-muted-foreground" />
            <h1 className="text-xl font-bold">{t.notFoundTitle}</h1>
            <p className="text-sm text-muted-foreground">{t.notFoundBody}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg(t.required);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, day, language: callLanguage, howFound, slug: associateSlug }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setErrorMsg(t.error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <Card className="max-w-md text-center">
          <CardContent className="flex flex-col items-center gap-3 py-10">
            <CheckCircle className="h-10 w-10 text-green-600" />
            <h1 className="text-xl font-bold">{t.successTitle}</h1>
            <p className="text-sm text-muted-foreground">
              {associateName ? t.successBodyWith(associateName) : t.successBodyDefault}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-md px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground">LegalShield{associateName ? ` · ${associateName}` : ""}</span>
          </div>
          <LanguageToggle language={language} onChange={setLanguage} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t.heading}</CardTitle>
            <p className="text-sm text-muted-foreground">{associateName ? t.subheadingWith(associateName) : t.subheadingDefault}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">{t.name}</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">{t.phone}</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">{t.email}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>{t.day}</Label>
                <div className="flex gap-2">
                  {[t.wednesday, t.thursday].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setDay(option)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        day === option ? "border-primary bg-primary/10 font-medium" : "hover:bg-accent"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>{t.language}</Label>
                <div className="flex gap-2">
                  {[t.english, t.spanish].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setCallLanguage(option)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        callLanguage === option ? "border-primary bg-primary/10 font-medium" : "hover:bg-accent"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="howFound">{t.howFound}</Label>
                <Input id="howFound" value={howFound} onChange={(e) => setHowFound(e.target.value)} />
              </div>
              {status === "error" && <p className="text-sm text-destructive">{errorMsg}</p>}
              <Button type="submit" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.submitting}
                  </>
                ) : (
                  t.submit
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
