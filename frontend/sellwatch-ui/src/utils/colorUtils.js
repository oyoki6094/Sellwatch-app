export function getContrastColor(hex) {
    if (!hex) return "#000000";
  
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
  
    // Calcul de luminosité (standard W3C)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness > 150 ? "#000000" : "#FFFFFF";
  }
  