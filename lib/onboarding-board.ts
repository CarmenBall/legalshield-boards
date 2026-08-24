import { BoardCategory } from "@/types";

export const onboardingBoard: BoardCategory = {
  id: "onboarding",
  label: { en: "Team Onboarding", es: "Incorporación del Equipo" },
  description: {
    en: "Welcome messages, checklists, and ground rules for new team members.",
    es: "Mensajes de bienvenida, listas de verificación y reglas básicas para nuevos miembros del equipo.",
  },
  items: [
    {
      id: "onboarding-1",
      title: { en: "Welcome Message to New Recruit", es: "Mensaje de Bienvenida para Nuevo Recluta" },
      tags: ["welcome", "first-touch"],
      body: {
        en: `Welcome to the team, [Name]! 🎉 I'm genuinely excited to have you here.
Here's what happens next:
1️⃣ I'll add you to our team group chat so you can meet everyone.
2️⃣ You'll get access to this Boards library — everything you need (scripts, posts, talking points) lives here in English and Spanish.
3️⃣ We'll hop on a quick call this week to walk through your first steps and answer any questions.
This works because we duplicate what's already working — you don't have to reinvent anything. Just plug in, follow the system, and lean on me anytime.
So glad you're here. Let's go! 💪`,
        es: `¡Bienvenido/a al equipo, [Nombre]! 🎉 Estoy genuinamente emocionada de tenerte aquí.
Esto es lo que sigue:
1️⃣ Te voy a agregar a nuestro chat de grupo del equipo para que conozcas a todos.
2️⃣ Tendrás acceso a esta biblioteca de Boards — todo lo que necesitas (guiones, publicaciones, puntos clave) está aquí en inglés y español.
3️⃣ Haremos una llamada rápida esta semana para repasar tus primeros pasos y responder tus preguntas.
Esto funciona porque duplicamos lo que ya está funcionando — no tienes que reinventar nada. Solo conéctate, sigue el sistema, y apóyate en mí cuando quieras.
Qué alegría tenerte aquí. ¡Vamos! 💪`,
      },
    },
    {
      id: "onboarding-2",
      title: { en: "First 7 Days Checklist", es: "Lista de Verificación de los Primeros 7 Días" },
      tags: ["checklist", "getting-started"],
      body: {
        en: `✅ Day 1: Set up your LegalShield associate account and log into your back office.
✅ Day 1: Join the team group chat and introduce yourself.
✅ Day 2: Read through the Recruiting & Opportunity Posts and Opening & Follow-Up Scripts boards.
✅ Day 3: Make your first list of 20-30 warm contacts — people you already know.
✅ Day 4: Send your first 5 personal messages using the Opening Scripts board (swap in your own voice, keep the core message).
✅ Day 5: Book your first overview call or Zoom invite.
✅ Day 6: Review the Objection Handling board so you're ready for common questions.
✅ Day 7: Check in with me — let's talk about what's working and what to adjust.
Small consistent actions beat big sporadic ones. Just keep moving one day at a time.`,
        es: `✅ Día 1: Configura tu cuenta de asociado de LegalShield e ingresa a tu oficina virtual.
✅ Día 1: Únete al chat de grupo del equipo y preséntate.
✅ Día 2: Lee los tableros de Reclutamiento y Publicaciones de Oportunidad y Guiones de Apertura y Seguimiento.
✅ Día 3: Haz tu primera lista de 20-30 contactos cercanos — personas que ya conoces.
✅ Día 4: Envía tus primeros 5 mensajes personales usando el tablero de Guiones de Apertura (usa tu propia voz, mantén el mensaje central).
✅ Día 5: Agenda tu primera llamada de presentación o invitación por Zoom.
✅ Día 6: Repasa el tablero de Manejo de Objeciones para estar listo/a con preguntas comunes.
✅ Día 7: Hagamos check-in — hablemos de qué está funcionando y qué ajustar.
Pequeñas acciones constantes superan a las grandes acciones esporádicas. Solo sigue avanzando un día a la vez.`,
      },
    },
    {
      id: "onboarding-3",
      title: { en: "Branding & Compliance Reminders", es: "Recordatorios de Marca y Cumplimiento" },
      tags: ["compliance", "branding"],
      body: {
        en: `A few non-negotiables as you start posting and messaging:
🛑 Only use official LegalShield logos, colors, and approved language — no edited or unofficial graphics.
🛑 Don't guarantee income or make specific earnings promises — share real stories with context, not guarantees.
🛑 Don't make legal claims beyond what's in official materials — when in doubt, ask me first.
✅ Use the scripts on these Boards as your foundation — they're written to stay compliant while still sounding like you.
✅ When you're unsure if something is okay to post, send it to me before you publish it. Takes 2 minutes and saves headaches later.
This protects you, our team, and the company. Thank you for taking it seriously!`,
        es: `Algunas reglas no negociables al empezar a publicar y enviar mensajes:
🛑 Usa solo logotipos, colores y lenguaje oficial y aprobado de LegalShield — sin gráficos editados o no oficiales.
🛑 No garantices ingresos ni hagas promesas específicas de ganancias — comparte historias reales con contexto, no garantías.
🛑 No hagas afirmaciones legales más allá de lo que dicen los materiales oficiales — si tienes dudas, pregúntame primero.
✅ Usa los guiones de estos Boards como tu base — están escritos para mantenerse en cumplimiento sin dejar de sonar como tú.
✅ Cuando no estés seguro/a si algo está bien para publicar, envíamelo antes de publicarlo. Toma 2 minutos y evita problemas después.
Esto te protege a ti, a nuestro equipo, y a la empresa. ¡Gracias por tomarlo en serio!`,
      },
    },
    {
      id: "onboarding-4",
      title: { en: "How to Use This Boards App", es: "Cómo Usar Esta Aplicación de Boards" },
      tags: ["how-to", "training"],
      body: {
        en: `Quick guide to this library:
1. Pick a Board from the left menu based on what you're doing (recruiting, follow-up, objections, events, etc.).
2. Toggle English/Español at the top depending on who you're messaging.
3. Hit "Copy" on any card — it copies the full script to your clipboard.
4. Paste it into your text, DM, or post, then personalize the [brackets] with the real name/date/details.
5. Always send it in your own words when possible — think of these as a starting point, not a script to recite word-for-word.
That's it! No downloads, no logins, just open the link and go.`,
        es: `Guía rápida de esta biblioteca:
1. Elige un tablero del menú izquierdo según lo que estés haciendo (reclutamiento, seguimiento, objeciones, eventos, etc.).
2. Cambia entre inglés/Español arriba según a quién le estés escribiendo.
3. Presiona "Copiar" en cualquier tarjeta — copia el guion completo a tu portapapeles.
4. Pégalo en tu mensaje de texto, DM, o publicación, y luego personaliza los [corchetes] con el nombre/fecha/detalles reales.
5. Siempre envíalo con tus propias palabras cuando sea posible — piensa en esto como un punto de partida, no un guion para recitar palabra por palabra.
¡Eso es todo! Sin descargas, sin inicios de sesión, solo abre el enlace y listo.`,
      },
    },
    {
      id: "onboarding-5",
      title: { en: "Set Up Your Personal Link", es: "Configura Tu Enlace Personal" },
      tags: ["personal-link", "getting-started", "how-to"],
      body: {
        en: `Every associate should have their own Opportunity Page, VIP Form, and Leads link — not just Carmen's. Here's why it matters and how to do it:
Why: when a prospect fills out YOUR link, that lead is automatically tagged with your name in our shared lead system, so it's clear you're the one following up. It also lets you tell your own "why," not someone else's — and your leads are locked behind a PIN only you know.
How to set it up:
1️⃣ Go to the "Get My Link" button at the top of this app (or visit /join directly).
2️⃣ Enter your name, phone number, and — optional but recommended — a few sentences in your own words about why you started this business.
3️⃣ Create a PIN (4 to 6 digits). This is what unlocks your private Leads page — pick something you'll remember, and don't share it with teammates.
4️⃣ You'll instantly get THREE personal links: your Opportunity Page (share this to introduce people to the business), your VIP Form (share this to book their Zoom overview seat), and your Leads link (private — you'll need your PIN every time to view them).
5️⃣ Bookmark all three links right away. Your Opportunity Page and VIP Form can be found again anytime under "Team Links" at the top of this app — but your private Leads link and PIN are only shown once, on the confirmation screen after you sign up, so save them somewhere safe (notes app, bookmark, etc.).
6️⃣ Use your Opportunity Page and VIP Form in your posts, DMs, and follow-ups instead of generic ones.
That's it — five minutes now, and every lead you bring in from that point forward is automatically tracked as yours and locked behind your own PIN (Carmen can see everyone's for coaching and team support).`,
        es: `Cada asociado/a debería tener su propia Página de Oportunidad, Formulario VIP, y enlace de Leads — no solo el de Carmen. Esto es por qué importa y cómo hacerlo:
Por qué: cuando un prospecto llena TU enlace, ese contacto se etiqueta automáticamente con tu nombre en nuestro sistema compartido de leads, así queda claro que tú eres quien debe dar seguimiento. También te permite compartir tu propio "por qué", no el de otra persona — y tus leads quedan protegidos con un PIN que solo tú conoces.
Cómo configurarlo:
1️⃣ Ve al botón "Mi Enlace" en la parte superior de esta aplicación (o visita /join directamente).
2️⃣ Ingresa tu nombre, número de teléfono, y — opcional pero recomendado — unas frases con tus propias palabras sobre por qué empezaste este negocio.
3️⃣ Crea un PIN (de 4 a 6 dígitos). Esto es lo que desbloquea tu página privada de Leads — elige algo que recuerdes, y no lo compartas con tus compañeros/as.
4️⃣ Obtendrás al instante TRES enlaces personales: tu Página de Oportunidad (compártela para presentar el negocio), tu Formulario VIP (compártelo para reservar su cupo en el Zoom), y tu enlace de Leads (privado — necesitarás tu PIN cada vez para verlos).
5️⃣ Guarda los tres enlaces de inmediato. Tu Página de Oportunidad y Formulario VIP los puedes encontrar de nuevo cuando quieras en "Enlaces del Equipo" en la parte superior de esta aplicación — pero tu enlace privado de Leads y tu PIN solo se muestran una vez, en la pantalla de confirmación después de registrarte, así que guárdalos en un lugar seguro (notas del teléfono, marcador, etc.).
6️⃣ Usa tu Página de Oportunidad y Formulario VIP en tus publicaciones, mensajes directos y seguimientos en lugar de los genéricos.
Eso es todo — cinco minutos ahora, y cada contacto que generes desde ese momento se rastrea automáticamente como tuyo y queda protegido con tu propio PIN (Carmen puede ver los de todos para dar coaching y apoyo al equipo).`,
      },
    },
  ],
};
