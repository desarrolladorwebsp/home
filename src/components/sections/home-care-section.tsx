"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AppleLogo, ArrowRight, Baby, ClipboardText, Heart,
  Heartbeat, Laptop, PersonSimple, PhoneCall, Truck, UsersThree, X,
} from "@phosphor-icons/react";
import sourceContent from "./home-care-content.json";
import styles from "./home-care-section.module.css";

const cards = [
  { id: "service-7", title: "Equipo tratante", description: "Profesionales que acompañan al paciente y su familia.", Icon: UsersThree },
  { id: "service-1", title: "Cuidado adulto", description: "Atención adaptada a cada necesidad.", Icon: PersonSimple },
  { id: "service-10", title: "Cuidado pediátrico", description: "Cuidado especializado para los más pequeños.", Icon: Baby },
  { id: "service-3", title: "Procedimientos clínicos", description: "Prestaciones clínicas en la comodidad del hogar.", Icon: ClipboardText },
  { id: "service-6", title: "Nutrición clínica", description: "Apoyo nutricional como parte del cuidado.", Icon: AppleLogo },
  { id: "service-5", title: "Asistencia telefónica", description: "Orientación de enfermería a distancia.", Icon: PhoneCall },
];

const support = [
  { id: "service-8", title: "Monitoreo clínico", Icon: Heartbeat },
  { id: "service-9", title: "Cuidado continuo", Icon: Heart },
  { id: "service-4", title: "Rescate médico", Icon: Truck },
];

export function HomeCareSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = sourceContent.find((service) => service.id === selectedId);

  useEffect(() => {
    if (selectedId && dialog.current && !dialog.current.open) {
      dialog.current.showModal();
    }
  }, [selectedId]);

  return (
    <div id="servicios" className={styles.anchor}>
      <section id="atencion" className={styles.section} aria-labelledby="home-care-title">
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.photo} aria-hidden="true">
              <Image src="/hero-home-care.png" alt="" fill sizes="(max-width: 700px) 100vw, 60vw" />
            </div>
            <div className={styles.intro}>
              <p className={styles.eyebrow}>Atención domiciliaria</p>
              <h2 id="home-care-title"><span>Cuidado integral,</span>en tu hogar</h2>
              <p className={styles.description}>Un equipo conectado para acompañarte en cada etapa del cuidado.</p>
              <button className={styles.overview} type="button" onClick={() => setSelectedId("service-2")} aria-haspopup="dialog">
                Hospitalización de alta, mediana y baja complejidad <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className={styles.grid}>
            {cards.map(({ id, title, description, Icon }) => (
              <article className={styles.card} key={id}>
                <Icon className={styles.icon} size={52} weight="light" aria-hidden="true" />
                <div className={styles.cardContent}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <button type="button" className={styles.more} onClick={() => setSelectedId(id)} aria-label={`Conocer más: ${title}`} aria-haspopup="dialog">
                    Conocer más <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.support} aria-label="Apoyo clínico y tecnología">
            {support.map(({ id, title, Icon }) => (
              <button className={styles.supportItem} type="button" key={id} onClick={() => setSelectedId(id)} aria-haspopup="dialog">
                <Icon size={42} weight="light" aria-hidden="true" /><span>{title}</span><ArrowRight className={styles.supportArrow} size={16} aria-hidden="true" />
              </button>
            ))}
            <div className={styles.supportItem}><Laptop size={42} weight="light" aria-hidden="true" /><span>E-health</span></div>
          </div>

          <div className={styles.cta}>
            <p>Conversemos sobre el cuidado que necesitas</p>
            <a href="tel:+56991831319">Consultar por atención <ArrowRight size={21} aria-hidden="true" /></a>
          </div>
        </div>

        <dialog ref={dialog} className={styles.dialog} aria-labelledby="home-care-detail-title" onClose={() => setSelectedId(null)} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
          <div className={styles.dialogContent}>
            <button type="button" className={styles.close} aria-label="Cerrar detalle del servicio" onClick={() => dialog.current?.close()}><X size={23} aria-hidden="true" /></button>
            <p className={styles.eyebrow}>Atención domiciliaria</p>
            <h2 id="home-care-detail-title">{selected?.title}</h2>
            <div className={styles.detail}>
              {selected?.blocks.map((block, index) => {
                if (block.type === "heading") return <h3 key={index}>{block.text}</h3>;
                if (block.type === "list") return <ul key={index}>{block.items?.map((item) => <li key={item}>{item}</li>)}</ul>;
                if (selectedId === "service-5" && block.text?.startsWith("Teléfono:")) return <p key={index}>Teléfono: <a href="tel:+56226310200">22 631 02 00</a></p>;
                return <p key={index}>{block.text}</p>;
              })}
            </div>
          </div>
        </dialog>
      </section>
    </div>
  );
}
