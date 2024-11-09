import { useEffect, useState } from "react";
import { getWeatherUserCountry } from "../../services/weathers";
import "./Footer.scss";

export const Footer = () => {
  const [userCountry, setUserCountry] = useState("Moscow");
  const [temp, setTemp] = useState("-2");
  const [weather, setWeather] = useState("Переменная облачность");
  useEffect(() => {
    // getWeatherUserCountry().then((data) => {
    //   setUserCountry(data?.country ?? null);
    //   setTemp(data?.temp ?? null);
    //   setWeather(data?.weather ?? null);
    // });
  }, []);
  return (
    <footer className="footer">
      <div className="footer__info">
        <span className="footer__blog-name">Design-blog</span>
        <span className="footer__current-year">{new Date().getFullYear()}</span>
      </div>
      <ul className="footer__weather">
        <li> {userCountry}</li>
        <li> {temp}</li>
        <li> {weather}</li>
      </ul>
    </footer>
  );
};
