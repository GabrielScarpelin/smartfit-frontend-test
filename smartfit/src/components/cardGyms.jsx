import Image from "next/image";
import styles from "./cardGyms.module.css";
import {
  GothamBlack,
  GothamBold,
  GothamBook,
  GothamLight,
} from "@/app/fonts/fonts";
export default function Card({
  gymName,
  gymStatus,
  gymAdress,
  maskStatus,
  towelStatus,
  lockerStatus,
  fountainStatus,
  gymSchedules,
}) {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minWidth: "30%",
        padding: 16,
        borderRadius: 8,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 10px",
      }}
    >
      <p
        className={`${gymStatus ? styles.open : styles.closed} ${
          GothamBold.className
        } ${styles.fontGymStatus}`}
      >
        {gymStatus ? "Aberto" : "Fechado"}
      </p>
      <h2 className={`${styles.gymTitle} ${GothamBold.className}`}>
        {gymName}
      </h2>
      <p
        className={`${GothamLight.className}`}
        style={{
          fontSize: 14,
          color: "#333333",
          marginTop: "1rem",
          minHeight: "3rem",
        }}
      >
        {gymStatus
          ? gymAdress
              .replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, " ")
              .replace("&#8211;", "-")
          : ""}
      </p>
      <div className={styles.lineAfter}></div>
      {gymStatus ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Image
              src={`/${maskStatus}-mask.png`}
              width={138}
              height={138}
              style={{ width: "20%", height: "auto" }}
              alt={`${maskStatus}-mascara`}
            />
            <Image
              src={`/${towelStatus}-towel.png`}
              width={138}
              height={138}
              style={{ width: "20%", height: "auto" }}
              alt={`${towelStatus}-toalha`}
            />
            <Image
              src={`/${fountainStatus}-fountain.png`}
              width={138}
              height={138}
              style={{ width: "20%", height: "auto" }}
              alt={`${fountainStatus}-bebedouro`}
            />
            <Image
              src={`/${lockerStatus}-lockerroom.png`}
              width={138}
              height={138}
              style={{ width: "20%", height: "auto" }}
              alt={`${fountainStatus}-vestiário`}
            />
          </div>
          <div className={styles.scheduleContainer}>
            {gymSchedules.map((value) => {
              return (
                <div style={{}}>
                  <h2 className={`${styles.gymTitle} ${GothamBold.className}`}>
                    {value.weekdays}
                  </h2>
                  <p className={`${GothamBook.className}`}>{value.hour}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
