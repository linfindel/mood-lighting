document.getElementById("colour").oninput = () => {
  document.body.style.backgroundColor = document.getElementById("colour").innerText;

  localStorage.setItem("saved-colour", document.getElementById("colour").innerText);

  calculateContrastRatio();
}

if (localStorage.getItem("saved-colour")) {
  document.body.style.backgroundColor = localStorage.getItem("saved-colour");
  document.getElementById("colour").innerText = localStorage.getItem("saved-colour");
  calculateContrastRatio();
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function getRelativeLuminance(rgb) {
  const [r, g, b] = rgb.map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function calculateContrastRatio() {
  var foreground = "#ffffff";

  const cssObj = window.getComputedStyle(document.body, null);
  var background = cssObj.getPropertyValue("background-color");
  background = background.replace("rgb(", "");
  background = background.replace(")", "");
  background = background.split(",");

  if (foreground && background) {
    const fgRgb = hexToRgb(foreground);

    const fgLuminance = getRelativeLuminance(fgRgb);
    const bgLuminance = getRelativeLuminance(background);
    
    var contrastRatio = (Math.max(fgLuminance, bgLuminance) + 0.05) / (Math.min(fgLuminance, bgLuminance) + 0.05);
    contrastRatio = contrastRatio.toFixed(2);

    if (contrastRatio < 2) {
      document.getElementById("colour").style.color = "black";
      document.getElementById("help").style.color = "black";
    }

    else {
      document.getElementById("colour").style.color = "white";
      document.getElementById("help").style.color = "white";
    }
  }
}