const data = require("./finedData/province.json");
const fs = require("fs");

function spliter(input) {
  const result = [];
  let buffer = "";
  let depth = 0; // theo dõi mức độ ngoặc ()

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "(") {
      depth++;
      buffer += char;
    } else if (char === ")") {
      depth = Math.max(depth - 1, 0);
      buffer += char;
    } else if (char === "," && depth === 0) {
      // dấu phẩy ngoài ngoặc
      result.push(buffer.trim());
      buffer = "";
    } else {
      buffer += char;
    }
  }

  if (buffer.trim()) {
    result.push(buffer.trim());
  }

  return result;
}

function refineChildren(provinceCode) {
  console.log(provinceCode);
  console.log("----------------");
  const provinceData = data.find((item) => item.provinceCode === provinceCode);
  if (!provinceData) {
    console.error(`Cannot find province with code ${provinceCode}`);
    return;
  }
  fs.readFile(`./raw/xaphuong/${provinceCode}.json`, (err, data) => {
    if (err) {
      console.error(`Error reading file for province ${provinceCode}:`, err);
      return;
    }
    const wardData = JSON.parse(data);

    const result = wardData.map((item) => {
      return {
        id: item.id,
        communeCode: item.maxa,
        name: item.tenhc,
        provinceCode: provinceCode,
        provinceName: provinceData.provinceName,
        type: item.loai,
        areaKm2: parseFloat(item.dientichkm2),
        population: parseFloat(item.dansonguoi),
        administrativeCenter: item.trungtamhc.trim(),
        longitude: item.kinhdo,
        latitude: item.vido,
        previous: spliter(item.truocsapnhap),
        treeCode: item.cay,
      };
    });

    console.log(result);
    const jsonData = JSON.stringify(result, null, 2);

    fs.writeFile(
      `./finedData/commune/${provinceCode}.json`,
      jsonData,
      (err) => {
        if (err) {
          console.error(
            `Error writing file for province ${provinceCode}:`,
            err
          );
        } else {
          console.log(`JSON data saved to commune/${provinceCode}.json`);
        }
      }
    );
  });
}

function main() {
  for (let i = 0; i < data.length; i++) {
    refineChildren(data[i].provinceCode);
  }

  // refineChildren(22);
}
main();
