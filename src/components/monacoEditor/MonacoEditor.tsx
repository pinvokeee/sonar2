import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef, useState } from 'react';
import { useGetDocumentPageAction } from '../../features/documentView/documentState';

export default function MonacoEditor() {

    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(monacoEl.current!, {
          value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
            "\n"
          ),
          language: "typescript",
          lineNumbers: "on", // テキストエディタの行番号を表示するかどうか
          roundedSelection: true, // 選択範囲を角丸にするかどうか
          scrollBeyondLastLine: false, // テキストエディタの最後の行を超えてスクロールするかどうか
          readOnly: false, // テキストエディタを読み取り専用にするかどうか
          theme: "vs-dark", // テキストエディタのテーマ
        });
      });

      monaco.editor.colorizeElement(monacoEl.current!, {  });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return <div ref={monacoEl}></div>;

    // const editorRef = useRef<HTMLDivElement>(null);
    // const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor>();

    // const getDocAction = useGetDocumentPageAction();
    // const viewDocumentId = getDocAction.selectedDocumentPageId;
    // const page = getDocAction.useGetDocumentPage(viewDocumentId as string);

    // useEffect(() => {

    //     if (editorRef.current === null) return;

    //     monacoRef.current = monaco.editor.create(editorRef.current, {
    //       value: '',
    //       language: 'javascript',
    //       theme: "vs-dark", 
    //     //   minimap: {
    //     //     enabled: false,
    //     //   },
    //       scrollBeyondLastLine: false,
    //       contextmenu: false,
    //       automaticLayout: true,
    //     });

    //     monaco.editor.colorizeElement(editorRef.current, { theme: "vs" });

    //     monacoRef.current.onDidChangeModelContent(() => {
    //       // 入力イベント(stateにセットなどを行う)
    //       console.log(monacoRef.current?.getValue() ?? ''); // 入力値を取得
    //     });

    //     return () => {
    //       monacoRef.current?.dispose();
    //     };
    //   }, []);

    // if (page != undefined && monacoRef != undefined) monacoRef.current?.setValue(page.content)

    
    //   return <div ref={editorRef} style={{ width: '100%', height: '100%' }}></div>   
}