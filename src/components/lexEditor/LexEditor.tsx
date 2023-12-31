import React, { useEffect } from 'react';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { styled } from '@mui/material';
import { $applyNodeReplacement, $getRoot, $insertNodes, ElementNode, ParagraphNode, TextNode } from 'lexical';
import { $generateNodesFromDOM } from '@lexical/html';
import { useGetDocumentPageAction } from '../../features/documentView/documentState';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { EditToolbar } from './EditToolBar';

const theme = {
  paragraph: 'editor-paragraph',
}

const ContentEditor = styled(ContentEditable)({
  outline: "none",
  // height: "100%",
  padding: "10px",
	boxSizing: "border-box",
});

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}


function Test(props: {src: string}) {

  const [editor] = useLexicalComposerContext();

  useEffect(() => {

    editor.update(() => {
      const parser = new DOMParser();
      const textHtmlMimeType: DOMParserSupportedType = 'text/html';
      const dom = parser.parseFromString(props.src, textHtmlMimeType);

      const nodes = $generateNodesFromDOM(editor, dom);

      const root = $getRoot();
      root.clear();

      try
      {
        root.append(...[...nodes]);
      }
      catch
      {
        root.append(new TextNode(props.src));
      }

    });
    
  }, [editor, props.src]);
  
  return null;
}


// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

type LexEditorProps = {
  source?: string,
}

export default function LexEditor(props: LexEditorProps) {

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    nodes:[
      TextNode,
      ParagraphNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      HeadingNode,
      QuoteNode
    ],
    onError,
  };

  const { selectedDocumentPageId, useGetDocumentPage } = useGetDocumentPageAction();
  const page = useGetDocumentPage(selectedDocumentPageId as string);
  const str = page ? page.content : "";

  

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
          <div style={{ display: "grid", gridTemplateRows: "auto 1fr", overflow: "hidden" }}>
          <EditToolbar></EditToolbar>   
          <div className='editor-scroller'>
          <div className='editor'>
          <RichTextPlugin
            contentEditable={<ContentEditor />}
            placeholder={<></>}
            // placeholder={<div className='editor-placeholder'>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <Test src={str} />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
      </div>
    </div>            
          </div>


            </LexicalComposer>
    </>

  );
}