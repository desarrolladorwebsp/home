"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "@phosphor-icons/react";
import sourceContent from "./home-care-content.json";
import styles from "./home-care-section.module.css";

const cards = [
  { id: "client-hospitalizacion", title: "Hospitalización domiciliaria", description: "Cuidados hospitalarios en el hogar." },
  { id: "client-rehabilitacion", title: "Rehabilitación", description: "Recupera funcionalidad e independencia." },
  { id: "client-curaciones", title: "Curaciones", description: "Tratamiento especializado de heridas." },
  { id: "client-paliativos", title: "Cuidados paliativos", description: "Bienestar, comodidad y dignidad." },
  { id: "client-medicamentos", title: "Administración de medicamentos y antibióticos", description: "Tratamientos seguros en casa." },
  { id: "client-alimentacion", title: "Alimentación enteral y parenteral", description: "Soporte nutricional especializado." },
  { id: "client-cuidados", title: "Cuidados a domicilio", description: "Apoyo para permanecer de forma segura en casa." },
];

export function HomeCareSection({ preview = false }: { preview?: boolean }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = sourceContent.find((service) => service.id === selectedId);
  const visibleCards = preview ? cards.slice(0, 3) : cards;

  useEffect(() => {
    if (selectedId && dialog.current && !dialog.current.open) {
      dialog.current.showModal();
    }
  }, [selectedId]);


  return (
    <div id="servicios" className={styles.anchor}>
      <section id="atencion" className={styles.section} aria-labelledby="home-care-title">
        <div className={styles.container}>
          {preview ? (
            <div className={styles.header}>
              <div className={styles.photo} aria-hidden="true">
                <Image
                  src="/rehabilitacion-en-casa.webp"
                  alt=""
                  width={1440}
                  height={811}
                  sizes="(max-width: 900px) 88vw, (max-width: 1640px) 65vw, 1051px"
                />
              </div>
              <div className={styles.intro}>
                <p className={styles.eyebrow}>Nuestros servicios</p>
                <h2 id="home-care-title"><span>Atención clínica en casa,</span>adaptada a cada paciente</h2>
                <p className={styles.description}>Conoce algunas de las prestaciones que ofrecemos para continuar el tratamiento, la recuperación o la rehabilitación en casa.</p>
              </div>
            </div>
          ) : <h2 id="home-care-title" className="sr-only">Prestaciones de atención domiciliaria</h2>}

          <div className={styles.grid}>
            {visibleCards.map(({ id, title, description }) => {
              const anchor = id.replace(/^client-/, "");
              return (
                <article id={preview ? undefined : anchor} data-replay className={styles.card} key={id}>
                  <div className={styles.cardPhoto}>
                    <Image
                      src={`/servicios/${anchor}.webp`}
                      alt=""
                      fill
                      sizes="(max-width: 600px) 34vw, (max-width: 1050px) 17vw, 160px"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.titleRow}>
                      <h3>{title}</h3>
                      {anchor === "cuidados" && <span className={styles.badge}>Servicio 100% particular</span>}
                    </div>
                    <p>{description}</p>
                    {preview ? (
                      <Link className={styles.more} href={`/servicios#${anchor}`} aria-label={`Ver servicio: ${title}`}>
                        Ver servicio <ArrowRight size={17} aria-hidden="true" />
                      </Link>
                    ) : (
                      <button type="button" className={styles.more} onClick={() => setSelectedId(id)} aria-label={`Conocer más: ${title}`} aria-haspopup="dialog">
                        Conocer más <ArrowRight size={17} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
            {!preview && (
              <div className={styles.quotePanel}>
                <h3>¿Necesitas atención en casa?</h3>
                <a className="hero__primary" href="#contacto">
                  Solicita tu presupuesto <ArrowRight size={20} aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
          <div className={styles.nextStep}>
            {preview ? (
              <Link className={styles.more} href="/servicios">
                Ver todos los servicios <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ) : (
              <>
                <p>¿Tienes dudas sobre la cobertura o cómo acceder a un servicio?</p>
                <Link className={styles.more} href="/preguntas-frecuentes">
                  Ver preguntas frecuentes <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </div>

        {!preview && <dialog ref={dialog} className={styles.dialog} aria-labelledby="home-care-detail-title" onClose={() => setSelectedId(null)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
          <div className={styles.dialogContent}>
            <header className={styles.dialogHeader}>
              <button type="button" className={styles.close} aria-label="Cerrar detalle del servicio" onClick={() => dialog.current?.close()}><X size={23} aria-hidden="true" /></button>
              <p className={styles.eyebrow}>Atención domiciliaria</p>
              <h2 id="home-care-detail-title">{selected?.title}</h2>
            </header>
            <div className={styles.detail}>
              {selected?.blocks.map((block, index) => {
                if (block.type === "heading") return <h3 key={index}>{block.text}</h3>;
                if (block.type === "list") return <ul key={index}>{block.items?.map((item) => <li key={item}>{item}</li>)}</ul>;
                if (selectedId === "service-5" && block.text?.startsWith("Teléfono:")) return <p key={index}>Teléfono: <a href="tel:+56226310200">22 631 02 00</a></p>;
                return <p key={index}>{block.text}</p>;
              })}
            </div>
          </div>
        </dialog>}
      </section>
    </div>
  );
}
