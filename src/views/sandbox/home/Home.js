import React from "react";
import { Collapse, Button, Upload } from "antd";
import "./home.css";
import axios from "axios";
import sourceMap from "source-map";
import { useState } from "react";
const { Panel } = Collapse;

// sourcemap解析
sourceMap.SourceMapConsumer.initialize({
  "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.3/lib/mappings.wasm",
});

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// Home组件
const Home = () => {
  // 错误堆栈
  let [stack, setStack] = useState([
    {
      id: "0",
      columnNumber: 935,
      codeStr: "",
      lineNumber: 1,
      fileName:
        "http://localhost:63342/vue-webpack-template/dist/static/js/main.433d6763ae.js",
      functionName: "a.handleVueError",
      source:
        "    at a.handleVueError (http://localhost:63342/vue-webpack-template/dist/static/js/main.433d6763ae.js:1:935)",
    },
    {
      id: "1",
      columnNumber: 47161,
      lineNumber: 2,
      codeStr: "",
      fileName:
        "http://localhost:63342/vue-webpack-template/dist/static/js/vue-chunk.0b1c7d6842.js",
      functionName: "Ee",
      source:
        "    at Ee (http://localhost:63342/vue-webpack-template/dist/static/js/vue-chunk.0b1c7d6842.js:2:47161)",
    },
    {
      id: "2",
      columnNumber: 40015,
      lineNumber: 2,
      codeStr: "",
      fileName:
        "http://localhost:63342/vue-webpack-template/dist/static/js/vue-chunk.0b1c7d6842.js",
      functionName: "HTMLButtonElement.n",
      source:
        "    at HTMLButtonElement.n (http://localhost:63342/vue-webpack-template/dist/static/js/vue-chunk.0b1c7d6842.js:2:40015)",
    },
    {
      id: "3",
      columnNumber: 78851,
      lineNumber: 2,
      codeStr: "",
      fileName:
        "http://localhost:63342/vue-webpack-template/dist/static/js/vue-chunk.0b1c7d6842.js",
      functionName: "Xr.i._wrapper",
      source:
        "    at Xr.i._wrapper (http://localhost:63342/vue-webpack-template/dist/static/js/vue-chunk.0b1c7d6842.js:2:78851)",
    },
  ]);

  /**以下注释是upload组件的实现*/
  // const props = {
  //   showUploadList: false,
  //   beforeUpload(file) {
  //     console.log(file);
  //     const reader = new FileReader();
  //     reader.readAsText(file, "UTF-8");
  //     reader.onload = async (event) => {
  //       console.log(typeof event.target.result);
  //       console.log(event.target.result);
  //       // const look_source = await analysisFile(
  //       //   event.target.result,
  //       //   stack.lineNumber,
  //       //   stack.columnNumber
  //       // );
  //       // setCodeStr(look_source);
  //       // console.log(look_source);
  //     };
  //     return false;
  //   },
  // } // const getExtra = () => (
  //   //   <Upload {...props}>
  //   //     <Button>上传文件</Button>
  //   //   </Upload>
  //   // );

  // 用 node.js 后端实现解析
  const getFile = (info) => {
    axios({
      url: "http://localhost:3001/getErrorDetail",
      method: "post",
      data: info,
    }).then((res) => {
      const { data } = res;
      console.log(data);
      setStack(
        stack.map((item) => {
          if (item.id === info.id) {
            item.codeStr = data.content;
          }
          return item;
        })
      );
    });

    // let myRequest = new Request("../../assets/main.443d6763ae.js.map");
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "text/plain");

    // fetch(myRequest, {
    //   headers: myHeaders,
    // }).then(async function (response) {
    //   let blob = await response.blob();
    //   let file = new window.File([blob], "main.433d6763ae.js.map", {
    //     type: "",
    //   });
    //   console.log(file);
    //
    //   const reader = new FileReader();
    //   reader.readAsText(file, "UTF-8");
    //   reader.onload = async (event) => {
    //     console.log(event.target.result);
    //     // const look_source = await analysisFile(
    //     //   event.target.result,
    //     //   info.lineNumber,
    //     //   info.columnNumber
    //     // );
    //     //
    //     // setStack(
    //     //   stack.map((item) => {
    //     //     if (item.id === info.id) {
    //     //       item.codeStr = look_source;
    //     //     }
    //     //     return item;
    //     //   })
    //     // );
    //     // console.log(look_source);
    //   };
    // });
  };

  // 每个折叠板的按钮
  const getExtra = (item) => (
    <Button
      onClick={() => {
        getFile(item);
      }}
    >
      解析文件
    </Button>
  );

  // JIE西文件, 现以转为后端实现
  // const analysisFile = async (source_map, line, col) => {
  //   console.log(source_map);
  //   try {
  //     const consumer = await new sourceMap.SourceMapConsumer(source_map);
  //     const sourcemapData = consumer.originalPositionFor({
  //       line: line, // 压缩后的行数
  //       column: col, // 压缩后的列数
  //     });
  //
  //     if (!sourcemapData.source) return;
  //
  //     const sources = consumer.sources;
  //     // 根据查到的source，到源文件列表中查找索引位置
  //     const index = sources.indexOf(sourcemapData.source);
  //     // 到源码列表中查到源代码
  //     const content = consumer.sourcesContent[index];
  //
  //     // 将源代码串按"行结束标记"拆分为数组形式
  //     const rawLines = content.split(/\r?\n/g);
  //
  //     // 截取报错行前后代码片段，因为数组索引从0开始，故行数需要-1
  //     let code = [];
  //     for (let i = sourcemapData.line - 10; i < sourcemapData.line + 10; i++) {
  //       if (i >= 0) {
  //         const content = i + 1 + ".    " + encodeHTML(rawLines[i]);
  //         code.push(content);
  //       }
  //     }
  //     // 最后将解析结果和代码片段返回
  //     return code.join("\n");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // 把<>替换为 编码
  const encodeHTML = (str) => {
    if (!str || str.length === 0) return "";
    return str
      .replace(/&/g, "&#38;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&#39;");
  };

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      {stack.map((item) => {
        return (
          <Panel
            header={item.fileName}
            key={item.id}
            extra={getExtra(item)}
            collapsible="header"
          >
            <PreCode code={item.codeStr}></PreCode>
          </Panel>
        );
      })}
    </Collapse>
  );
};

// 代码展示区域组件
const PreCode = (props) => {
  return (
    <div className="pre_code">
      <div className="errdetail">
        <pre
          className="errCode"
          dangerouslySetInnerHTML={{ __html: props.code }}
        ></pre>
      </div>
    </div>
  );
};

export default Home;
