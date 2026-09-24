# Plan de Reactivación Técnica

> Objetivo: pasar de "lo hice alguna vez" a "lo puedo hacer en vivo". El portafolio ya cuenta una historia (Java/Spring, PostgreSQL, Docker, Linux); este plan es para que **tú** la sostengas en una entrevista.
>
> Vehículo de práctica: **Sorteum** (tu SaaS Java/Spring). Todo se practica sobre código tuyo y real, no sobre tutoriales aislados.

---

## Diagnóstico

- Tienes ~4 años de exposición, pero desarrollo continuo intermitente. Eso te deja un perfil **junior sólido / mid en infraestructura**, con óxido en el día a día de programar.
- Lo que más te diferencia: **Sorteum** (API contract-first, JWT, Spring Boot) y el **wrapper Go/SEP**. Ahí está tu argumento.
- El cuello de botella es la fluidez, no la falta de experiencia. Se entrena.

## Cómo usar este plan

- **Ritmo:** 2 h/día, 6 días/semana, 4 semanas (~48 h). Si se te complica, estíralo a 6–8 semanas; no lo comprimas.
- **Regla de oro:** nada de copiar-pegar desde tutoriales. Escribe, equivócate, depura. El objetivo es que el dedo recuerde.
- **Cada día:** 20 min de repaso (tarjetas) + 1 h 30 de código + 10 min de apuntes de lo que no supiste explicar.
- **Al final de cada semana:** un "examen" de 30 min donde explicas en voz alta (grábate) lo aprendido.

### Tracker

| Semana | Foco | Estado |
|---|---|---|
| 1 | Java + Spring core / REST | ☐ |
| 2 | Persistencia + SQL | ☐ |
| 3 | Seguridad + API + testing | ☐ |
| 4 | Docker + despliegue + entrevistas | ☐ |

---

## Semana 1 — Java + Spring core / REST

**Meta:** montar desde cero un endpoint REST funcional sin mirar un tutorial.

### Temario
- Java moderno: streams, `Optional`, records, manejo de excepciones, colecciones.
- Spring Boot: arranque, `@Component`/`@Service`/`@RestController`, inyección por constructor.
- REST: verbos, idempotencia, códigos de estado, DTOs vs entidades.

### Ejercicios sobre Sorteum
1. Reconstruye **desde cero** (nuevo branch) un endpoint `GET /api/rifas` que devuelva una lista de DTOs. Sin copiar de Sorteum.
2. Añade `POST /api/rifas` con validación (`@Valid`, `@NotBlank`, etc.) y devuelve `201 Created` con `Location`.
3. Escribe 5 consultas de Streams sobre la lista (filtrar por estado, ordenar por fecha, agrupar por dueño).

### Check de la semana
- [ ] Explico la diferencia entre `@Component`, `@Service` y `@Repository`.
- [ ] Explico por qué inyectar por constructor y no `@Autowired` en campo.
- [ ] Escribo un `@RestController` de memoria.

---

## Semana 2 — Persistencia + SQL

**Meta:** modelar datos y consultar sin miedo.

### Temario
- PostgreSQL: `SELECT`/`JOIN`/`GROUP BY`, índices, `EXPLAIN` básico, transacciones.
- JPA/Hibernate: entidades, relaciones (`@OneToMany`, `@ManyToOne`), `@Query`, N+1.
- Migraciones con Flyway (o Liquibase): versionar el esquema.

### Ejercicios sobre Sorteum
1. Escribe a mano las tablas de Sorteum (`rifas`, `boletos`, `usuarios`) y sus relaciones. Justifica cada FK e índice.
2. Implementa con JPA la consulta "boletos vendidos por rifa en un rango de fechas".
3. Crea una migración Flyway que añada una columna y un índice. Aplícala en local.
4. Provoca un N+1 a propósito, mídelo con logs, y arréglalo con `JOIN FETCH`.

### Check de la semana
- [ ] Escribo un `JOIN` con `GROUP BY` sin ayuda.
- [ ] Explico qué es el problema N+1 y cómo lo detecto.
- [ ] Distingo `save` vs `saveAndFlush` y sé cuándo usar cada uno.

---

## Semana 3 — Seguridad + API + testing

**Meta:** defender tu decisión de JWT/RFC 9457 y probar código.

### Temario
- Spring Security: filter chain, `UserDetailsService`, roles/autoridades.
- JWT: HS256, firma, claims, expiración; por qué `HttpOnly` + `Secure` + `SameSite`.
- OpenAPI 3.1: diseñar el contrato antes del código.
- RFC 9457 (Problem Details): formato de error uniforme.
- Testing: JUnit 5, MockMvc, `@SpringBootTest`, Testcontainers (si alcanza).

### Ejercicios sobre Sorteum
1. Dibuja el flujo de autenticación de Sorteum (login → token → request protegido). Explica cada paso.
2. Añade un endpoint protegido con `@PreAuthorize("hasRole('ADMIN')")` y pruébalo.
3. Escribe 5 tests: 2 unitarios y 3 de integración con MockMvc (200, 401, 400).
4. Documenta `POST /api/rifas` en el OpenAPI y genera el request de ejemplo.

### Check de la semana
- [ ] Explico el flujo de Spring Security de request a respuesta.
- [ ] Justifico por qué el token va en header **o** cookie `HttpOnly`.
- [ ] Escribo un test de integración de un controller de memoria.

---

## Semana 4 — Docker + despliegue + entrevistas

**Meta:** empaquetar y desplegar como lo harías en producción, y ensayar la entrevista.

### Temario
- Docker: imágenes, capas, `Dockerfile` multi-stage, `docker-compose`, volúmenes, redes, variables de entorno.
- Reverse proxy: Caddy/Nginx, HTTPS, headers.
- Linux/VPS: usuarios, permisos, `systemd`, logs, firewall (`ufw`), backups.
- CI básico con GitHub Actions (build + tests).

### Ejercicios sobre Sorteum
1. Escribe un `Dockerfile` multi-stage para el backend (build + runtime JRE).
2. Crea un `docker-compose.yml` con app + PostgreSQL + Caddy. Levántalo local.
3. Escribe un workflow de GitHub Actions que corra los tests en cada push.
4. Simula el despliegue en un VPS (puede ser un droplet barato o local con Vagrant): HTTPS, variables de entorno, healthcheck, reinicio automático.
5. **Simulacro:** 45 min explicando Sorteum de arriba a abajo (arquitectura, decisiones, trade-offs) y 6 preguntas del banco.

### Check de la semana
- [ ] Dockerizo una app Spring Boot desde cero.
- [ ] Explico qué es una imagen multi-stage y por qué la uso.
- [ ] Cuento el despliegue de Sorteum sin leer apuntes.

---

## Banco de preguntas de entrevista

**Java / Spring**
- Diferencia entre `List`, `ArrayList` y `LinkedList`. ¿Cuándo cada una?
- ¿Qué es un bean y cuál es su ciclo de vida?
- ¿Cómo funciona la inyección de dependencias?
- `@Controller` vs `@RestController`. `@RequestParam` vs `@PathVariable`.
- ¿Cómo manejas excepciones globalmente? (`@ControllerAdvice`)
- ¿Qué hace `@Transactional` y cuáles son sus trampas?

**Persistencia / SQL**
- ¿Qué es una transacción y qué propiedades ACID?
- Explica un `INNER JOIN` vs `LEFT JOIN` con ejemplo.
- ¿Qué es un índice y cuándo **no** conviene?
- ¿Qué es el problema N+1 y cómo se resuelve?
- Lazy vs Eager loading.

**Seguridad**
- ¿Por qué JWT y no sesión? Trade-offs.
- ¿Dónde guardo el token en el frontend? Riesgos de XSS/CSRF.
- ¿Qué es CORS y cómo se configura bien?

**Infra / Docker**
- Diferencia entre imagen y contenedor.
- ¿Qué es un volumen y por qué lo necesito?
- ¿Cómo persiste PostgreSQL en Docker?
- ¿Qué hace un reverse proxy?

**Conductual**
- Cuéntame un proyecto del que estés orgulloso (→ Sorteum o wrapper Go/SEP).
- Un bug difícil y cómo lo resolviste.
- ¿Cómo aprendes una tecnología nueva?

---

## Criterios de "estoy listo"

- [ ] Construyo un endpoint REST con validación y test, sin tutorial.
- [ ] Escribo consultas SQL con `JOIN` y `GROUP BY` sin ayuda.
- [ ] Explico el flujo de seguridad de Sorteum de memoria.
- [ ] Dockerizo y levanto un stack con `docker-compose`.
- [ ] Cuento la arquitectura de Sorteum en 5 minutos, con decisiones y trade-offs.
- [ ] Respondo 8 de 10 preguntas del banco sin titubear.

---

## Recursos mínimos

- **Java/Spring:** documentación oficial de Spring Boot + Spring Security (guías "how-to").
- **SQL:** PostgreSQL Tutorial (postgresqltutorial.com) + `EXPLAIN` a mano.
- **Docker:** docs oficiales "Get started".
- **Testing:** Spring Boot testing guide + JUnit 5 user guide.
- **OpenAPI:** spec 3.1 + editor Swagger.

---

## Cómo se conecta con el portafolio

A medida que avances:
1. **Actualiza los case studies** con lo que aprendas (nuevas decisiones, tests, CI). El sitio ya soporta `architecture`, `challenges` y `outcomes`.
2. **Publica lo que puedas**: un repo demo, un README técnico, o un post corto explicando una decisión de Sorteum.
3. Cuando cumplas los "criterios de listo", revisa el posicionamiento del sitio: si te sientes cómodo, mantén "Ingeniero Full Stack"; si no, lo ajustamos.
