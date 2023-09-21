import { styled } from "@mui/material";
import { useDocumentAction, useGetDocumentPageAction } from "./documentState";
import LexEditor from "../../components/lexEditor/LexEditor";
import MonacoEditor from "../../components/monacoEditor/MonacoEditor";

const DocumentView = styled("iframe")(({theme}) => (
    {
        width: "100%",
        height: "100%",
        border: "none",
    }
));

export default function DocumentContainer() {

    const getDocAction = useGetDocumentPageAction();
    const viewDocumentId = getDocAction.selectedDocumentPageId;
    const page = getDocAction.useGetDocumentPage(viewDocumentId as string);

    const content = page ? page.content : "";

    if (getDocAction.isEditableMode) {

        if (page == undefined) return <></>

        if (page.contentType == "lexHtml") {
            return <>
            <LexEditor></LexEditor>
            </>
        }

        if (page.contentType == "html") {
            return <>
                <MonacoEditor></MonacoEditor>
            </>
        }

    }

    return <>
        <DocumentView srcDoc={content}></DocumentView>
        {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
    </>
}