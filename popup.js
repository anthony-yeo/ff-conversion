document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const unitField = document.getElementById("unit");
  const output = document.getElementById("output");

  const updateConversion = () => {
    const rawText = inputField.value;
    const targetUnit = unitField.value;

    const converted = convertMeasurements(rawText, targetUnit);

    if (converted.length > 0) {
      output.textContent = converted.join(" × ") + " " + targetUnit;
    } else {
      output.textContent = "–";
    }
  };

  inputField.addEventListener("input", updateConversion);
  unitField.addEventListener("change", updateConversion);
});

function convertMeasurements(input, targetUnit) {
  const toMillimeters = {
    mm: val => val,
    cm: val => val * 10,
    m:  val => val * 1000,
    in: val => val * 25.4,
    ft: val => val * 304.8
  };

  const fromMillimeters = {
    mm: mm => mm,
    cm: mm => mm / 10,
    m:  mm => mm / 1000,
    in: mm => mm / 25.4,
    ft: mm => mm / 304.8
  };

  const normalize = str => str.trim().toLowerCase().replace(/×/g, "x");

  const parts = normalize(input).split(/x/);

  const values = parts.map(part => {
    const match = part.match(/([\d.]+)\s*(mm|cm|in|ft|m)?/i);
    if (!match) return null;

    const value = parseFloat(match[1]);
    let unit = match[2] ? match[2].toLowerCase() : "mm"; // default if no unit

    if (isNaN(value) || !toMillimeters[unit]) return null;

    const mm = toMillimeters[unit](value);
    const converted = fromMillimeters[targetUnit](mm);
    return converted.toFixed(2);
  });

  return values.every(v => v !== null) ? values : [];
}
