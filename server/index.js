const sourceMap = require("source-map");
var formidable = require("formidable");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const multipartry = require("multiparty");

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

const uploadDir = `${__dirname}/map`;
const multipartry_load = function (req, auto) {
  // eslint-disable-next-line no-unused-expressions
  typeof auto !== "boolean" ? (auto = false) : null;
  let config = {
    maxFieldsSize: 200 * 1024 * 1024,
  };
  if (auto) config.uploadDir = uploadDir;
  // 解析文件并放到指定目录下
  return new Promise(async (resolve, reject) => {
    // 用来将客户端formData 结果解析
    new multipartry.Form(config).parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      var inputFile = files.file[0];
      var uploadPath = inputFile.path;
      var dstPath = `${__dirname}/map/${inputFile.originalFilename}`;
      console.log(dstPath);
      console.log(uploadPath);
      fs.rename(uploadPath, dstPath, function (err) {
        if (err) {
          console.log("error");
        } else {
          console.log("ok");
        }
      });

      resolve({
        fields,
        files,
      });
    });
  });
};

app.post("/upload_single", async (req, res) => {
  try {
    console.log(req);
    //todo: 单文件上传核心, 用 multiparty_load 进行处理
    let { files, fields } = await multipartry_load(req, true);
    let file = (files.file && files.file[0]) || {};
    res.send({
      code: 0,
      codeText: "上传成功",
      originFilename: file.originFilename,
    });
  } catch (err) {
    res.send({
      code: 1,
      codeText: err,
    });
  }
});

/**
 * multipart 和 formidable 的区别
 * multipart 是 FormData类型
 * formidable
 *
 * */

// 文件上传
app.post("/upload", async (req, res) => {
  var form = new formidable.IncomingForm(); // 创建上传表单
  form.encoding = "utf-8"; // 设置编辑
  form.uploadDir = `${__dirname}/map`; // 设置上传目录
  form.keepExtensions = true; // 保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小（默认20M）

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send({
        status: 201,
        message: err,
      });
      return;
    }
    try {
      var newPath = form.uploadDir + "/" + req.query.name;
      // 若文件流的键名为uplaodFile，则fs.renameSync(files.uplaodFile.path, newPath)
      fs.renameSync(files.file.filepath, newPath); //重命名
      res.send({ status: 200, message: "文件上传成功" });
    } catch (err) {
      res.send({
        status: 201,
        message: err,
      });
      return;
    }
  });
});
