import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Col, Row, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { ACTION } from "../../../constants";
import { getListPrivilegeTree } from "../../../modules/PhanQuyenTaiKhoan/api/privilege.api";
interface TreeNodeData {
  key: string;
  title: string;
  parentCode: string;
  children?: TreeNodeData[];
}

interface IProps {
  dictOps: any;
  setDictOps: any;
  dictRead: any;
  setDictRead: any;
  opsActionList: any;
  readActionList: any;
  allActionList: any;
  expandKeyList: any;
  dataRoleDetail: any;
  typeOpenModal: any;
}

const TreePhanQuyenVaiTro = (props: IProps) => {
  //! state
  const {
    dictOps,
    setDictOps,
    dictRead,
    setDictRead,
    opsActionList,
    readActionList,
    allActionList,
    expandKeyList,
    dataRoleDetail,
    typeOpenModal,
  } = props;

  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);

  const [indeterminateOps, setIndeterminateOps] = useState<any>({});
  const [indeterminateRead, setIndeterminateRead] = useState<any>({});

  const objIndeterminate: any = {};

  const getLeaves = (item: any) => {
    if (item.children.length > 0) {
      item.children.forEach((elm: any) => {
        if (elm.children.length > 0) {
          readActionList.push(getLeaves(elm));
        } else {
          if (elm.action === ACTION.READ) {
            readActionList.push(elm?.code);
          }
          if (elm.action === ACTION.OPS) {
            opsActionList.push(elm?.code);
          }
          if (elm.action === ACTION.ALL) {
            allActionList.push(elm?.code);
          }
        }
      });
    } else {
      if (item.action === ACTION.READ) {
        readActionList.push(item?.code);
      }
      if (item.action === ACTION.OPS) {
        opsActionList.push(item?.code);
      }
      if (item.action === ACTION.ALL) {
        allActionList.push(item?.code);
      }
    }
  };

  treeData?.forEach((item: any) => {
    getLeaves(item);
    expandKeyList.push(item.key);
  });


  const handleITMOps = (dictOps: any) => {
    const cloneObjIndeterminate = { ...objIndeterminate };
    const cloneDictOps = { ...dictOps };
    const treeData0 = treeData.filter(value => value.parentCode === null);
    treeData0.forEach((el: any) => {
      processITM(el, cloneObjIndeterminate, cloneDictOps)
    });
    setDictOps(cloneDictOps);
    setIndeterminateOps(cloneObjIndeterminate);
  };

  const handleITMRead = (dictRead: any) => {
    const cloneObjIndeterminate = { ...objIndeterminate };
    const cloneDictRead = { ...dictRead };
    const treeData0 = treeData.filter(value => value.parentCode === null);
    treeData0.forEach((el: any) => {
      processITM(el, cloneObjIndeterminate, cloneDictRead)
    });
    setDictRead(cloneDictRead);
    setIndeterminateRead(cloneObjIndeterminate);
  };

  const processITM = (node: any, objIndeterminate: any, dict: any) => {
    if (node?.children?.length > 0){
      node.children.forEach((el: any) => {
        processITM(el, objIndeterminate, dict);
      });
      const checkIndeterminate =
          node.children.length > 0 &&
          node.children.every((item: any) => dict[item.key]);
      if (checkIndeterminate) {
        objIndeterminate[node.key] = false;
        dict[node.key] = true;
      } else {
        const checkIndeterminate2 = node.children.some(
            (item: any) => dict[item.key]
        );
        if (checkIndeterminate2) {
          objIndeterminate[node.key] = true;
          dict[node.key] = true;
        }
      }
      const isUncheckAll =
          node.children.length > 0 &&
          node.children.every((item: any) => !dict[item.key]);
      if (isUncheckAll){
        objIndeterminate[node.key] = false;
        dict[node.key] = false;
      }
    }
  };


  const handleChangeOps = (e: any, el: any) => {
    const cloneDictOps = { ...dictOps };
    const cloneDictRead = { ...dictRead };

    processChange(e, el, cloneDictOps);

    setDictOps(cloneDictOps);

    for (const key in cloneDictOps) {
      if (cloneDictOps[key]) {
        cloneDictRead[key] = true;
      }
    }
    setDictRead(cloneDictRead);
    handleITMOps(cloneDictOps);
    handleITMRead(cloneDictRead);
  };

  const handleChangeRead = (e: any, el: any) => {
    const cloneDictOps = { ...dictOps };
    const cloneDictRead = { ...dictRead };

    cloneDictRead[el.key] = e.target.checked;

    processChange(e, el, cloneDictRead);

    setDictRead(cloneDictRead);

    if (cloneDictOps[el.key]) {
      for (const key in cloneDictRead) {
        if (!cloneDictRead[key]) {
          cloneDictOps[key] = false;
        }
      }
    }
    setDictOps(cloneDictOps);
    handleITMRead(cloneDictRead);
    handleITMOps(cloneDictOps);
  };

  const processChange = (e: any, el: any, dict: any) => {

    dict[el.key] = e.target.checked;

    if (el?.children?.length > 0) {
      el.children.forEach((item: any) => {
        dict[item.key] = e.target.checked;
        processChange(e, item, dict)
      });
    }

  };

  const convertData = (data: any) => {
    return data?.map((el: any) => {
      return {
        ...el,
        title: (
          <Row
            style={{ width: "100%", display: "flex", color: "black" }}
            key={el.key}
            className="custom-style-data-tree"
          >
            <Col span={18} style={{ width: "100%", color: "black" }}>
              {el.title}
            </Col>
            <Col
              span={3}
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                flex: 1,
              }}
            >
              <Checkbox
                name={`${el.key}-read`}
                onChange={(e) => {
                  handleChangeRead(e, el);
                }}
                checked={dictRead[el.key]}
                disabled={opsActionList.includes(el.key)}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                indeterminate={indeterminateRead[el.key]}
                style={
                  typeOpenModal !== "detail"
                    ? { marginLeft: el?.children?.length > 0 ? "10px" : "0" }
                    : {
                        pointerEvents: "none",
                        marginLeft: el?.children?.length ? "10px" : "0",
                      }
                }
              />
            </Col>
            <Col
              span={3}
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Checkbox
                name={`${el.key}-ops`}
                onChange={(e) => {
                  handleChangeOps(e, el);
                }}
                checked={dictOps[el.key]}
                disabled={readActionList.includes(el.key)}
                onClick={(e) => e.stopPropagation()}
                indeterminate={indeterminateOps[el.key]}
                style={
                  typeOpenModal !== "detail"
                    ? { marginLeft: el?.children?.length ? "2px" : "0" }
                    : {
                        pointerEvents: "none",
                        marginLeft: el?.children?.length ? "2px" : "0",
                      }
                }
              />
            </Col>
          </Row>
        ),
        children: convertData(el.children),
      };
    });
  };

  const fillCheckboxRead = (data: any) => {
    const cloneDictRead: any = {};
    data?.forEach((el: any) => {
      if (el.action === ACTION.READ) {
        cloneDictRead[el.privilegeCode] = true;
      }
    });
    setDictRead(cloneDictRead);
    handleITMRead(cloneDictRead);
  };

  const fillCheckboxOps = (data: any) => {
    const cloneDictOps: any = {};
    data?.forEach((el: any) => {
      if (el.action === ACTION.OPS) {
        cloneDictOps[el.privilegeCode] = true;
      }
    });
    setDictOps(cloneDictOps);
    handleITMOps(cloneDictOps);
  };

  useEffect(() => {
    if (dataRoleDetail) {
      fillCheckboxRead(dataRoleDetail.privileges);
      fillCheckboxOps(dataRoleDetail.privileges);
    }
  }, [dataRoleDetail]);

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const convertToTreeData = (data: any[]): TreeNodeData[] => {
    return data.map((item) => ({
      key: item.key,
      title: item.name,
      parentCode: item.parentCode,
      children: item.children ? convertToTreeData(item.children) : [],
    }));
  };

  const generateExpandedKeys = (data: TreeNodeData[]): React.Key[] => {
    let keys: React.Key[] = [];
    data.forEach((item) => {
      keys.push(item.key);
      if (item.children) {
        keys = keys.concat(generateExpandedKeys(item.children));
      }
    });
    return keys;
  };

  //! useEffect
  useEffect(() => {
    const getTree = async () => {
      try {
        const res = await getListPrivilegeTree();
        const convertedData = convertToTreeData(res.result);
        setTreeData(convertedData);
        setExpandedKeys(generateExpandedKeys(convertedData));
      } catch (e) {
        console.error(e);
      }
    };

    getTree();
  }, []);

  //! render
  return (
    <div>
      <Row style={{ paddingTop: "12px" }}>
        <Col span={18} className="col-list-tree">
          Danh sách chức năng
        </Col>
        <Col span={3} className="col-list-tree-width-full">
          Tra cứu
        </Col>
        <Col span={3} className="col-list-tree-width-full">
          Xử lý
        </Col>
      </Row>
      <Row className="row-tree-data-role antd-table-body">
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          expandedKeys={expandedKeys}
          onExpand={(keys) => setExpandedKeys(keys)}
          treeData={convertData(treeData)}
          className="tree-data-role"
        />
      </Row>
    </div>
  );
};

export default TreePhanQuyenVaiTro;
