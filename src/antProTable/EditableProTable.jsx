import React, { useState, useRef } from "react";
import { EditableProTable } from "@ant-design/pro-components";
import { Tag, Input } from "antd";
import TagList from "./TagList";

const waitTime = (time = 500, callBack) => {
  callBack(true);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
      callBack(false);
    }, time);
  });
};

const statusEnum = {
  open: {
    text: "Open",
    status: "OPEN",
  },
  working: {
    text: "Working",
    status: "WORKING",
  },
  done: {
    text: "Done",
    status: "DONE",
  },
  overdue: {
    text: "Overdue",
    status: "OVERDUE",
  },
};

const defaultData = [
  {
    id: 624748504,
    timeStamp: Date.now(),
    title: "title1",
    description: "description1",
    dueDate: Date.now() + 2,
    tags: [{ key: "tag1", label: "tag1" }],
    status: "Open",
  },
  {
    id: 624691229,
    timeStamp: Date.now(),
    title: "title2",
    description: "description2",
    dueDate: Date.now() + 3,
    tags: [{ key: "tag2", label: "tag2" }],
    status: "Closed",
  },
];

const App = () => {
  const [editableKeys, setEditableRowKeys] = useState();
  const [dataSource, setDataSource] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const dataChangeRef = useRef(null);

  const setDataChange = (data) => {
    dataChangeRef.current = data;
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      width: 70,
      valueType: "indexBorder",
    },
    {
      title: "Timestamp",
      tooltip: "Timestamp",
      dataIndex: "timeStamp",
      readonly: true,
      width: "10%",
      valueType: "date",
    },
    {
      title: "Title",
      dataIndex: "title",
      tooltip: "Title",
      formItemProps: {
        rules: [{ required: true, message: "enter title" }],
      },
      editable: () => true,
      width: "10%",
      renderFormItem: () => <Input placeholder="title" maxLength={100} />,
    },
    {
      title: "Description",
      dataIndex: "description",
      tooltip: "Description",
      width: "20%",
      formItemProps: {
        rules: [{ required: true, message: "enter description" }],
      },
      editable: () => true,
      renderFormItem: () => (
        <Input placeholder="description" maxLength={1000} />
      ),
    },
    {
      title: "Due Date",
      tooltip: "Due Date",
      dataIndex: "dueDate",
      width: "10%",
      valueType: "date",
    },
    {
      title: "Tags",
      tooltip: "Tags",
      dataIndex: "tags",
      width: "20%",
      editable: true,
      renderFormItem: () => <TagList />,
      render: (_, row) => {
        return row?.tags?.map((item) => <Tag key={item.key}>{item.label}</Tag>);
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      valueType: "select",
      initialValue: "Open",
      valueEnum: statusEnum,
      formItemProps: {
        rules: [{ required: true, message: "select the status" }],
      },
    },
    {
      title: "operate",
      valueType: "option",
      width: "10%",
      render: (text, record, _, action) => {
        return [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            edit
          </a>,
          <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
          >
            delete
          </a>,
        ];
      },
    },
  ];

  return (
    <>
      <EditableProTable
        rowKey="id"
        headerTitle="TODO"
        scroll={{
          x: 960,
        }}
        recordCreatorProps={{
          position: "bottom",
          record: () => ({
            id: (Math.random() * 1000000).toFixed(0),
            timeStamp: Date.now(),
          }),
          ...{
            children: () => <div>Add</div>,
            onClick: () => console.log("clicked"),
          },
        }}
        defaultSize="large"
        onValuesChange={(_, data) => setDataChange(data)}
        value={dataSource}
        loading={loading}
        columns={columns}
        request={async (params) => ({
          data: dataSource,
          page: params.current,
          success: true,
        })}
        onChange={setDataSource}
        pagination={{
          defaultPageSize: 3,
          total: dataSource.length,
          showTotal: false,
          onChange: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 500);
          },
        }}
        editable={{
          type: "multiple",
          onlyAddOneLineAlertMessage: (
            <div>Only one line can be added at a time</div>
          ),
          // actionRender: (row, config, dom) => {
          //   return [
          //     <a
          //       key="cancel"
          //       onClick={() => {
          //         dataChangeRef.current = null;
          //         config.cancelEditable(row.id);
          //       }}
          //     >
          //       Cancel
          //     </a>,
          //     <a
          //       key="delete"
          //       onClick={() => {
          //         setDataSource(
          //           dataSource.filter((item) => item.id !== row.id)
          //         );
          //         dataChangeRef.current = null;
          //         config.cancelEditable(row.id);
          //       }}
          //     >
          //       Delete
          //     </a>,
          //     <a
          //       key="save"
          //       onClick={() => {
          //         if (dataChangeRef.current !== null) {
          //           setDataSource((prev) => {
          //             if (
          //               !prev.some(
          //                 (item) => item?.id === dataChangeRef.current?.id
          //               )
          //             ) {
          //               return [...prev, dataChangeRef.current];
          //             }
          //             return prev.map((item) => {
          //               if (item?.id === dataChangeRef.current?.id) {
          //                 return dataChangeRef.current;
          //               }
          //               return item;
          //             });
          //           });
          //           dataChangeRef.current = null;
          //           config.cancelEditable(row.id);
          //         }
          //       }}
          //     >
          //       Save
          //     </a>,
          //   ];
          // },
          editableKeys,
          onSave: async (rowKey, data, row) => {
            await waitTime(500, setLoading);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default App;
