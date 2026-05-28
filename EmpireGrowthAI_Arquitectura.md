# EmpireGrowth.AI — Documento de Arquitectura y Plan por Fases
### Portal de Clientes con Asistente IA "JARVIS" · Estilo JARVIS · Construido sobre GoHighLevel · Sin dependencia de Meta

> **Para Claude Code:** Este documento es la guía de construcción del proyecto. Antes de construir nada, léelo completo y propón un plan paso a paso. La filosofía es: entender primero, construir después. Empezar SIEMPRE por la Fase 1.

---

## 1. Resumen ejecutivo

**Qué estamos construyendo:** un portal privado para los clientes de EmpireGrowth.AI — agentes y dueños de agencias de seguros de vida — donde cada cliente inicia sesión con su propio usuario y contraseña y es recibido por un asistente de IA llamado "JARVIS" que le habla con voz, le lee el estado real de su negocio (leads y citas) y le da soporte como si fuera el propio Tony.

**Por qué importa — el portal ES el vendedor:** el momento estrella ocurre cuando el cliente, en su oficina y frente a otros agentes, activa el sistema con un aplauso doble. El motor "arranca en verde", un número grande se infla contando hacia arriba, y JARVIS dice en voz alta: "Buenos días, [nombre]. Hoy te han llegado 8 leads. En los últimos 7 días, 47 leads y 12 citas. Nuestro motor sigue trayendo clientes calificados." Ese instante, escuchado por otros agentes, es el mejor argumento de venta del servicio.

### Decisiones de fondo ya tomadas
1. **GoHighLevel, no Meta.** Toda la información (leads, citas, conversaciones) se lee de GHL. Se descarta Meta para eliminar verificaciones y App Review, y evitar el riesgo de bloqueo de cuenta publicitaria que ya ocurrió una vez.
2. **El portal es la única cara visible.** El cliente vive solo dentro del portal JARVIS. GHL queda 100% escondido por detrás: protege la marca, la seguridad y el show.
3. **Creación automática de la sub-cuenta.** Al registrarse, la sub-cuenta de GHL del cliente se crea sola, clonada de un molde (Snapshot) y personalizada con sus datos.
4. **Landings HTML custom.** Las landing pages de captura las diseña el equipo de EmpireGrowth.AI a mano, con calidad propia — no se usan las plantillas genéricas de GHL.
5. **Soporte con IA-filtro.** JARVIS intenta resolver todo lo que pueda; si el problema requiere configurar o intervenir, escala al equipo humano con un diagnóstico ya hecho.

### Las cifras que definen el diseño
- Precio por cliente (onboarding): **$3,000 USD**
- Clientes nuevos por mes: **~20 (5 por semana)**
- Clientes activos al cabo de 12 meses: **~240 acumulados**
- Fuente de datos del negocio: **GoHighLevel API v2**
- Cara visible para el cliente: **Solo el portal JARVIS**

La verdadera razón de ser de JARVIS está en estas cifras: en el mes 12 nadie puede dar soporte personal a 240 clientes a mano, pero una IA con el cerebro de Tony sí.

---

## 2. El viaje del cliente (de la compra al "guau")

### 2.1. Registro y creación automática
1. **El cliente compra.** Paga los $3,000. Recibe por correo un enlace de acceso a la plataforma de registro.
2. **Crea su cuenta.** Crea su propio usuario y contraseña en una página de registro de EmpireGrowth.AI.
3. **Entrega sus datos.** En el registro se capturan: nombre, correo, teléfono, estado(s) con licencia, qué producto/seguro vende, y una imagen (y/o foto de licencia).
4. **Se crea su GHL automáticamente.** El sistema clona el molde (Snapshot) y lo personaliza con esos datos, creando su sub-cuenta de GHL ya lista. El cliente nunca ve esto.

### 2.2. Bienvenida y agendamiento
1. **Video de bienvenida.** Al entrar, ve un video corto (Tony explicando el proceso).
2. **Se desbloquea un botón.** Al terminar el video aparece el botón para continuar.
3. **Calendario de onboarding.** El botón abre el calendario para agendar la reunión de onboarding.
4. **Página de confirmación / checklist.** Al confirmar, pasa a una página con un botón grande "Entra a tu sistema", que lo lleva al portal JARVIS — nunca a GHL crudo.

**Nota de seguridad (lección de la crisis pasada):** El cliente nunca accede directamente a GoHighLevel. Toda la información de GHL se muestra dentro del portal. Esto evita que un cliente rompa un pipeline por error y protege la "salsa secreta" de EmpireGrowth.AI.

---

## 3. Creación automática de la sub-cuenta

### 3.1. El molde (Snapshot) + los datos del cliente
GHL tiene una herramienta hecha para esto: el **Snapshot**, un molde que captura una sub-cuenta completa (calendario, pipelines, flujos, plantillas) y la clona en segundos. El equipo arma UNA vez la sub-cuenta maestra del agente de seguros y la convierte en molde; ese molde sirve para los 240 clientes.

Los datos específicos de cada cliente (su producto, estado, nombre) entran por los **Custom Values** — espacios en blanco dentro de la plantilla que se rellenan con su información. Así cada sub-cuenta nace personalizada.

### 3.2. Las landings: HTML custom, no plantillas de GHL
Las landing pages de captura de leads NO usan las plantillas genéricas de GHL (no cumplen el estándar visual de la marca). Las diseña el equipo de EmpireGrowth.AI a mano, con calidad propia. La landing capta el lead y lo envía a GHL, que sigue siendo el motor por detrás.

**Dos detalles críticos del Snapshot:**
- **Mantener el molde vivo:** cada mejora que se haga a una cuenta de cliente debe evaluarse para incluirla en el molde, o el sistema se queda atrás de sus propias buenas prácticas.
- **Evitar fuga de datos:** antes de capturar el molde, los valores personalizados deben estar vacíos o con texto de marcador — nunca con datos reales de un cliente, o se clonarían en otras cuentas.

### 3.3. La identidad visual de JARVIS
JARVIS NO es un avatar con forma de robot ni un personaje con cara. Es una presencia de inteligencia pura: una **esfera de energía hecha de partículas de luz** que flota, vibra y respira, inspirada directamente en la JARVIS de las películas de Iron Man. Esta esfera es la cara del sistema: aparece en el login, late en reposo y se intensifica cuando JARVIS habla (sus partículas se agitan al ritmo de la voz).

Elementos que la hacen sentir "JARVIS" (no una simple bola de luz):
- Filamentos de datos curvándose por dentro, como corrientes de información.
- Anillos orbitales que la envuelven en distintos ángulos, dando estructura.
- Segmentos de datos que parpadean en la superficie, como pequeños paneles.
- Un núcleo brillante en el centro que pulsa y se enciende al hablar.

**Color:** cyan eléctrico sobre negro espacial profundo, coherente con todo el sistema (login, reactor, el Arranque del Motor). La JARVIS de la película es dorada, pero se mantiene el cyan para una identidad de marca única de punta a punta.

**Nota técnica:** los efectos exactos de la película se renderizan con software 3D profesional y millones de partículas, imposible de replicar al 100% en una web en vivo sin que se trabe. El portal real usará una librería 3D (Three.js) para acercarse al nivel de cine — más partículas, profundidad volumétrica y filamentos densos — manteniendo la fluidez en cualquier computadora.

**Nota sobre el nombre:** "JARVIS" es la IA de las películas de Iron Man (marca de Marvel/Disney). Para uso interno y demos no hay problema; si el sistema crece y el nombre se usa de cara pública o comercial, conviene considerar un nombre propio igual de épico para evitar un conflicto de marca.

---

## 4. "El Arranque del Motor" — el corazón del show

La pieza de marketing más importante. No es adorno: es lo que cierra ventas. Estilo épico y cinematográfico, tipo encendido de nave espacial.

### 4.1. La secuencia, segundo a segundo
1. **Aplauso doble.** El micrófono del navegador detecta dos picos de sonido y dispara la secuencia. (Hay un botón de respaldo por si hay ruido.)
2. **El motor arranca en verde.** Los anillos del reactor JARVIS cobran vida con fuerza y pulsan en verde.
3. **Los números se inflan.** Un número grande cuenta hacia arriba desde 0 hasta el valor real. Se muestran dos historias: "Hoy" (el sistema está vivo ahora) y "Últimos 7 días" (es una máquina constante).
4. **JARVIS narra con voz.** Mientras los números suben, JARVIS habla y cierra con "¿En qué te puedo ayudar hoy?"

**Regla de oro del show:** El número que se infla DEBE ser real, leído de GHL. Si se infla a 47 y el agente sabe que tuvo 6, el show se vuelve burla delante de testigos y mata la venta. La animación es el envoltorio; el dato verdadero es el regalo.

### 4.2. Por qué el número debe estar pre-calculado
El número no se consulta a GHL en el instante del aplauso (eso añadiría una pausa incómoda y rozaría el límite de llamadas). El servidor mantiene los conteos ya pre-calculados y actualizados por detrás, de modo que al aplaudir el número aparece al instante. El show debe ser inmediato.

---

## 5. Soporte: JARVIS y la IA-filtro

### 5.1. La biblioteca de capacitación
Módulos en video organizados como biblioteca. Cuando un problema se resuelve mostrando algo, JARVIS responde de doble vía: entrega el video del módulo correcto Y el resumen escrito en el chat, al mismo tiempo. Así el cliente elige — ve el video completo si quiere, o lee el resumen rápido si tiene prisa.

Ejemplo, ante "tengo un error de pago": "Perfecto, te ayudo. El señor Antonio me entrenó para esto — aquí te dejo el video explicativo, y te lo resumo también: paso 1… paso 2… paso 3…". El detalle de marca "me entrenó Antonio" deja claro que no es un bot genérico, sino el cerebro de EmpireGrowth.AI.

Temas de los módulos: encontrar leads, resolver el método de pago, lanzar campañas, leer métricas, WhatsApp y seguimiento, el reporte semanal.

### 5.2. La regla del filtro inteligente
La línea divisoria es clara y prudente:
- **Lo resuelve la IA:** todo lo que se arregle hablando, explicando, conteniendo o mostrando un video — dudas, expectativas ("me llegan pocos leads" cuando en realidad va bien), cómo encontrar leads, tutoriales.
- **Lo escala al humano:** todo lo que requiera configurar o intervenir de verdad — "me están llegando muy pocos leads" cuando la campaña realmente falló, problemas de pago reales, cualquier cosa que implique meter mano. La IA NO improvisa aquí.

Esta regla es honesta con lo que la IA hace bien (explicar, guiar, contener) y prudente con lo que no debe hacer sola (tocar configuraciones que pueden romper algo o costar dinero) — la lección de la crisis pasada aplicada al diseño.

### 5.3. El escalamiento con diagnóstico
Cuando la IA-filtro escala un caso a Mauro o Alejandra, no les llega "pelado": les llega un resumen ya masticado. Por ejemplo: "Cliente X dice que tiene pocos leads. Revisé su GHL: bajó de 40 a 8 esta semana; su campaña parece pausada. Sugiero revisar configuración." El humano llega con el diagnóstico hecho y solo ejecuta. El diagnóstico de la IA es una sugerencia — el humano confirma antes de actuar.

---

## 6. Arquitectura técnica

### 6.1. Las cuatro piezas
| Pieza | Qué hace |
|---|---|
| **Portal JARVIS** | La única cara visible. Login, video, el Arranque del Motor, chat de voz con JARVIS, biblioteca de capacitación y reportes. |
| **Servidor (backend)** | El cerebro central 24/7. Recibe webhooks de GHL, guarda datos, mantiene los conteos pre-calculados, renueva tokens, conversa con la IA, crea sub-cuentas. Sin esto no hay "ha llegado un lead". |
| **Base de datos** | Clientes (usuario y contraseña cifrada), amarre de cada cliente con su sub-cuenta de GHL, conteos de leads y citas, casos de soporte. |
| **IA JARVIS** | La API de Claude con el "cerebro" de Tony. Da soporte, conecta con módulos, actúa como filtro y arma diagnósticos para el equipo. |

### 6.2. Las tres llaves (no confundirlas)
- **Identidad:** usuario y contraseña del cliente. Abren la puerta del portal. Contraseñas siempre cifradas (hasheadas), nunca en texto plano.
- **Amarre:** la base de datos dice qué sub-cuenta de GHL le toca a cada cliente. Vive del lado de EmpireGrowth.AI.
- **Acceso a GHL:** token OAuth / Private Integration de la API de GHL. El servidor lo guarda de forma segura (variable de entorno, nunca en el código a la vista).

### 6.3. Notas reales de la API de GoHighLevel (verificadas 2026)
- GHL usa exclusivamente **API v2 sobre OAuth 2.0**. Las API keys viejas están descontinuadas.
- Datos clave de cuatro recursos: **Contactos** (leads), **Oportunidades** (pipeline), **Conversaciones** y **Calendario** (citas).
- Los access tokens OAuth expiran cada 24h; el servidor los renueva solo con el refresh token o las llamadas fallan (error 401). (Nota: para empezar se usa una Private Integration con token estable.)
- GHL avisa al servidor al instante (webhooks) cuando entra un lead o se agenda una cita — esto alimenta los conteos pre-calculados.
- Hay límite de llamadas (error 429 si se excede). Con 240 clientes es manejable; los conteos pre-calculados ayudan a no rozarlo.
- La creación automática de sub-cuentas se hace combinando la API con Snapshots; el molde se arma una vez a mano.

### 6.4. Scopes de la Private Integration (ya creada)
La conexión privada a GHL ya está creada. Para la Fase 2 se usarán principalmente permisos de lectura sobre: contactos, calendarios, oportunidades y conversaciones. Agregar permisos de escritura solo cuando una función concreta lo requiera (principio de mínimo privilegio).

---

## 7. Plan de construcción por fases

La filosofía, en palabras de Tony: "a medida que va pasando el tiempo, endurecemos el sistema". Se construye lo necesario cuando se necesita.

### Fase 1 — El portal vendedor (arrancar ya)
- Portal JARVIS completo: login, video, el Arranque del Motor (aplauso + motor verde + números que se inflan + voz de JARVIS).
- Chat de voz con JARVIS (API de Claude con el cerebro de Tony) + biblioteca de capacitación.
- Registro del cliente, captura de datos, calendario de onboarding.
- **Objetivo:** tener el "guau" vendible y demostrable cuanto antes — lo que genera la siguiente venta de $3,000.
- **NOTA:** en Fase 1 los números pueden venir de datos de prueba/manuales mientras la conexión viva de GHL llega en Fase 2.

### Fase 2 — La conexión viva con GHL
- Servidor 24/7 con la conexión a GHL (token de Private Integration, webhooks).
- Creación automática de la sub-cuenta (Snapshot + datos del cliente). Landings HTML custom conectadas a GHL.
- Conteos reales de leads y citas pre-calculados alimentando el Arranque del Motor.
- Sistema de IA-filtro con escalamiento y diagnóstico al equipo humano.
- **Objetivo:** que el número del show sea real y en vivo, y que el soporte escale solo cuando hace falta.

### Fase 3 — Endurecer y escalar
- Reportes automáticos de los viernes, recuperación de contraseña, panel de administrador para Tony.
- Refuerzo de seguridad e infraestructura conforme crece el volumen.
- **Objetivo:** sostener cientos de clientes activos sin fricción, automatizando lo repetitivo.

**Lo que NO hay que construir todavía:** Nada de integración con Meta. Nada de infraestructura de "millones de usuarios". No automatizar de más antes de tener los primeros clientes funcionando. Construir de más al inicio malgasta dinero y tiempo.

---

## 8. Próximos pasos sugeridos
1. **Validar este documento.** Revisar que el viaje del cliente y las decisiones reflejen exactamente la visión de Tony.
2. **Definir el "cerebro" de JARVIS.** Reunir material real: cómo Tony le habla a sus clientes, frases, cómo explica un error de pago, cómo motiva, qué nunca diría. Entre más material, más genuino suena.
3. **Crear la app/integración privada en GHL.** (HECHO — Private Integration ya creada con su token guardado de forma segura.)
4. **Armar la sub-cuenta maestra y su Snapshot.** Construir una vez la sub-cuenta perfecta del agente de seguros y convertirla en molde.
5. **Construir la Fase 1 con Claude Code.** Usar este documento como guía de construcción del portal vendedor.

---

*Este documento es un mapa vivo. A medida que se construya, se irá afinando — igual que el sistema, que se endurece con el tiempo.*

## INSTRUCCIÓN PARA CLAUDE CODE
Lee este documento completo. Sin construir nada todavía, explica con tus palabras qué entendiste y propón un plan para empezar la Fase 1 paso a paso. Pregunta lo que no esté claro antes de escribir una sola línea de código. La identidad visual (esfera de partículas cyan estilo JARVIS sobre negro) y el "Arranque del Motor" son el corazón del producto. Empezar SIEMPRE por la Fase 1 (el portal vendedor), no por la conexión a GHL.
