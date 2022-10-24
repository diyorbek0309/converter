// const xhr = new XMLHttpRequest();
// xhr.onreadystatechange = () => {
//   if (xhr.readyState === 4) {
//     console.log(xhr.responseText);
//   }
// };
// xhr.open(
//   "GET",
//   "https://api.happi.dev/v1/exchange?apikey=d289f0hWuYeUWAeLAVCj7T9TACNxkPbDXLbxpuJLoBBXHngD6uBJ1Msxx"
// );
// xhr.send();

// fetch(
//   "https://api.happi.dev/v1/exchange?apikey=d289f0hWuYeUWAeLAVCj7T9TACNxkPbDXLbxpuJLoBBXHngD6uBJ1Msx"
// )
//   .then((data) => {
//     data.json();
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

let timeZoneCityToCountry = {
  Tashkent: "Uzbekistan",
  Andorra: "Andorra",
  Dubai: "United Arab Emirates",
  Kabul: "Afghanistan",
  Tirane: "Albania",
  Yerevan: "Armenia",
  Casey: "Antarctica",
  Davis: "Antarctica",
  Mawson: "Antarctica",
  Palmer: "Antarctica",
  Rothera: "Antarctica",
  Troll: "Antarctica",
  Vostok: "Antarctica",
  Buenos_Aires: "Argentina",
  Cordoba: "Argentina",
  Salta: "Argentina",
  Jujuy: "Argentina",
  Tucuman: "Argentina",
  Catamarca: "Argentina",
  La_Rioja: "Argentina",
  San_Juan: "Argentina",
  Mendoza: "Argentina",
  San_Luis: "Argentina",
  Rio_Gallegos: "Argentina",
  Ushuaia: "Argentina",
  Pago_Pago: "Samoa (American)",
  Vienna: "Austria",
  Lord_Howe: "Australia",
  Bratislava: "Slovakia",
  Freetown: "Sierra Leone",
  San_Marino: "San Marino",
  Dakar: "Senegal",
  Mogadishu: "Somalia",
  Lome: "Togo",
  Dar_es_Salaam: "Tanzania",
  Kampala: "Uganda",
  Aden: "Yemen",
  Lusaka: "Zambia",
  Harare: "Zimbabwe",
};

let userCountry;

const url =
  "https://api.happi.dev/v1/exchange?apikey=d289f0hWuYeUWAeLAVCj7T9TACNxkPbDXLbxpuJLoBBXHngD6uBJ1Msx";

const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const input1 = document.getElementById("num");
const input2 = document.getElementById("ans");
let value1 = "1inch",
  value2 = "uzs",
  data = [];

const getData = async () => {
  try {
    let response = await fetch(url);
    const { result } = await response.json();
    data = [...result];

    userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    userCountry = timeZoneCityToCountry[userTimeZone.split("/")[1]];

    const selectedCURR =
      data.find((curr) => curr.name.includes(userCountry)).code || "USD";

    const receivedData = result
      .map((item) => {
        if (item.code === selectedCURR) {
          return `<option value="${item.code.toLowerCase()}" selected>${
            item.name
          }</option>`;
        } else {
          return `<option value="${item.code.toLowerCase()}">${
            item.name
          }</option>`;
        }
      })
      .sort();

    select1.innerHTML = result
      .map((item) => {
        return `<option value="${item.code.toLowerCase()}">${
          item.name
        }</option>`;
      })
      .sort();

    select2.innerHTML = receivedData;
  } catch (error) {
    console.log(error);
  }
};

getData();

select1.addEventListener("change", (e) => {
  value1 = e.target.value;
});

select2.addEventListener("change", (e) => {
  value2 = e.target.value;
});

const makeConvertUrl = (from, to) =>
  `https://api.happi.dev/v1/exchange/${from}/${to}?apikey=d289f0hWuYeUWAeLAVCj7T9TACNxkPbDXLbxpuJLoBBXHngD6uBJ1Msx`;

const convert = async () => {
  // let rateUSD1 = data.find((curr) => curr.code === value1).price_usd;
  // let rateUSD2 = data.find((curr) => curr.code === value2).price_usd;

  let response = await fetch(makeConvertUrl(value1, value2));
  const { result } = await response.json();

  input2.value =
    (input1.value * result.result.value).toFixed(6) +
    " " +
    value2.toUpperCase();
};
