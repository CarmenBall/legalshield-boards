import { BoardCategory } from "@/types";

export const networkingAndLnaBoards: BoardCategory[] = [
  {
    id: "networking",
    label: { en: "Networking Event Invites", es: "Invitaciones a Eventos de Networking" },
    description: {
      en: "Posts and messages to fill seats at your live networking events.",
      es: "Publicaciones y mensajes para llenar tu próximo evento de networking en vivo.",
    },
    items: [
      {
        id: "networking-1",
        title: { en: "Networking, Opportunity & Trivia — Event Invite", es: "Networking, Oportunidad y Trivia — Invitación al Evento" },
        tags: ["event", "facebook", "instagram"],
        body: {
          en: `🎉 Let's get in a room together — Networking, Opportunity & Trivia!
📍 303 Sports Grill, Lone Tree, CO
🗓️ [Date] at [Time]
Come meet other driven people in the area, hear about a couple of exciting opportunities (no pressure, just info), and stick around for trivia — prizes included. 🍻
Bring a friend, bring your business cards, and come ready to connect.
Comment "IN" or send me a message and I'll save you a spot!`,
          es: `🎉 ¡Vamos a reunirnos en persona — Networking, Oportunidad y Trivia!
📍 303 Sports Grill, Lone Tree, CO
🗓️ [Fecha] a las [Hora]
Ven a conocer a otras personas emprendedoras de la zona, escucha sobre un par de oportunidades interesantes (sin presión, solo información), y quédate para la trivia — con premios incluidos. 🍻
Trae a un amigo, trae tus tarjetas de presentación, y ven listo para conectar.
Comenta "VOY" o envíame un mensaje y te reservo un lugar.`,
        },
      },
      {
        id: "networking-2",
        title: { en: "Personal Invite DM/Text", es: "Invitación Personal por Mensaje" },
        tags: ["dm", "text"],
        body: {
          en: `Hey! I'm hosting a fun networking night — good food, good people, a little trivia, and a couple of business opportunities worth hearing about. No pitch, no pressure, just a good time. It's at 303 Sports Grill in Lone Tree on [Date]. Want me to save you a seat?`,
          es: `¡Hola! Voy a organizar una noche de networking divertida — buena comida, buena gente, algo de trivia, y un par de oportunidades de negocio que vale la pena escuchar. Sin presión, solo un buen rato. Es en 303 Sports Grill en Lone Tree el [Fecha]. ¿Quieres que te reserve un lugar?`,
        },
      },
      {
        id: "networking-3",
        title: { en: "Day-Of Reminder Post", es: "Recordatorio del Día del Evento" },
        tags: ["reminder", "event"],
        body: {
          en: `⏰ Tonight's the night! Networking, Opportunity & Trivia at 303 Sports Grill in Lone Tree — doors open at [Time].
If you RSVP'd, can't wait to see you. If you didn't and you're free tonight... there's still room. Come on out! 🎯`,
          es: `⏰ ¡Esta noche es la noche! Networking, Oportunidad y Trivia en 303 Sports Grill en Lone Tree — abrimos puertas a las [Hora].
Si ya confirmaste, no puedo esperar a verte. Si no confirmaste y estás libre esta noche... todavía hay lugar. ¡Ven! 🎯`,
        },
      },
    ],
  },
];
