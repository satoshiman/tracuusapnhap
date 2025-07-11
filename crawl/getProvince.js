const fs = require("fs");

async function fetchData() {
  const response = await fetch("https://sapnhap.bando.com.vn/pcotinh", {
    headers: {
      accept: "text/plain, */*; q=0.01",
      "accept-language":
        "en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5,en-IN;q=0.4",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      pragma: "no-cache",
      "sec-ch-ua":
        '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: "PHPSESSID=g86ihgocqgbnguqi9olh511afo",
      Referer: "https://sapnhap.bando.com.vn/pcotinh",
    },
    body: "id=0",
    method: "POST",
  });

  const data = await response.json();

  console.log(data);
  const jsonData = JSON.stringify(data, null, 2);

  // Write JSON string to a file
  fs.writeFile("output.json", jsonData, (err) => {
    if (err) {
      console.error("Error writing file", err);
    } else {
      console.log("JSON data saved to output.json");
    }
  });
  //   const result = data.map((item) => {
  //     return {
  //       id: item.id,
  //       mahc: item.mahc,
  //       tentinh: item.tentinh,
  //       dientichkm2: item.dientichkm2,
  //       dansonguoi: item.dansonguoi,
  //       trungtamhc: item.trungtamhc,
  //       kinhdo: item.kinhdo,
  //       vido: item.vido,
  //       truocsapnhap: item.truocsapnhap,
  //       con: item.con,
  //     };
  //   });
  //   console.log(result);
}

fetchData();
