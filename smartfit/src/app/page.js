import Image from "next/image";
import styles from "./page.module.css";
import localFont from "next/font/local";
import TimeSelection from "@/components/timeSelection";

const GothamBold = localFont({ src: "./fonts/gotham-bold.woff2" });
const GothamBook = localFont({ src: "./fonts/gotham-book.woff2" });
const GothamLight = localFont({ src: "./fonts/gotham-light.woff2" });
export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          style={{ width: "200px", height: "auto" }} // optional
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
        <div className={styles.cardFilters}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image
              src="/icon-hour.png"
              width={0}
              height={0}
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
            <TimeSelection range={["06:00", "12:00"]} turno="Manhã" />
            <div className={styles.lineAfter} />
          </div>
          <div>
            <TimeSelection range={["12:01", "18:00"]} turno="Tarde" />
            <div className={styles.lineAfter} />
          </div>
          <div>
            <TimeSelection range={["18:01", "22:00"]} turno="Noite" />
            <div className={styles.lineAfter} />
          </div>
          <div className={styles.rowSearchFilters}>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="checkbox" />
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
            >
              LIMPAR
            </button>
          </div>
        </div>
        <div className={styles.legendContainer}>
          <div>
            <h3>Máscara</h3>
            <div></div>
          </div>
          <div>
            <h3>Toalha</h3>
            <div></div>
          </div>
          <div>
            <h3>Bebedouro</h3>
            <div></div>
          </div>
          <div>
            <h3>Vestiários</h3>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
