import { RecoilRoot } from "recoil";
import TreeViewer from "../documentView/treeViewer/TreeViewer";
import DocumentContainer from "../documentView/DocumentContainer";
import { useDocumentAction } from "../documentView/documentState";
import Header from "../header/Header";

export default function AppContainer() {
    
    const { initializeState } = useDocumentAction();

    return <>
        <RecoilRoot initializeState={initializeState}>
          <div className="App">
            <Header></Header>
            <div className='MainContent'>
              <TreeViewer></TreeViewer>
              <DocumentContainer></DocumentContainer>
            </div>
          </div>
        </RecoilRoot>
    </>
}