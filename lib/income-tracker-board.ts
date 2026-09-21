import { BoardCategory } from "@/types";

export const incomeTrackerBoard: BoardCategory = {
  id: "income-tracker",
  label: { en: "Income & Expense Tracker", es: "Rastreador de Ingresos y Gastos" },
  description: {
    en: "A private Excel tracker for your business income and expenses, plus a quick reference guide for using it and prepping for tax season.",
    es: "Un rastreador privado de Excel para los ingresos y gastos de tu negocio, además de una guía rápida para usarlo y prepararte para la temporada de impuestos.",
  },
  items: [
    {
      id: "income-tracker-1",
      title: { en: "How to Use Your Tracker", es: "Cómo Usar Tu Rastreador" },
      tags: ["how-to", "taxes", "finance"],
      body: {
        en: `INCOME & EXPENSE TRACKER — Quick Reference
CMB Success Team | LegalShield Associate Tracker

1. Enter Transactions in the Monthly Tabs
Each month tab has an INCOME and EXPENSES section. For every transaction, fill in the Date, Description, and Amount next to its category. Amount cells are blue — that's where you type.

2. Check the Dashboard Tab Anytime
The Dashboard automatically totals Income, Expenses, and Net Profit/Loss by month and for the full year, plus an annual breakdown by expense category. Formulas do the math — no manual adding.

3. Use the Quarterly Estimated Taxes Tab
If you expect to owe $1,000+ for the year, the IRS generally requires quarterly payments. This tab pulls quarterly net profit automatically and applies an adjustable tax-rate assumption (default 25%, edit the yellow cell). Planning tool only — confirm exact amounts/dates with a CPA.

4. Keep It Updated Weekly
A few minutes a week logging receipts and income keeps this accurate and saves time at tax season.

5. This File Is Yours to Keep Private
Your numbers stay on your own computer/cloud drive — nothing you enter is shared or visible to anyone else on the team.

6. At Tax Time
Share this workbook with your CPA or tax preparer. It's already organized in a Schedule C–friendly category structure.

INCOME CATEGORIES: New Associate Enrollment Commissions, Membership Sales Commissions (LegalShield), Membership Sales Commissions (IdShield), Performance Club Bonus, Other Bonuses / Incentives, Team Overrides / Bonuses, Event Ticket Sales (Trivia/Networking), Other Income.

EXPENSE CATEGORIES: Purchased Leads, Texting/SMS Engagement System, Super Saturday Event Costs, Weekly Opportunity Briefing Costs, Networking & Trivia Events, Chapter Meeting Costs, LinkedIn Ads / Marketing, Marketing Materials & Design, Website Hosting, Business Cards / Print Collateral, Software & Subscriptions (CRM, tools), Mileage / Travel, Meals & Entertainment (business), Office Supplies, Phone/Internet (business use %), Professional Development / Training, Associate Fees / Dues, Other Expense.

Questions about your tracker or business setup? Reach out to your Regional Manager.`,
        es: `RASTREADOR DE INGRESOS Y GASTOS — Guía Rápida
Equipo CMB Success | Rastreador de Asociado de LegalShield

1. Ingresa las Transacciones en las Pestañas Mensuales
Cada pestaña de mes tiene una sección de INGRESOS y GASTOS. Para cada transacción, completa la Fecha, Descripción, y Cantidad junto a su categoría. Las celdas de cantidad son azules — ahí es donde escribes.

2. Revisa la Pestaña del Tablero (Dashboard) Cuando Quieras
El Dashboard suma automáticamente los Ingresos, Gastos, y Ganancia/Pérdida Neta por mes y para todo el año, además de un desglose anual por categoría de gasto. Las fórmulas hacen las matemáticas — sin sumar manualmente.

3. Usa la Pestaña de Impuestos Estimados Trimestrales
Si esperas deber $1,000 o más en el año, el IRS generalmente requiere pagos trimestrales. Esta pestaña toma la ganancia neta trimestral automáticamente y aplica una tasa de impuesto ajustable (25% por defecto, edita la celda amarilla). Es solo una herramienta de planeación — confirma las cantidades y fechas exactas con un contador (CPA).

4. Manténlo Actualizado Cada Semana
Unos minutos a la semana registrando recibos e ingresos mantiene esto preciso y ahorra tiempo en la temporada de impuestos.

5. Este Archivo Es Tuyo, para Mantener en Privado
Tus números se quedan en tu propia computadora/nube — nada de lo que ingreses se comparte o es visible para nadie más del equipo.

6. En Temporada de Impuestos
Comparte este archivo con tu contador (CPA) o preparador de impuestos. Ya está organizado en una estructura de categorías amigable con el Anexo C (Schedule C).

CATEGORÍAS DE INGRESOS: Comisiones por Inscripción de Nuevos Asociados, Comisiones por Venta de Membresías (LegalShield), Comisiones por Venta de Membresías (IdShield), Bono del Club de Desempeño, Otros Bonos / Incentivos, Anulaciones / Bonos de Equipo, Venta de Boletos para Eventos (Trivia/Networking), Otros Ingresos.

CATEGORÍAS DE GASTOS: Leads Comprados, Sistema de Mensajes de Texto/SMS, Costos del Evento Super Sábado, Costos de la Sesión Semanal de Oportunidad, Eventos de Networking y Trivia, Costos de Reuniones del Capítulo, Anuncios de LinkedIn / Marketing, Materiales de Marketing y Diseño, Alojamiento del Sitio Web, Tarjetas de Presentación / Material Impreso, Software y Suscripciones (CRM, herramientas), Millaje / Viajes, Comidas y Entretenimiento (negocio), Suministros de Oficina, Teléfono/Internet (uso de negocio %), Desarrollo Profesional / Capacitación, Cuotas / Membresía de Asociado, Otro Gasto.

¿Preguntas sobre tu rastreador o la configuración de tu negocio? Contacta a tu Gerente Regional.`,
      },
    },
  ],
};
