const data = require("./raw/tinhthanh.json");
const fs = require("fs");
function splitProvinces(input) {
  if (input.trim().toLowerCase() === "không sáp nhập") {
    return null;
  }
  return input
    .split(/, và | và |,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseAdministrativeUnits(input) {
  const totalMatch = input.match(/^(\d+)\s+ĐVHC/);
  const insideMatch = input.match(/\((.*?)\)/);

  if (!totalMatch || !insideMatch) return null;

  const total = parseInt(totalMatch[1], 10);

  // Tách bằng cả dấu phẩy, "và", hoặc tổ hợp ", và"
  const parts = insideMatch[1].split(/,?\s*và\s*|,\s*/).map((p) => p.trim());

  const mapping = {
    "đặc khu": "specialZone",
    phường: "ward",
    phường: "ward", // sai chính tả vẫn xử lý được
    xã: "commune",
    "thị trấn": "town",
    quận: "urbanDistrict",
    huyện: "ruralDistrict",
    // có thể mở rộng thêm nếu cần
  };

  const result = {
    total,
    specialZone: 0,
    ward: 0,
    commune: 0,
  };

  for (const part of parts) {
    const match = part.match(/(\d+)\s+(.+)/);
    if (match) {
      const number = parseInt(match[1], 10);
      const label = match[2].normalize("NFC").toLowerCase();

      const key = Object.keys(mapping).find((k) => label.includes(k));
      if (key) {
        const mappedKey = mapping[key];
        result[mappedKey] = number;
      }
    }
  }

  return result;
}

const result = data.map((item) => {
  return {
    id: item.id,
    provinceCode: item.mahc,
    provinceName: item.tentinh,
    areaKm2: parseFloat(item.dientichkm2.replace(/\./g, "").replace(",", ".")),
    population: parseFloat(item.dansonguoi.replace(/\./g, "")),
    administrativeCenter: item.trungtamhc,
    longitude: item.kinhdo,
    latitude: item.vido,
    previousProvince: splitProvinces(item.truocsapnhap) || [item.tentinh],
    children: parseAdministrativeUnits(item.con),
  };
});

const jsonData = JSON.stringify(result, null, 2);

// Write JSON string to a file
fs.writeFile("finedData/province.json", jsonData, (err) => {
  if (err) {
    console.error("Error writing file", err);
  } else {
    console.log("JSON data saved to province.json");
  }
});
