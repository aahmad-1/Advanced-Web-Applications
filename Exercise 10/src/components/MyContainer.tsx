import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import "../styles/MyContainer.css";

function MyContainer() {
  const {t} = useTranslation();

  return (
    <div className="home-text">{t("home page")}</div>
  )
}

export default function App() {
  return (
    <Suspense fallback="loading...">
      <MyContainer />
    </Suspense>
  );
}