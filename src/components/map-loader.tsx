import styles from "./map-loader.module.css";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center">
      <span className={styles.loader}></span>
    </div>
  );
}
