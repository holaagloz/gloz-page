# PROMPT PARA CODEX — GLOZ FASE 1

Actúa como **Staff/Senior Frontend Engineer especializado en Angular**, **Lead UI/UX Designer**, **Art Director** y **QA Engineer**.

Vas a construir la primera fase de la página institucional de **Gloz**, un estudio creativo y tecnológico que atiende tanto a emprendimientos como a empresas. La web debe verse premium, contemporánea, editorial y profesional; no debe parecer una plantilla genérica de agencia ni un diseño producido automáticamente.

## Contexto obligatorio
Antes de escribir código, lee y examina estos archivos del repositorio:
- `docs/gloz/reference/brand-manual.pdf` — manual de marca oficial; manda en colores, tipografía y logotipo.
- `docs/gloz/reference/approved-hero-services.png` — **referencia visual APROBADA** para la composición de Hero y Servicios. Revísala de forma visual, no solo por nombre.
- `docs/gloz/GLOZ_DESIGN_SPEC.md` — textos, layout, límites, responsive y QA.

La imagen de referencia es un **mockup conceptual**. No copies el logotipo reinterpretado de esa imagen, ni presentes mockups, pantallas, resultados o marcas hipotéticas como trabajo real. Usa el manual oficial para la identidad. Si no hay un SVG/PNG original del logo disponible, deja un recurso de sustitución claramente identificado como temporal y un TODO concreto. No te inventes un nuevo logo.

## Objetivo de esta iteración
Implementa **únicamente**:
1. Header responsive.
2. Hero editorial premium con panel azul oscuro y composición angular/diagonal.
3. Franja de disciplinas.
4. Sección Servicios con layout asimétrico 7/5 y tres tratamientos gráficos diferenciados.

No implementes todavía Proyectos, Nosotros, Contacto ni el resto de la web. No agregues formularios, backend ni APIs. No inventes enlaces de contacto, testimonios, números de negocio o estadísticas. Los enlaces hacia secciones futuras deben quedar documentados como pendientes, sin anchors falsos.

## Metodología
1. Inspecciona el repositorio y determina si Angular ya está configurado. Respeta la configuración existente cuando sea apropiado; si es un repositorio vacío, inicializa una SPA Angular moderna con componentes standalone, TypeScript estricto y SCSS.
2. Escribe un plan técnico breve que enumere componentes y estructura de archivos; después **implementa**, no te limites a describir.
3. Prioriza la **fidelidad visual** al mockup, respetando el manual y el contenido de la especificación. Evita interpretar el screenshot como una estructura rígida que se rompe al adaptar pantallas.
4. Implementa un diseño mobile-first, semántico, accesible y eficiente. Evita librerías de UI innecesarias y animaciones exageradas.
5. Ejecuta build, linters/pruebas disponibles y revisa el resultado en navegador a 375, 390, 768, 1024, 1280 y 1440 px, preferiblemente con capturas para comparar con la referencia. Corrige los defectos encontrados. Si no tienes navegador, indícalo y entrega instrucciones de comprobación, sin afirmar que realizaste pruebas visuales.
6. Al terminar, resume archivos creados/modificados, comandos para iniciar el proyecto, resultados de validación, elementos pendientes y cualquier recurso visual original que aún deba proporcionar el usuario.

## Criterios de aceptación
- Fidelidad en colores, jerarquía visual, retícula y tratamiento premium de la imagen aprobada.
- Hero con contenido legible y panel editorial que se adapte de forma coherente a escritorio y móvil.
- Tres servicios con arte visual trabajado, sin perder legibilidad ni parecer tarjetas genéricas clonadas.
- Ningún scroll horizontal involuntario, texto recortado, overlay problemático o enlaces simulados.
- Código mantenible; componentes con responsabilidades claras y tokens de marca reutilizables.
- No introducir nuevas secciones ni contenido ficticio sin autorización.

Puedes iniciar la implementación de la FASE 1 ahora.
