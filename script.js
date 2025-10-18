const RING_SIZES = [
  { us:"3", uk:"F", eu:"44", diameter:14.1, circumference:44.2 },
  { us:"3.5", uk:"G", eu:"45", diameter:14.5, circumference:45.5 },
  { us:"4", uk:"H", eu:"46", diameter:14.9, circumference:46.8 },
  { us:"4.5", uk:"I", eu:"48", diameter:15.3, circumference:48.0 },
  { us:"5", uk:"J", eu:"49", diameter:15.7, circumference:49.3 },
  { us:"5.5", uk:"K", eu:"50", diameter:16.1, circumference:50.6 },
  { us:"6", uk:"L", eu:"52", diameter:16.5, circumference:51.9 },
  { us:"6.5", uk:"M", eu:"53", diameter:16.9, circumference:53.1 },
  { us:"7", uk:"N", eu:"54", diameter:17.3, circumference:54.4 },
  { us:"7.5", uk:"O", eu:"56", diameter:17.7, circumference:55.7 },
  { us:"8", uk:"P", eu:"57", diameter:18.1, circumference:57.0 },
  { us:"8.5", uk:"Q", eu:"58", diameter:18.5, circumference:58.3 },
  { us:"9", uk:"R", eu:"60", diameter:18.9, circumference:59.5 },
  { us:"9.5", uk:"S", eu:"61", diameter:19.3, circumference:60.8 },
  { us:"10", uk:"T", eu:"62", diameter:19.8, circumference:62.1 },
  { us:"10.5", uk:"U", eu:"64", diameter:20.2, circumference:63.4 },
  { us:"11", uk:"V", eu:"65", diameter:20.6, circumference:64.6 },
  { us:"11.5", uk:"W", eu:"66", diameter:21.0, circumference:65.9 },
  { us:"12", uk:"X", eu:"68", diameter:21.4, circumference:67.2 }
];

document.addEventListener("DOMContentLoaded", () => {
  initializeTabs();
  initializeMeasurement();
  initializeConversion();
  initializeSizeChart();
  updateMeasurement();
});

function initializeTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const contents = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  }));
}

function initializeMeasurement() {
  const slider = document.getElementById("diameterSlider");
  slider.addEventListener("input", updateMeasurement);
}

function updateMeasurement() {
  const slider = document.getElementById("diameterSlider");
  const diameter = parseFloat(slider.value);
  const circumference = Math.PI * diameter;
  document.getElementById("diameterValue").textContent = `${diameter.toFixed(1)} mm`;
  document.getElementById("ringInfoValue").textContent = `${circumference.toFixed(1)} mm`;

  const visualRing = document.getElementById("visualRing");
  const size = Math.min(diameter * 4, 300);
  visualRing.style.width = `${size}px`;
  visualRing.style.height = `${size}px`;

  const closest = RING_SIZES.reduce((a, b) =>
    Math.abs(b.diameter - diameter) < Math.abs(a.diameter - diameter) ? b : a
  );
  document.getElementById("usSize").textContent = closest.us;
  document.getElementById("ukSize").textContent = closest.uk;
  document.getElementById("euSize").textContent = closest.eu;
}

function initializeConversion() {
  const standard = document.getElementById("sizeStandard");
  const value = document.getElementById("sizeValue");
  standard.addEventListener("change", () => populateSizeOptions());
  value.addEventListener("change", updateConversion);
  populateSizeOptions();
}

function populateSizeOptions() {
  const standard = document.getElementById("sizeStandard").value;
  const select = document.getElementById("sizeValue");
  select.innerHTML = "";
  RING_SIZES.forEach(size => {
    const opt = document.createElement("option");
    opt.value = size[standard];
    opt.textContent = size[standard];
    select.appendChild(opt);
  });
}

function updateConversion() {
  const std = document.getElementById("sizeStandard").value;
  const val = document.getElementById("sizeValue").value;
  const size = RING_SIZES.find(s => s[std] === val);
  if (!size) return;
  document.getElementById("convertedUS").textContent = size.us;
  document.getElementById("convertedUK").textContent = size.uk;
  document.getElementById("convertedEU").textContent = size.eu;
  document.getElementById("convertedDiameter").textContent = `${size.diameter} mm`;
  document.getElementById("convertedCircumference").textContent = `${size.circumference} mm`;
}

function initializeSizeChart() {
  const body = document.getElementById("sizeTableBody");
  RING_SIZES.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${s.us}</td><td>${s.uk}</td><td>${s.eu}</td><td>${s.diameter}</td><td>${s.circumference}</td>`;
    body.appendChild(row);
  });
}
