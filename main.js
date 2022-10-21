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

const url =
  "https://api.happi.dev/v1/exchange?apikey=d289f0hWuYeUWAeLAVCj7T9TACNxkPbDXLbxpuJLoBBXHngD6uBJ1Msx";

const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const input1 = document.getElementById("num");
const input2 = document.getElementById("ans");
let value1 = "",
  value2 = "",
  data = [];

const getData = async () => {
  try {
    let response = await fetch(url);
    const { result } = await response.json();
    data = [...result];
    const receivedData = result
      .map((item) => `<option value=${item.code}>${item.name}</option>`)
      .sort();

    select1.innerHTML = receivedData;
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

const convert = () => {
  let result = 0;
  console.log(value1, value2);
  let rateUSD1 = data.find((curr) => (curr.code = value1)).price_usd;
  let rateUSD2 = data.find((curr) => (curr.code = value2)).price_usd;
  console.log(rateUSD1, rateUSD2);
};
