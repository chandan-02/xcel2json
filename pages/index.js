import { useState } from 'react';
import dynamic from 'next/dynamic'

import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as XLS from "xlsx";

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const { Dragger } = Upload;

export default function Home() {
  const [json, setJson] = useState({})
  const convertToJson = csv => {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return JSON.stringify(result);
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <main style={{ backgroundColor: '#FFFFFF', height: '100vh' ,}}>
      <div style={{ paddingTop: '5rem', width: '100%', }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{width:'45%'}}>
            <Dragger
              customRequest={dummyRequest}
              beforeUpload={file => {
                let reader = new FileReader();
                reader.onload = function (e) {
                  const bstr = e.target.result;
                  const wb = XLS.read(bstr, { type: "binary" });
                  const wsname = wb.SheetNames[0];
                  const ws = wb.Sheets[wsname];
                  const data = XLS.utils.sheet_to_csv(ws, { header: 1 });
                  let dataDone = JSON.parse(convertToJson(data));
                  setJson(dataDone)
                  console.log({ "JSON": dataDone });
                }
                reader.readAsBinaryString(file);
              }}
              onRemove={() => {
                setJson({})
              }}
              style={{ padding: '2rem', }}
              accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Easily convert excel files to json
              </p>
            </Dragger>
            <div style={{ paddingTop: '2rem' }}>
              {<ReactJson name={null} src={json} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
