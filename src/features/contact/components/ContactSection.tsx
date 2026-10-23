import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react'
import { Button, Container, Heading, Reveal, Section, ease } from '@/shared/design-system'
import { site } from '@/shared/config/site'
import { mailtoUrl, whatsappUrl } from '@/shared/lib/contact-links'
import { catalog, kindFilters } from '@/features/packages'
import { composeInquiry, emptyInquiry, validateInquiry, type InquiryErrors, type InquiryValues } from '../lib/compose'
import { Field, inputClass } from './Field'

type Channel = 'whatsapp' | 'email'
const UNDECIDED = 'Aún no lo decido, quiero ideas'

export function ContactSection() {
  const [values, setValues] = useState<InquiryValues>(emptyInquiry)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [sent, setSent] = useState<{ channel: Channel; href: string } | null>(null)

  const set = (key: keyof InquiryValues) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const submit = (channel: Channel) => (e?: FormEvent) => {
    e?.preventDefault()
    const found = validateInquiry(values)
    setErrors(found)
    if (Object.keys(found).length) {
      // Tras pintar los errores, llevamos el foco al primer campo a corregir
      requestAnimationFrame(() => document.querySelector<HTMLElement>('#contacto [aria-invalid="true"]')?.focus())
      return
    }
    const text = composeInquiry(values)
    const href =
      channel === 'whatsapp' ? whatsappUrl(text) : mailtoUrl(`Cotización: ${values.destination}`, text)
    if (channel === 'whatsapp') window.open(href, '_blank', 'noopener,noreferrer')
    else window.location.href = href
    setSent({ channel, href })
  }

  return (
    <Section id="contacto" aria-labelledby="contacto-titulo" top="base" bottom="tight">
      <Container>
        {/* Pista de aterrizaje: aquí termina la ruta de vuelo de toda la página, sobre el formulario */}
        <div className="relative">
          <span
            data-flight="destination"
            aria-hidden
            className="absolute right-[24%] -top-[calc(var(--space-section-base)/2)] size-px"
          />
        </div>
        <Reveal>
          <div className="rounded-[2.5rem] bg-ink/[0.035] p-2 ring-1 ring-line">
            <div className="grid gap-2 overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-accent p-2 text-accent-ink lg:grid-cols-[1fr_1.15fr]">
              <div className="flex flex-col justify-between gap-12 p-6 sm:p-10">
                <div>
                  <Heading id="contacto-titulo" className="max-w-[12ch]">
                    Aquí empieza tu viaje.
                  </Heading>
                  <p className="mt-6 max-w-[40ch] text-lead opacity-85">
                    Cuéntanos a dónde quieres ir y armamos el mensaje por ti. Respondemos en menos de un día hábil.
                  </p>
                </div>

                <dl className="grid gap-5 text-small">
                  <div>
                    <dt className="opacity-70">WhatsApp</dt>
                    <dd className="mt-1 text-body font-medium">
                      <a href={whatsappUrl('Hola SosaCraft')} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                        {site.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="opacity-70">Correo</dt>
                    <dd className="mt-1 text-body font-medium">
                      <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="opacity-70">Horario</dt>
                    <dd className="mt-1">{site.schedule}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[calc(2.5rem-1rem)] bg-surface p-6 text-ink shadow-highlight sm:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: ease.out }}
                      className="flex h-full min-h-[420px] flex-col items-start justify-center gap-5"
                      role="status"
                    >
                      <CheckCircle size={44} weight="light" className="text-accent" />
                      <h3 className="font-display text-h3 font-[600]">
                        {sent.channel === 'whatsapp' ? 'Abrimos WhatsApp con tu mensaje.' : 'Abrimos tu correo con el mensaje.'}
                      </h3>
                      <p className="max-w-[44ch] text-body text-ink-muted">
                        Solo falta que lo envíes desde ahí. Si no se abrió,{' '}
                        <a
                          href={sent.href}
                          target={sent.channel === 'whatsapp' ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="font-medium text-accent underline underline-offset-4"
                        >
                          ábrelo con este enlace
                        </a>
                        .
                      </p>
                      <button
                        type="button"
                        onClick={() => setSent(null)}
                        className="mt-2 text-small font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                      >
                        Escribir otro mensaje
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      noValidate
                      onSubmit={submit('whatsapp')}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: ease.out }}
                      className="grid gap-5 sm:grid-cols-2"
                    >
                      <Field label="Tu nombre" error={errors.name}>
                        <input
                          className={inputClass}
                          autoComplete="name"
                          value={values.name}
                          onChange={set('name')}
                        />
                      </Field>
                      <Field label="Paquete, tour u hotel" error={errors.destination}>
                        <select className={inputClass} value={values.destination} onChange={set('destination')}>
                          <option value="">Elige una opción</option>
                          {kindFilters.map((k) => (
                            <optgroup key={k.value} label={k.label}>
                              {catalog
                                .filter((p) => p.kind === k.value)
                                .map((p) => (
                                  <option key={p.id} value={p.name}>
                                    {p.name}
                                  </option>
                                ))}
                            </optgroup>
                          ))}
                          <option value={UNDECIDED}>{UNDECIDED}</option>
                        </select>
                      </Field>
                      <Field label="Fechas aproximadas" hint="Por ejemplo: segunda quincena de marzo">
                        <input className={inputClass} value={values.dates} onChange={set('dates')} />
                      </Field>
                      <Field label="Viajeros" error={errors.travelers}>
                        <input
                          className={inputClass}
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={30}
                          value={values.travelers}
                          onChange={set('travelers')}
                        />
                      </Field>
                      <Field label="Algo más que debamos saber" className="sm:col-span-2" hint="Opcional">
                        <textarea
                          className={`${inputClass} min-h-[120px] resize-y`}
                          value={values.message}
                          onChange={set('message')}
                        />
                      </Field>
                      <div className="flex flex-wrap gap-3 pt-2 sm:col-span-2">
                        <Button type="submit" size="lg" variant="whatsapp" icon={<WhatsappLogo size={18} weight="regular" />}>
                          Cotizar por WhatsApp
                        </Button>
                        <Button
                          type="button"
                          size="lg"
                          variant="secondary"
                          onClick={() => submit('email')()}
                          icon={<EnvelopeSimple size={18} weight="light" />}
                        >
                          Enviar correo
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
