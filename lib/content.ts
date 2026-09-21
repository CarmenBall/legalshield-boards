import { BoardCategory } from "@/types";
import { networkingAndLnaBoards } from "@/lib/networking-lna-boards";
import { onboardingBoard } from "@/lib/onboarding-board";
import { recruitingExtraItems } from "@/lib/recruiting-extra";
import { objectionsExtraItems } from "@/lib/objections-extra";
import { openingExtraItems } from "@/lib/opening-extra";
import { hostANightBoard } from "@/lib/host-a-night-board";
import { incomeTrackerBoard } from "@/lib/income-tracker-board";

export const boards: BoardCategory[] = [
  {
    id: "recruiting",
    label: { en: "Recruiting & Opportunity Posts", es: "Reclutamiento y Publicaciones de Oportunidad" },
    description: {
      en: "Social posts to attract new LegalShield associates.",
      es: "Publicaciones para atraer nuevos asociados de LegalShield.",
    },
    items: [
      {
        id: "recruiting-1",
        title: { en: "Something's Been on My Heart", es: "Algo Ha Estado en Mi Corazón" },
        tags: ["facebook", "instagram", "opportunity"],
        body: {
          en: `Okay, I have to get this off my chest. 💗
Anyone who's known me a while knows I don't sit still — I'm always working on the next thing. Relying on one paycheck has never sat right with me, and with how things are right now, I think backup income isn't optional anymore. It's necessary.
Here's what you should know about me, though...
I'm skeptical by nature. 😂
I don't jump on every "opportunity" that lands in my inbox. Honestly, my default answer is no.
Which is exactly why this is worth mentioning — because I didn't say no this time.
I spent weeks quietly digging in. Watching how it actually works. Asking the hard questions. Looking at the real numbers instead of the highlight reel. Talking directly to people already doing it.
And here's my honest takeaway...
It's been a long time since a business caught my attention like this one has. 🤯
It hits things I didn't even realize I was looking for:
✨ Nothing to stock or store.
✨ Zero inventory.
✨ A system that's already built — you just plug in.
✨ Leadership that actually shows up for you.
✨ Money that hits your account the very next day.
✨ A pay structure that made me re-read it twice.
Here's the part that really got me, though...
Everyday people — not influencers, not people with giant followings — are getting real results simply because they got connected to the right system at the right moment.
One associate told me she brought in $20K+ in her very first month. Solo. No team behind her yet. 😳
Yeah. That stopped me in my tracks.
I'm not trying to twist anyone's arm — that's just not who I am.
But once in a while something crosses your path that's genuinely worth a second look, and I think this is that moment.
So if you've been quietly hoping for something different...
If you've had that nagging feeling that there's got to be a better way...
Or if you're just plain curious...
I'm hosting live Zoom walkthroughs this Wednesday and Thursday, and I'd genuinely love to have you on one.
💗 Drop your info in my VIP form (link in comments) and I'll get you set up for whichever day works.
Comment VIP below so I know to look out for you.
Zero pressure.
Zero obligation.
Just the info, straight up.
Sometimes the thing you weren't even hunting for turns out to be the thing that changes everything. ✨`,
          es: `Bueno, tengo que sacarme esto del pecho. 💗
Quien me conoce sabe que nunca me quedo quieta — siempre estoy trabajando en algo nuevo. Depender de un solo sueldo nunca me ha parecido buena idea, y con cómo está todo hoy en día, creo que tener un ingreso de respaldo ya no es opcional. Es necesario.
Pero esto es lo que debes saber de mí...
Soy escéptica por naturaleza. 😂
No me lanzo a cualquier "oportunidad" que me llega. Sinceramente, mi respuesta automática es no.
Y por eso vale la pena mencionar esto — porque esta vez no dije que no.
Pasé semanas investigando en silencio. Viendo cómo funciona realmente. Haciendo las preguntas difíciles. Revisando los números reales, no la versión bonita. Hablando directamente con personas que ya lo están haciendo.
Y esta es mi conclusión honesta...
Hace mucho tiempo que un negocio no me llamaba tanto la atención como este. 🤯
Cumple con cosas que ni sabía que estaba buscando:
✨ Nada que almacenar ni guardar.
✨ Cero inventario.
✨ Un sistema que ya está armado — solo te conectas.
✨ Liderazgo que realmente está presente para ti.
✨ Dinero que llega a tu cuenta al día siguiente.
✨ Una estructura de pago que me hizo leerla dos veces.
Pero esto es lo que realmente me convenció...
Personas comunes — no influencers, no gente con seguidores masivos — están logrando resultados reales simplemente porque se conectaron al sistema correcto en el momento correcto.
Una asociada me contó que generó más de $20,000 en su primer mes. Sola. Sin equipo todavía. 😳
Sí. Eso me detuvo en seco.
No estoy aquí para convencer a nadie a la fuerza — simplemente no soy así.
Pero de vez en cuando aparece algo que realmente merece una segunda mirada, y creo que este es ese momento.
Así que si has estado esperando en silencio algo diferente...
Si has sentido que tiene que haber una mejor manera...
O si simplemente tienes curiosidad...
Voy a presentar recorridos en vivo por Zoom este miércoles y jueves, y me encantaría tenerte ahí.
💗 Llena mi formulario VIP (enlace en comentarios) y te confirmo el día que mejor te funcione.
Comenta VIP para saber que debo buscar tu formulario.
Cero presión.
Cero obligación.
Solo la información, tal cual.
A veces lo que ni siquiera estabas buscando termina siendo lo que lo cambia todo. ✨`,
        },
      },
      {
        id: "recruiting-2",
        title: { en: "Quick DM Opener", es: "Mensaje Directo Rápido" },
        tags: ["dm", "text"],
        body: {
          en: `Hey! I've been building something exciting on the side and thought of you. It's not for everyone, but I'd love to get your honest opinion on it — no pressure at all. Want me to send you a quick 3-min overview?`,
          es: `¡Hola! He estado construyendo algo emocionante como proyecto adicional y pensé en ti. No es para todos, pero me encantaría escuchar tu opinión honesta — sin ninguna presión. ¿Quieres que te envíe un resumen rápido de 3 minutos?`,
        },
      },
      ...recruitingExtraItems,
    ],
  },
  {
    id: "identity-theft",
    label: { en: "Identity Theft Workshop", es: "Taller de Robo de Identidad" },
    description: {
      en: "Invites and talking points for identity theft awareness workshops.",
      es: "Invitaciones y puntos clave para talleres de concientización sobre robo de identidad.",
    },
    items: [
      {
        id: "idtheft-1",
        title: { en: "Workshop Invite Post", es: "Publicación de Invitación al Taller" },
        tags: ["workshop", "event"],
        body: {
          en: `🔐 Did you know your identity is stolen every 22 seconds in the U.S.?
I'm hosting a FREE workshop on how to protect yourself, your family, and your finances from identity theft — plus what to do if it already happened to you.
No sales pitch. Just real, useful information.
Comment "PROTECT" and I'll send you the details!`,
          es: `🔐 ¿Sabías que roban una identidad cada 22 segundos en EE.UU.?
Voy a presentar un taller GRATIS sobre cómo protegerte a ti, a tu familia y tus finanzas del robo de identidad — además de qué hacer si ya te pasó.
Sin ventas. Solo información real y útil.
Comenta "PROTEGER" y te enviaré los detalles.`,
        },
      },
      {
        id: "idtheft-2",
        title: { en: "Talking Point: Why It Matters", es: "Punto Clave: Por Qué Importa" },
        tags: ["talking-point"],
        body: {
          en: `Identity theft isn't just a stolen credit card — it can mean months of your life spent untangling fraud, drained accounts, damaged credit, and even legal trouble for crimes you didn't commit. Most people don't think about protection until after it happens. That's exactly why we're doing this workshop now, before it's needed.`,
          es: `El robo de identidad no es solo una tarjeta de crédito robada — puede significar meses de tu vida tratando de resolver fraudes, cuentas vaciadas, crédito dañado, e incluso problemas legales por delitos que no cometiste. La mayoría de las personas no piensa en protegerse hasta que ya les pasó. Por eso hacemos este taller ahora, antes de que lo necesites.`,
        },
      },
    ],
  },
  {
    id: "opening-scripts",
    label: { en: "Opening & Follow-Up Scripts", es: "Guiones de Apertura y Seguimiento" },
    description: {
      en: "First-touch messages and follow-ups for warm and cold leads.",
      es: "Mensajes de primer contacto y seguimiento para leads.",
    },
    items: [
      {
        id: "opening-1",
        title: { en: "Warm Lead First Message", es: "Primer Mensaje para Lead Cálido" },
        tags: ["lead", "first-touch"],
        body: {
          en: `Hi [Name]! This is Carmen — you recently showed interest in learning more about protecting your family legally and financially. I'd love to share a quick overview with you, no pressure at all. Would mornings or evenings work better for a 10-minute call this week?`,
          es: `¡Hola [Nombre]! Soy Carmen — recientemente mostraste interés en aprender más sobre cómo proteger a tu familia legal y financieramente. Me encantaría compartirte un resumen rápido, sin ninguna presión. ¿Te funciona mejor en la mañana o en la tarde para una llamada de 10 minutos esta semana?`,
        },
      },
      {
        id: "opening-2",
        title: { en: "3-Day Follow-Up", es: "Seguimiento de 3 Días" },
        tags: ["follow-up"],
        body: {
          en: `Hey [Name], just following up on the info I sent a few days ago! No rush at all — just wanted to see if you had any questions, or if now isn't the right time, that's totally okay too. 😊`,
          es: `Hola [Nombre], solo dando seguimiento a la información que te envié hace unos días. Sin prisa — solo quería ver si tenías alguna pregunta, o si ahora no es el momento adecuado, está totalmente bien también. 😊`,
        },
      },
      ...openingExtraItems,
    ],
  },
  {
    id: "objections",
    label: { en: "Objection Handling", es: "Manejo de Objeciones" },
    description: {
      en: "Ready responses for common questions and hesitations.",
      es: "Respuestas listas para preguntas y dudas comunes.",
    },
    items: [
      {
        id: "objection-1",
        title: { en: "\"Is this a pyramid scheme?\"", es: "\"¿Es esto una pirámide?\"" },
        tags: ["objection"],
        body: {
          en: `Totally fair question! LegalShield has been in business since 1972, is publicly recognized, and pays out for actual legal/identity theft services used — not just for recruiting. You (and your team, if you build one) earn from real memberships being used by real families. I'm happy to walk you through exactly how compensation works.`,
          es: `¡Muy buena pregunta! LegalShield existe desde 1972, es una empresa reconocida públicamente, y paga por servicios legales y de protección de identidad realmente utilizados — no solo por reclutar. Tú (y tu equipo, si decides construir uno) ganan por membresías reales que familias reales están usando. Con gusto te explico exactamente cómo funciona la compensación.`,
        },
      },
      {
        id: "objection-2",
        title: { en: "\"I don't have time\"", es: "\"No tengo tiempo\"" },
        tags: ["objection"],
        body: {
          en: `I hear that a lot, honestly! That's actually why so many people start this alongside their current job — it's built to work in the time you already have, even if that's just a few hours a week. Can I show you what that could realistically look like for you?`,
          es: `Escucho eso muy seguido, honestamente. De hecho, por eso muchas personas empiezan esto junto con su trabajo actual — está diseñado para funcionar con el tiempo que ya tienes, aunque sean solo unas horas a la semana. ¿Te puedo mostrar cómo se vería eso realísticamente para ti?`,
        },
      },
      ...objectionsExtraItems,
    ],
  },
  ...networkingAndLnaBoards,
  hostANightBoard,
  incomeTrackerBoard,
  onboardingBoard,
];
