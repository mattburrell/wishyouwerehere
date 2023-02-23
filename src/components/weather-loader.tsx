import styles from "./weather-loader.module.css";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center width-[100] w-full">
      <span className={styles.loader}></span>
    </div>
  );
}
