"use client";

import Image from "next/image";
import styles from "./page.module.css";
import TimeSelection from "@/components/timeSelection";
import { useEffect, useState } from "react";
import ActivityIndicator from "@/components/activityIndicator";
import Card from "@/components/cardGyms";
import { GothamBold, GothamBook, GothamLight } from "./fonts/fonts";

function RenderCards({ cards }) {
  return (
    <div
      style={{ display: "flex", width: "100%", overflowX: "scroll", gap: "4%" }}
      className={styles.cardsContainer}
    >
      {cards.map((value, index) => {
        return (
          <Card
            key={`${value.id}${value.title}`} //ISSO AQUI NÃO É RECOMENDADO, NO ENTANTO OS DADOS DE ENTRADA ESTÃO BAGUNÇADOS E EXISTEM MAIS ACADEMIAS COM O MESMO ID. QUE, POR SUA VEZ, RESULTOU EM ERRO NO CÓDIGO
            gymName={value.title}
            gymAdress={
              value.content ||
              `${value.street}, ${value.region}, ${value.city_name}`
            }
            gymStatus={value.opened}
            fountainStatus={value.fountain}
            lockerStatus={value.locker_room}
            maskStatus={value.mask}
            towelStatus={value.towel}
            gymSchedules={value.schedules}
          />
        );
      })}
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(null);
  const [filtred, setFiltred] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeSelected, setTimeSelected] = useState(null);
  const [onlyOpenGyms, setOnlyOpenGyms] = useState(false);
  function applyFilters() {
    console.log(onlyOpenGyms);
    if (onlyOpenGyms) {
      setFiltred(
        data
          .filter((value) => {
            console.log(Object.keys(value).includes("opened"));
            return Object.keys(value).includes("opened");
          })
          .filter((value) => {
            return value.opened === true;
          })
      );
    }
  }
  function removeFilters() {}

  useEffect(() => {
    fetch(
      "https://test-frontend-developer.s3.amazonaws.com/data/locations.json",
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((value) => {
        setData(value.locations);
        setFiltred(value.locations);
        setLoading(false);
      });
  }, []);
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          style={{ width: "200px", height: "auto" }} // optional
          alt="Logo SmartFit"
        />
      </header>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1 className={`${GothamBold.className} ${styles.titleText}`}>
            REABERTURA
          </h1>
          <h1 className={`${GothamBold.className} ${styles.titleText}`}>
            SMART FIT
          </h1>
        </div>
        <p
          className={`${GothamBook.className} `}
          style={{ marginTop: "1.5rem", fontSize: 18 }}
        >
          O horário de funcionamento das nossas unidades está seguindo os
          decretos de cada município. Por isso, confira aqui se a sua unidade
          está aberta e as medidas de segurança que estamos seguindo.
        </p>
        <div className={styles.filtersContainer}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image
              src="/icon-hour.png"
              width={24}
              height={24}
              alt="Ícone de relógio"
              style={{ width: 24, height: "auto" }}
            />
            <p className={GothamLight.className}>Horário</p>
          </div>
          <p
            className={`${GothamLight.className} ${styles.lineAfter}`}
            style={{ fontWeith: "unset", fontSize: "1.5rem", color: "#808080" }}
          >
            Qual período quer treinar?
          </p>
          <div>
            <TimeSelection
              range={["06:00", "12:00"]}
              turno="Manhã"
              setTimeSelected={setTimeSelected}
            />
            <div className={styles.lineAfter} />
          </div>
          <div>
            <TimeSelection
              range={["12:01", "18:00"]}
              turno="Tarde"
              setTimeSelected={setTimeSelected}
            />
            <div className={styles.lineAfter} />
          </div>
          <div>
            <TimeSelection
              range={["18:01", "22:00"]}
              turno="Noite"
              setTimeSelected={setTimeSelected}
            />
            <div className={styles.lineAfter} />
          </div>
          <div className={styles.rowSearchFilters}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="checkbox"
                defaultChecked
                onClick={() => setOnlyOpenGyms(!onlyOpenGyms)}
              />
              <p className={GothamBook.className}>Exibir unidades fechadas</p>
            </div>
            <p className={GothamBook.className}>
              Resultados encontrados:{" "}
              <bold className={GothamBold.className}>{0}</bold>
            </p>
          </div>
          <div className={styles.rowButtons}>
            <button
              className={`${styles.button} ${GothamBold.className}`}
              style={{ backgroundColor: "#FFB612", border: "none" }}
              onClick={applyFilters}
            >
              ENCONTRAR UNIDADE
            </button>
            <button
              className={`${styles.button} ${GothamBold.className}`}
              style={{
                borderStyle: "inset",
                backgroundColor: "white",
                border: "2px solid #b6b6b6",
              }}
              onClick={removeFilters}
            >
              LIMPAR
            </button>
          </div>
        </div>
        <div className={styles.legendContainer}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexGrow: 1,
            }}
          >
            <h3 className={GothamBook.className}>Máscara</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/required-mask.png"}
                  width={69}
                  height={69}
                  alt="Máscara obrigatória"
                />
                <p className={GothamBook.className}>Obrigatório</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/recommended-mask.png"}
                  width={69}
                  height={69}
                  alt="Máscara recomendada"
                />
                <p className={GothamBook.className}>Recomendado</p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexGrow: 1,
            }}
          >
            <h3 className={GothamBook.className}>Toalha</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/required-towel.png"}
                  width={69}
                  height={69}
                  alt="Toalha obrigatória"
                />
                <p className={GothamBook.className}>Obrigatório</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/recommended-towel.png"}
                  width={69}
                  height={69}
                  alt="Toalha recomendada"
                />
                <p className={GothamBook.className}>Recomendado</p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexGrow: 1,
            }}
          >
            <h3 className={GothamBook.className}>Bebedouro</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/partial-fountain.png"}
                  width={69}
                  height={69}
                  alt="Bebedouro parcialmente funcional"
                />
                <p className={GothamBook.className}>Parcial</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/not_allowed-fountain.png"}
                  width={69}
                  height={69}
                  alt="Bebedouro proibido"
                />
                <p className={GothamBook.className}>Proibido</p>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexGrow: 1,
            }}
          >
            <h3 className={GothamBook.className}>Vestiários</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/allowed-lockerroom.png"}
                  width={69}
                  height={69}
                  alt="Vestiário permitido"
                />
                <p className={GothamBook.className}>Liberado</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/partial-lockerroom.png"}
                  width={69}
                  height={69}
                  alt="Vestiario parcialmente liberado figura"
                />
                <p className={GothamBook.className}>Parcial</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <Image
                  src={"/closed-lockerroom.png"}
                  width={69}
                  height={69}
                  alt="Vestiário fechado"
                />
                <p className={GothamBook.className}>Fechado</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gymsContainer}>
          {loading ? <ActivityIndicator /> : <RenderCards cards={filtred} />}
        </div>
      </div>
      <footer className={styles.footer}>
        <Image
          src={"/logo.svg"}
          width={146}
          height={54}
          style={{ width: 150, height: "auto" }}
          alt="Logo SmartFit Rodapé"
        />
        <p
          className={GothamLight.className}
          style={{ fontSize: 18, color: "#FFF", fontWeight: 600 }}
        >
          Todos os direitos reservados - 2024
        </p>
      </footer>
    </main>
  );
}
