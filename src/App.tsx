import { useState } from "react";
import "./styles/main.scss";
import Typography from "@mui/material/Typography";
import ArrowIcon from '../assets/images/icon-arrow.svg';
import  TextField  from "@mui/material/TextField";
import { textFieldStyles } from "./components/Styles";
import { h2Styles } from "./components/Styles";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [result, setResult] = useState <{years:number; months: number; days: number} | null> (null);

   const [submitted1, setSubmitted1] = useState(false);
   const handleBlur1 = () => {
    setSubmitted1(true);
  };
  const [submitted2, setSubmitted2] = useState(false);
   const handleBlur2 = () => {
    setSubmitted2(true);
  };
  const [submitted3, setSubmitted3] = useState(false);
   const handleBlur3 = () => {
    setSubmitted3(true);
  };

  const [yearValidate, setyearValidate] = useState(false);
  const [invalidDay, setInvalidDay] = useState(false);
  const [invalidMonth, setInvalidMonth] = useState(false);

  console.log("day:", invalidDay);
  console.log("month:", invalidMonth);
  console.log("year:", yearValidate);


    //Funcion para calcular la edad
  const calculateAge = () => {
    const today = new Date();

    let isInvalidDay = false;
    let isInvalidMonth = false;
    let isInvalidYear = false;

    // Mes inválido
    if (Number(month) < 1 || Number(month) > 12) {
      setInvalidMonth(true);
      isInvalidMonth = true;
    } else {
      setInvalidMonth(false);
    }

    // Año inválido
    if (Number(year) < 0 || Number(year) > today.getFullYear()) {
      setyearValidate(true);
      isInvalidYear = true;
    } else {
      setyearValidate(false);
    }

    // Día inválido
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const validDate =
      birthDate.getFullYear() === Number(year) &&
      birthDate.getMonth() === Number(month) - 1 &&
      birthDate.getDate() === Number(day);

    if (!validDate) {
      setInvalidDay(true);
      isInvalidDay = true;
    } else {
      setInvalidDay(false);
    }

    if (isInvalidDay || isInvalidMonth || isInvalidYear) {
      return;
    }

    // Validar campos vacíos
    if (day.trim() === "" && month.trim() === "" && year.trim() === "") {
      setSubmitted1(true);
      setSubmitted2(true);
      setSubmitted3(true);
      return;
    }

    // Calcular edad
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
};

  return (
    <div className="content">
      <div className="calculator-content">
        <div className="groups-inputs">
          <div className="inputs">
            <Typography className="text" variant="body2" color={submitted1 && day.trim() === "" ? "hsl(0, 100%, 67%)" : " hsl(0, 1%, 44%)"}>
              DAY
            </Typography>
            <TextField 
            sx={textFieldStyles}
            placeholder="DD"
            variant="outlined"
            onBlur={handleBlur1}
            error={(submitted1 && day.trim() === "" ) || (invalidDay)}
            helperText={(submitted1 && day.trim() === "" ? "This field is required" : "" ) || ((invalidDay ? "must be a valid day" : ""))}
            type="text" value={day} onChange={ (e) => setDay(e.target.value)}/>
          </div> 
          <div className="inputs">
            <Typography className="text" variant="body2" color={submitted2 && month.trim() === "" ? "hsl(0, 100%, 67%)" : " hsl(0, 1%, 44%)"}>
              MONTH
            </Typography>
            <TextField 
            placeholder="MM"            
            sx={textFieldStyles}
            variant="outlined"
            onBlur={handleBlur2}
            error={(submitted2 && month.trim() === "") || (invalidMonth)}
            helperText={(submitted2 && month.trim() === "" ? "This field is required" : "") || ((invalidMonth ? "must be a valid month" : ""))}
            type="text" value={month} onChange={ (e) => setMonth(e.target.value)}/>
          </div>
          <div className="inputs">
            <Typography className="text" variant="body2" color={submitted3 && year.trim() === "" ? "hsl(0, 100%, 67%)" : " hsl(0, 1%, 44%)"}>
              YEAR
            </Typography>
            <TextField 
            placeholder="YYYY"
            sx={textFieldStyles}
            variant="outlined"
            onBlur={handleBlur3}
            error={(submitted3 && year.trim() === "") || (yearValidate)}
            helperText={(submitted3 && year.trim() === "" ? "This field is required" : "") || (yearValidate ? "must be in the past" : "")}
            type="text" value={year} onChange={ (e) => setYear(e.target.value)}/>
          </div>
        </div>

        <div className="buttonContent">
          <div className="line"></div>
          <button className="CalculateButton" onClick={calculateAge}> <img src={ArrowIcon} alt="Arrow Icon" width={24} height={24} /> </button>
          <div className="line2"></div>
        </div>
        
        <div className="results">
           <Typography className="results-content" variant="h2" sx={h2Styles}>
            <span className={result ? "results-text" : "error-text"}>
              {result ? result.years : "- -"}
            </span>{" "} 
            years
          </Typography>

          <Typography className="results-content" variant="h2" sx={h2Styles}>
            <span className={result ? "results-text" : "error-text"}>
              {result ? result.months : "- -"}
            </span>{" "} 
            months
          </Typography>

          <Typography className="results-content" variant="h2" sx={h2Styles}>
            <span className={result ? "results-text" : "error-text"}>
              {result ? result.days : "- -"}
            </span>{" "} 
            days
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default App
