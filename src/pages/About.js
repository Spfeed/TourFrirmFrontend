import { Fragment } from "react";
import HeaderWithAboutTitle from "../components/about/HeaderWithAboutTitle";
import AboutCard from "../components/about/AboutCard";
import Footer from "../components/UI/Footer";
import BigAboutCard from "../components/about/BigAboutCard";

const About = (props) => {
  const ourAim = "Наша цель";
  const history = "История";
  const partners = "Наши партнеры";
  const ourAimFirstRow =
    "Компания AATours занимается подбором туров для своих клиентов,";
  const ourAimSecondRow = "сотрудничая со множеством туроператоров.";
  const historyFirstRow =
    "Компания AATours была создана в 1998 году, и с тех пор продолжает радовать своих";
  const historySecondRow =
    "клиентов высоким качеством и большим количеством туров.";
  const partnersFirstRow =
    "Наша компания сотрудничает со множеством туристических операторов!";
  const partnersSecondRow = "";

  const officeInfo = [
    "443068 г. Самара",
    "ул. Луначарского, 28",
    "5 этаж, офис 30",
    "Тел. в Самаре: +7 (927) 722-40-06",
  ];

  return (
    <Fragment>
      <HeaderWithAboutTitle />
      <AboutCard
        title={ourAim}
        firstRow={ourAimFirstRow}
        secondRow={ourAimSecondRow}
      />
      <AboutCard
        title={history}
        firstRow={historyFirstRow}
        secondRow={historySecondRow}
      />
      <AboutCard
        title={partners}
        firstRow={partnersFirstRow}
        secondRow={partnersSecondRow}
      />
      <BigAboutCard officeItems={officeInfo} />
      <Footer />
    </Fragment>
  );
};

export default About;
