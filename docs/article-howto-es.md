# HyperFrames explicandose a si mismo: como arme un video tecnico reproducible desde HTML

> Estado editorial: borrador largo para juanchi.dev.
> Repositorio previsto: https://github.com/JuanTorchia/hyperframes-explains-itself
> Demo principal: `renders/final-demo.mp4`

## La pregunta

Queria probar HyperFrames de una forma que no fuera leer la documentacion, mirar un ejemplo aislado y repetir una conclusion teorica.

La pregunta fue mas concreta:

```text
Puede HyperFrames explicar HyperFrames?
```

No en el sentido marketinero de hacer un video lindo, sino en el sentido tecnico: usar HyperFrames para construir un video sobre HyperFrames y dejar el proceso completo abierto. Codigo fuente, comandos, errores, decisiones, capturas, audio, captions, renders y evidencia.

El objetivo del proyecto no era demostrar que HyperFrames cubre todos los casos posibles. El objetivo era mas honesto: ver si podia armar un flujo reproducible para crear un video tecnico desde HTML y documentar todo lo que paso en el camino.

## Que termine construyendo

El repo termina con una demo final de aproximadamente 90 segundos:

```text
renders/final-demo.mp4
```

Esa demo sale de esta composicion:

```text
video/final-demo/
```

Y tiene evidencia asociada:

```text
video/final-demo/evidence/ffprobe-final-demo.json
video/final-demo/evidence/frame-02s.png
video/final-demo/evidence/frame-30s.png
video/final-demo/evidence/frame-50s.png
video/final-demo/evidence/frame-70s.png
video/final-demo/evidence/frame-88s.png
```

La linea que guio todo el experimento fue:

```text
HTML is the source. MP4 is the artifact.
```

Pero el MP4 no es el centro del proyecto.

El centro es que todo el camino queda auditable. El repo no esta organizado como "aca esta el codigo y suerte". Esta organizado como una bitacora tecnica:

```text
docs/ -> decisiones, planes, auditorias y checklist editorial
JOURNAL.md -> diario cronologico de trabajo
video/final-demo/ -> composicion final, script, storyboard y notas de render
video/final-demo/evidence/ -> FFprobe y frames de muestra
experiments/ -> pruebas chicas, separadas por tema
evidence/ -> evidencia global de corridas
article-assets/ -> mapa editorial de clips, capturas y archivos a citar
renders/ -> artefactos finales
```

Esa estructura es parte de la tesis. Si el video tecnico se construye como software, entonces tambien deberia tener source, validaciones, outputs y evidencia. No quiero un video que solo se vea bien. Quiero un artefacto tecnico cuyo camino se pueda revisar.

Repo publico:

```text
https://github.com/JuanTorchia/hyperframes-explains-itself
```

Demo final:

```text
https://github.com/JuanTorchia/hyperframes-explains-itself/blob/main/renders/final-demo.mp4
```

![Frame de la demo final a los 30 segundos](https://raw.githubusercontent.com/JuanTorchia/hyperframes-explains-itself/main/video/final-demo/evidence/frame-30s.png)

## Paso 1: armar un repo que cuente la historia

Antes de renderizar nada, arme el repositorio como si fuera el material de un post, no solo como una carpeta de pruebas.

Los archivos importantes son:

```text
README.md
JOURNAL.md
docs/007-article-outline.md
docs/017-article-evidence-map.md
docs/018-final-demo-plan.md
article-assets/README.md
```

El mas importante para el tono del post es `JOURNAL.md`. Ahi fui dejando el diario real de trabajo: hipotesis, comandos, errores, fixes y decisiones. Esto cambia mucho el resultado final porque el post no queda como una conclusion fabricada al final. Queda como una reconstruccion del proceso.

La regla editorial fue simple:

```text
No claim without a command, artifact, or documented caveat.
```

Si no habia comando, evidencia o limitacion escrita, no lo podia vender como conclusion.

## Paso 2: instalar HyperFrames como dependencia local

La primera decision fue no depender de un CLI global.

En mi maquina observe:

```text
node --version -> v24.11.1
ffmpeg -version -> command not found
hyperframes --version -> command not found
npm view hyperframes version -> 0.6.80
```

Eso ya marcaba un punto importante: si queria que el repo fuera reproducible, no podia depender de "lo que tengo instalado en mi maquina".

Por eso use HyperFrames como dependencia local del proyecto:

```bash
npm install --save-dev hyperframes
```

El `package.json` quedo con scripts explicitos:

```json
{
  "scripts": {
    "doctor": "hyperframes doctor",
    "doctor:docker": "docker version && docker info",
    "lint": "hyperframes lint",
    "inspect": "hyperframes inspect",
    "check": "npm run lint && npm run inspect",
    "final-demo:check": "hyperframes lint video/final-demo && hyperframes inspect video/final-demo",
    "final-demo:render": "hyperframes render video/final-demo --docker --strict-all --workers 1 --output renders/final-demo.mp4"
  }
}
```

## Paso 3: validar antes de renderizar

El primer loop fue:

```bash
npm run check
```

Ese comando ejecuta:

```bash
hyperframes lint
hyperframes inspect
```

En el primer intento, el proyecto no exploto, pero aparecio una advertencia util: la composicion estaba demasiado densa en un solo archivo. Decidi mantenerla asi en la primera version porque era mas facil de leer, pero deje anotado que si el video crecia habia que separar escenas en sub-composiciones.

Despues las capturas mostraron un bug visual real: todas las escenas quedaban visibles al mismo tiempo y, despues del primer fix, el frame inicial quedo en blanco.

Ese tipo de bug es exactamente lo que queria capturar en el post. No es un detalle menor: si haces video desde HTML, tenes que pensar en estado inicial, visibilidad, timeline y sampling de frames. No alcanza con que el DOM "parezca" bien en un navegador.

El fix fue:

```text
dejar de prender todas las escenas con un selector amplio
definir visibilidad escena por escena
asegurar que el frame 0.0s tenga contenido visible
```

Esa es la razon por la que deje screenshots y contact sheets versionadas:

```text
video/hyperframes-in-60-seconds/screenshots/
video/final-demo/evidence/
```

![Frame inicial de la demo final](https://raw.githubusercontent.com/JuanTorchia/hyperframes-explains-itself/main/video/final-demo/evidence/frame-02s.png)

## Paso 4: elegir Docker como camino principal

FFmpeg no estaba disponible en PATH. Podia instalarlo localmente, pero eso hubiera convertido el tutorial en "funciona en mi maquina".

La decision fue usar Docker como camino principal de render:

```bash
npm run doctor:docker
npm run final-demo:render
```

Esto no elimino todos los problemas. En un primer intento, Docker todavia estaba construyendo la imagen del renderer y el proceso tardo mas de lo esperado. El punto importante fue no ocultarlo:

```text
primer render: timeout mientras Docker construia hyperframes-renderer
segundo render: completo correctamente cuando la imagen ya estaba lista
```

Para un how-to real, eso importa. Si alguien prueba el repo y el primer render tarda, no quiero que piense que rompio algo. Quiero que entienda que la primera corrida puede pagar el costo de construir o bajar imagenes.

## Paso 5: pasar de demo corta a walkthrough tecnico

La primera version era una intro de 60 segundos. Funcionaba, pero era demasiado parecida a un demo comercial.

La cambie por un walkthrough tecnico:

```text
repositorio
composicion HTML
sub-composiciones
validacion
render Docker
formatos de salida
captions
audio
experimentos
errores
limites
```

El video dejo de ser "mira esta herramienta" y paso a ser "mira como la fui probando".

Eso tambien hizo que el articulo tuviera mejor estructura. El video no es el post. El video es una evidencia mas dentro del post.

## Paso 6: agregar voz sin mentir sobre reproducibilidad

Use TTS para generar la voz:

```bash
npm run tts:final-demo
```

Pero aca hay una limitacion importante: la generacion de audio no es tan deterministica como el render HTML + WAV.

Por eso el repo trata el WAV generado como asset fuente:

```text
video/final-demo/assets/audio/final-demo-af-nova.wav
```

La conclusion correcta no es "todo es perfectamente deterministico". La conclusion correcta es:

```text
el render desde HTML + WAV puede reproducirse;
la generacion del WAV es parte del proceso y queda registrada como input.
```

Esa diferencia parece chica, pero editorialmente evita una promesa falsa.

## Paso 7: probar captions automaticos y captions curados

Tambien probe transcripcion y captions.

El aprendizaje fue simple: la maquina puede ayudar con tiempos, pero el texto final necesita criterio editorial.

El repo conserva la evidencia:

```text
experiments/008-captions-layer/evidence/caption-comparison.json
evidence/captions/main-caption-summary.json
renders/hyperframes-in-60-seconds-with-captions.mp4
```

El post deberia mostrar esta idea con claridad:

```text
Whisper ayuda a obtener timing.
El texto final no deberia ser raw Whisper si queres una pieza tecnica legible.
```

Evidencia visual de captions:

![Comparacion de captions](https://raw.githubusercontent.com/JuanTorchia/hyperframes-explains-itself/main/experiments/008-captions-layer/evidence/frames/frame-5s.png)

Esto conecta con como escribo posts tecnicos en general: la IA y las herramientas aceleran, pero no reemplazan la edicion.

## Paso 8: crear experimentos chicos para no inflar claims

En vez de decir "HyperFrames soporta muchas cosas", arme pruebas separadas:

```text
experiments/001-media-timing
experiments/002-output-formats
experiments/008-captions-layer
experiments/009-track-attributes
experiments/010-social-aspects
experiments/011-render-controls
experiments/012-waapi-adapter
experiments/013-adapter-sampler
experiments/014-mov-output
experiments/015-remove-background
experiments/016-init-template
```

Cada experimento intenta probar una superficie chica:

```text
media timing
WebM
PNG sequence
MOV con alpha
captions
formatos sociales
calidad/bitrate/CRF
WAAPI
Three.js / Anime.js / D3 / Lottie / PixiJS con bridges locales
background removal
init scaffold
```

La carpeta `experiments/` es casi una tabla de contenido tecnica del articulo. No es relleno. Cada subcarpeta existe para que un claim tenga un lugar donde mirar.

Ejemplos:

```text
experiments/008-captions-layer -> captions automaticos vs curados
experiments/010-social-aspects -> landscape, portrait y square
experiments/013-adapter-sampler -> bridges locales con librerias browser
experiments/014-mov-output -> ProRes MOV con alpha-capable pixel format
experiments/015-remove-background -> salida PNG con alpha samples
```

![Prueba PixiJS sincronizada al timeline](https://raw.githubusercontent.com/JuanTorchia/hyperframes-explains-itself/main/experiments/013-adapter-sampler/evidence/frame-pixi.png)

Esto hace el post mas fuerte porque no depende de una frase grande. Depende de muchas pruebas chicas.

## Paso 9: documentar cuando algo no prueba lo que parecia

Hubo varias cosas que no queria vender de mas.

Por ejemplo, los adapters. La documentacion menciona adapters, pero durante esta corrida el paquete `@hyperframes/adapters` no estaba instalable desde npm como esperaba. Entonces el repo prueba bridges locales con `hf-seek`, no una afirmacion amplia sobre todos los paquetes oficiales.

La forma honesta de escribirlo es:

```text
Probamos integraciones locales con varias librerias de animacion.
Eso es evidencia de que se puede sincronizar animacion browser-side con el timeline.
No es evidencia de que todos los adapters oficiales esten publicados e instalables.
```

Otro ejemplo fue background removal. El primer fixture era un icono plano y el resultado no servia como prueba. Despues use un retrato real de dominio publico y valide alpha samples.

Ese error deberia estar en el post. No lo sacaria. Es lo que convierte el articulo en experiencia real.

![Salida de background removal usada como evidencia](https://raw.githubusercontent.com/JuanTorchia/hyperframes-explains-itself/main/experiments/015-remove-background/output/scott-carpenter-portrait-transparent.png)

## Paso 10: cerrar con una demo final y evidencia FFprobe

La demo final se renderizo con:

```bash
npm run final-demo:check
npm run final-demo:render
```

Resultado:

```text
renders/final-demo.mp4
duration: 90.048s
video: h264, 1920x1080, 30fps
audio: aac, stereo, 48000Hz
size: 7,159,192 bytes
```

Ese dato sale de:

```text
video/final-demo/evidence/ffprobe-final-demo.json
```

Otros artefactos para revisar:

```text
MP4 final: renders/final-demo.mp4
Walkthrough original: renders/hyperframes-in-60-seconds.mp4
Walkthrough con captions: renders/hyperframes-in-60-seconds-with-captions.mp4
MOV alpha proof: experiments/014-mov-output/output/mov-alpha-proof.mov
```

Para mi, esta es la diferencia entre "hice una demo" y "deje una pieza tecnica reproducible".

## Que no probe

Esto es igual de importante que lo que si probe.

No probe:

```text
cloud render
publish
Lambda
auth
Rive
dotLottie
GPU/browser GPU
low-memory mode
CI batch rendering
personalized video at scale
```

No los probe porque algunos requieren credenciales, cuentas, assets especificos o decisiones de infraestructura. Meterlos igual para agrandar el articulo hubiera debilitado el resultado.

## Mi conclusion

HyperFrames me resulto interesante no porque "hace videos con HTML" suene novedoso, sino porque permite tratar un video tecnico como un proyecto de software:

```text
source files
scripts
validaciones
assets
evidencia
renders
errores documentados
versiones fijadas
```

La parte mas valiosa del experimento no fue el MP4 final. Fue poder reconstruir el camino.

Si tuviera que resumirlo en una frase:

```text
Para videos tecnicos, el archivo final no deberia ser el unico artefacto. El proceso tambien deberia ser publicable.
```

Eso es lo que intente hacer con este repo.

HTML es el source. MP4 es el artefacto.
