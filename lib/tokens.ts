// Tokens de diseño · EmpireGrowth.AI
// Paleta DORADO sobre NEGRO CARBÓN. Editar aquí actualiza todo.

export const COLORES = {
  oro: "#f2c14e",
  oroBrillante: "#ffd47a",
  oroProfundo: "#7a5d1f",
  oroSombra: "rgba(242, 193, 78, 0.18)",
  carbon: "#0a0a0c",
  carbonClaro: "#141417",
  carbonProfundo: "#050507",
  textoBase: "#f5e9ce",
  textoTenue: "#a89a78",
  textoSombra: "#5a5036",
  borde: "rgba(242, 193, 78, 0.25)",
  bordeFuerte: "rgba(242, 193, 78, 0.55)",
  alerta: "#ff8a4a",
  exito: "#7adb86",
} as const;

export type Color = keyof typeof COLORES;
