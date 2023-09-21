import * as React from 'react';
import Box from '@mui/material/Box';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { DocumentPage } from '../../../common/types';
import { useDocumentAction, useGetDocumentPageAction } from '../documentState';
import { Button } from '@mui/material';
import TreeViewItem from './TreeViewItem';
import { useCallback } from 'react';

export default function TreeViewer() {

  const getDocActions = useGetDocumentPageAction();
  const docActions = useDocumentAction();

  const documentPageIds = getDocActions.documentIds;

  const test = (nest: number, c?: DocumentPage) => {

    // if (nest > 5) return;

    // for (let ii = 0; ii < 5; ii++) {

    //   const id = crypto.randomUUID();
    //   const a = bb.newDocumentPage(id, "html", id, c ? c.id : undefined);
    //   const max = 3;

    //   console.log(ii);

    //   for (let i = 0; i < max; i++) {
    //     test(nest++, a);
    //   }
    // }
    const id = crypto.randomUUID();
    const a = docActions.newDocumentPage(
      {
        id, 
        title: id,
        contentType: "html", 
        content: `<span style="color:red;"><strong>${id}</strong></span>`, 
        parentId: c ? c.id : undefined,
      });
    
    return ;
  }

  const click = () => {

    let n = 0;
    test(n);

    // const test =  bb.newDocumentPage("test", "html", crypto.randomUUID());
    // const test2 = bb.newDocumentPage("aaaa", "html", "", test.id);

  }

  const clickHandler = useCallback((event: React.SyntheticEvent, nodeIds: string) => {
    docActions.setSelectionDocumentPage(nodeIds);
  }, []);

  const selDivId = getDocActions.selectedDivisionId;

  const idList = Object.keys(documentPageIds)
  .filter(id => (selDivId && (selDivId == id || documentPageIds[id].parentId != undefined) || selDivId == undefined))

  console.log(idList);

  return (
    <Box sx={{ overflow: "auto", flexGrow: 1 }}>
      {/* <Button onClick={click}>aaaaaa</Button> */}
      <TreeView onNodeSelect={clickHandler} aria-label="multi-select"
        // defaultCollapseIcon={<ExpandMoreIcon />}
        // defaultExpandIcon={<ChevronRightIcon />} 
      >
        { 
          idList.map(id => <TreeViewItem key={id} documentPageId={id} parentId={ selDivId ? selDivId : undefined }></TreeViewItem>) 
        }
      </TreeView>
    </Box>
  );
}