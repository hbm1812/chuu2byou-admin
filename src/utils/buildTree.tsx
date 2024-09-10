export const buildTree = (data?: any) => {
  const children = data?.reduce((acc: any, item: any) => {
    if (item.parentId !== null) {
      if (!acc[item.parentId]) {
        acc[item.parentId] = [];
      }
      acc[item.parentId].push(item);
    }
    return acc;
  }, {});

  const buildNode = (id: number) => {
    const node = data?.find((item: any) => item.id === id);
    if (!node) return null;
    const tree = { ...node, key: node.id, children: [] };
    if (children[node.id]) {
      tree.children = children[node.id]
        ?.map((child: any) => buildNode(child.id))
        ?.filter((child: any) => child !== null);
    }
    return tree;
  };

  return data
    ?.filter((item: any) => item.parentId === null)
    ?.map((root: any) => buildNode(root.id))
    ?.filter((node: any) => node !== null);
};

export const addIndexes = (nodes: any, prefix = "") => {
    return nodes?.map((node: any, index: number) => {
      const currentPrefix = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
      return {
        ...node,
        index: currentPrefix,
        children: addIndexes(node?.children, currentPrefix),
      };
    });
  };
