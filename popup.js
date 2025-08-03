document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("selectedText", data => {
    if (data.selectedText) {
      document.getElementById("input").value = data.selectedText;
      chrome.storage.local.remove("selectedText");
    }
  });

  document.getElementById("convert").addEventListener("click", () => {
    const rawText = document.getElementById("input").value;
    const targetUnit = document.getElementById("unit").value.trim().toLowerCase();

    const output = document.getElementById("output");
    const converted = convertMeasurements(rawText, targetUnit);

    if (converted.length > 0) {
      output.textContent = converted.join(" × ") + " " + targetUnit;
    } else {
      output.textContent = "Invalid input or unsupported unit.";
    }
  });
});

function convertMeasurements(text, targetUnit) {
  const mmTo = {
    in: mm => mm / 25.4,
    ft: mm => mm / 304.8,
    cm: mm => mm / 10,
    m: mm => mm / 1000
  };

  const converter = mmTo[targetUnit];
  if (!converter) return [];

  const parts = text.match(/[\d.]+/g);
  if (!parts) return [];

  return parts.map(num => {
    const mm = parseFloat(num);
    if (isNaN(mm)) return "?";
    return converter(mm).toFixed(2);
  });
}
