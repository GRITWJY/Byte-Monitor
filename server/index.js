const sourceMap = require("source-map");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.post("/getErrorDetail", (req, res) => {
  parse(req.body).then((data) => {
    res.send(data);
  });
});

app.listen(3001, () => {
  console.log("server listen on port 3001...");
});

async function parse(error) {
  const mapObj = JSON.parse(getMapFileContent(error.fileName));
  const consumer = await new sourceMap.SourceMapConsumer(mapObj);
  // 将 webpack://souce-map-demo/./src/index.js
  const sources = mapObj.sources.map((item) => format(item));
  // 根据压缩后的报错信息得出未压缩前的报错行和源码文件
  const originalInfo = consumer.originalPositionFor({
    line: error.lineNumber,
    column: error.columnNumber,
  });
  // sourcesContent 中包含了各个文件的未压缩前的源码，根据文件名找出对应的源码
  const originalFileContent =
    mapObj.sourcesContent[sources.indexOf(originalInfo.source)];

  console.log(originalFileContent);

  // 将源代码串按"行结束标记"拆分为数组形式
  const rawLines = originalFileContent.split(/\r?\n/g);

  // 截取报错行前后代码片段，因为数组索引从0开始，故行数需要-1
  let code = [];
  for (let i = originalInfo.line - 5; i < originalInfo.line + 5; i++) {
    if (i >= 0) {
      code.push(rawLines[i]);
    }
  }
  return {
    file: originalInfo.source,
    content: code.join("\n"),
    line: originalInfo.line,
    column: originalInfo.column,
  };
}

function format(item) {
  return item.replace(/(\.\/)*/g, "");
}

function getMapFileContent(url) {
  return fs.readFileSync(
    path.resolve(__dirname, `./map/${url.split("/").pop()}.map`),
    "utf-8"
  );
}
