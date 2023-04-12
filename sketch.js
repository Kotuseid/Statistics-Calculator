let data, DATA, X, F, CF, FX, SUMF, SUMFX, MEAN, MODE, MEDIAN, RANGE, SD, IQR;
let INPUT = document.getElementById("data");
let tbody = document.getElementById("tbody");
let mode = document.getElementById("mode");
let mean = document.getElementById("mean");
let median = document.getElementById("median");
let range = document.getElementById("range");
let sd = document.getElementById("sd");
let iqr = document.getElementById("iqr");
/*
     ©Kotuseid 2022
*/
//Credit to people that answer questions on stackoverflow as the following functions were derived from their answers:
//ORDERED DATA
//F VALUES
//MODE

//All the other functions used were created by me

INPUT.addEventListener("input", (e) => {
  console.clear();

  //UNORDERED DATA
  data = INPUT.value.split(" ");
  for (let i = 0; i < data.length; i++) {
    data[i] = parseInt(data[i]);
  }
  console.log("UNORDERED: ", data);

  //ORDERED DATA
  DATA = data.sort((a, b) => a - b);
  for (let i = 0; i < DATA.length; i++) {
    DATA[i] = parseInt(DATA[i]);
  }
  console.log("ORDERED", DATA);

  //X VALUES
  X = [...new Set(DATA)];
  for (let i = 0; i < X.length; i++) {
    X[i] = parseInt(X[i]);
  }
  console.log("X: ", X);

  //F VALUES
  let f = [];
  for (let x of X) {
    f.push(DATA.filter((v) => v === x).length);
  }
  F = f;
  for (let i = 0; i < F.length; i++) {
    F[i] = parseInt(F[i]);
  }
  console.log("F: ", F);

  //CF VALUES
  let Cf = [];
  let prevcf = 0;
  for (let cf of F) {
    Cf.push(prevcf + cf);
    prevcf += cf;
  }
  CF = Cf;
  console.log("CF: ", CF);

  //FX VALUES
  FX = [];
  for (let i = 0; i < X.length; i++) {
    FX[i] = X[i] * F[i];
  }
  console.log("FX: ", FX);

  //SUMF VALUE
  SUMF = DATA.length;
  console.log("SUMF: ", SUMF);

  //SUMFX VALUE
  let a = 0;
  for (let b of FX) {
    a += b;
  }
  SUMFX = a;
  console.log("SUMFX: ", SUMFX);

  //MEAN
  MEAN = SUMFX / SUMF;
  console.log("MEAN: ", MEAN);

  //RANGE
  RANGE = DATA[DATA.length - 1] - DATA[0];
  console.log("RANGE: ", RANGE);

  //MEDIAN
  MEDIAN = calcMedian(DATA);
  console.log("MEDIAN: ", MEDIAN);

  //MODE
  MODE = calcMode(DATA);
  console.log("MODE/S: ", MODE);

  //SD
  SD = 0;
  for (let i = 0; i < DATA.length; i++) {
    SD += Math.pow(DATA[i] - MEAN, 2);
  }
  SD = SD / SUMF;
  SD = Math.sqrt(SD);
  console.log("SD: ", SD);

  //IQR
  IQR = calcIQR(DATA);
  console.log("IQR: ", IQR);

  //DISPLAY FREQUENCY DISTRIBUTION TABLE
  tbody.innerHTML = "";
  for (let i = 0; i < X.length; i++) {
    let row = document.createElement("tr");
    let rowX = document.createElement("td");
    let rowF = document.createElement("td");
    let rowCF = document.createElement("td");
    let rowFX = document.createElement("td");

    rowX.innerHTML = X[i];
    rowF.innerHTML = F[i];
    rowCF.innerHTML = CF[i];
    rowFX.innerHTML = FX[i];

    row.appendChild(rowX);
    row.appendChild(rowF);
    row.appendChild(rowFX);
    row.appendChild(rowCF);

    tbody.appendChild(row);
    if (i == X.length - 1) {
      let r = document.createElement("tr");
      let rx = document.createElement("td");
      let rf = document.createElement("td");
      let rfx = document.createElement("td");

      rx.innerHTML = "Σ";
      rf.innerHTML = SUMF;
      rfx.innerHTML = SUMFX;

      rx.className = "th";

      r.appendChild(rx);
      r.appendChild(rf);
      r.appendChild(rfx);

      tbody.appendChild(r);
    }
  }

  //DISPLAY CALCULATIONS
  mode.innerHTML = "Mode/s: " + MODE.toString();
  mean.innerHTML = "Mean: " + MEAN;
  median.innerHTML = "Median: " + MEDIAN;
  range.innerHTML = "Range: " + RANGE;
  sd.innerHTML = "σ: " + SD;
  iqr.innerHTML = "IQR: " + IQR;
});

//idk how this works but it works so im not complaining
function calcMode(arr) {
  return [...new Set(arr)]
    .map((value) => [value, arr.filter((v) => v === value).length])
    .sort((a, b) => a[1] - b[1])
    .reverse()
    .filter((value, i, a) => a.indexOf(value) === i)
    .filter((v, i, a) => v[1] === a[0][1])
    .map((v) => v[0]);
}

//made by me
function calcIQR(d) {
  let q1, q2, q3;
  if (d.length % 2 === 0) {
    let pos1 = d.length / 2;
    let pos2 = pos1 + 1;
    q2 = (d[pos1 - 1] + d[pos2 - 1]) / 2;
    let half1 = d.slice(0, pos1);
    let half2 = d.slice(pos2 - 1);
    q1 = calcMedian(half1);
    q3 = calcMedian(half2);
    console.log("q1", q1);
    console.log("q2", q2);
    console.log("q3", q3);
    console.log("h1", half1);
    console.log("h2", half2);
  } else if (d.length % 2 === 1) {
    let pos = d.length / 2 + 0.5;
    q2 = d[pos - 1];
    let half1 = d.slice(0, pos - 1);
    let half2 = d.slice(pos);
    q1 = calcMedian(half1);
    q3 = calcMedian(half2);
    console.log("q1", q1);
    console.log("q2", q2);
    console.log("q3", q3);
    console.log("h1", half1);
    console.log("h2", half2);
  }
  return q3 - q1;
}

//made by me
function calcMedian(d) {
  let m;
  if (d.length % 2 === 0) {
    let pos1 = d.length / 2;
    let pos2 = pos1 + 1;
    m = (d[pos1 - 1] + d[pos2 - 1]) / 2;
  } else if (d.length % 2 === 1) {
    let pos = d.length / 2 + 0.5;
    m = d[pos - 1];
  }
  return m;
}
