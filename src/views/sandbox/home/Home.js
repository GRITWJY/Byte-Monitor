import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Collapse, Button, Upload, Modal } from "antd";
import "./home.css";
import axios from "axios";
import { useState } from "react";
const { Panel } = Collapse;
const { Dragger } = Upload;

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

  const onChange = (key) => {
    console.log(key);
  };

  // 对话框
  let [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 文件上传

  const uploadProps = {
    name: "file",
    action: "http://localhost:3001/upload_single",
    multiple: true,
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <>
      <Button onClick={showModal}>上传文件</Button>
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

      <Modal
        title="上传 source-map 文件"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </Modal>
    </>
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
