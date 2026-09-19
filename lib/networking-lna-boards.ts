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
📍 Alpha Charlie's Tap and Tavern, 6631 S Peoria St, Centennial, CO 80111
🗓️ Tuesdays — Networking & Happy Hour 5:00-6:00 PM, Opportunity Presentation 6:00-6:30 PM, After Party Trivia at 7:00 PM
Come meet other driven people in the area, hear about a couple of exciting opportunities (no pressure, just info), and stick around for trivia — prizes included. 🍻
Bring a friend, bring your business cards, and come ready to connect.
Comment "IN" or send me a message and I'll save you a spot!`,
          es: `🎉 ¡Vamos a reunirnos en persona — Networking, Oportunidad y Trivia!
📍 Alpha Charlie's Tap and Tavern, 6631 S Peoria St, Centennial, CO 80111
🗓️ Martes — Networking y Happy Hour 5:00-6:00 PM, Presentación de Oportunidad 6:00-6:30 PM, Trivia Después de la Fiesta a las 7:00 PM
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
          en: `Hey! I'm hosting a fun networking night — good food, good people, a little trivia, and a couple of business opportunities worth hearing about. No pitch, no pressure, just a good time. It's at Alpha Charlie's Tap and Tavern (6631 S Peoria St, Centennial, CO) on Tuesday — Happy Hour starts at 5:00 PM. Want me to save you a seat?`,
          es: `¡Hola! Voy a organizar una noche de networking divertida — buena comida, buena gente, algo de trivia, y un par de oportunidades de negocio que vale la pena escuchar. Sin presión, solo un buen rato. Es en Alpha Charlie's Tap and Tavern (6631 S Peoria St, Centennial, CO) el martes — el Happy Hour empieza a las 5:00 PM. ¿Quieres que te reserve un lugar?`,
        },
      },
      {
        id: "networking-3",
        title: { en: "Day-Of Reminder Post", es: "Recordatorio del Día del Evento" },
        tags: ["reminder", "event"],
        body: {
          en: `⏰ Tonight's the night! Networking, Opportunity & Trivia at Alpha Charlie's Tap and Tavern (6631 S Peoria St, Centennial, CO) — Happy Hour starts at 5:00 PM.
If you RSVP'd, can't wait to see you. If you didn't and you're free tonight... there's still room. Come on out! 🎯`,
          es: `⏰ ¡Esta noche es la noche! Networking, Oportunidad y Trivia en Alpha Charlie's Tap and Tavern (6631 S Peoria St, Centennial, CO) — el Happy Hour empieza a las 5:00 PM.
Si ya confirmaste, no puedo esperar a verte. Si no confirmaste y estás libre esta noche... todavía hay lugar. ¡Ven! 🎯`,
        },
      },
    ],
  },
];
