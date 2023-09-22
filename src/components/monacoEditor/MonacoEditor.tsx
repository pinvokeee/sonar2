import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef } from 'react';

export const MonaEditor = () => {

    const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (editorRef.current === null) return;
    
    monacoRef.current = monaco.editor.create(editorRef.current, {
      value: '初期値',
      language: 'html',
      theme: 'vs',
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      contextmenu: false,
      automaticLayout: true,
    });

    monacoRef.current.onDidChangeModelContent(() => {
      // 入力イベント(stateにセットなどを行う)
      console.log(monacoRef.current?.getValue() ?? ''); // 入力値を取得
    });

    return () => {
      monacoRef.current?.dispose();
    };
  }, []);

  return <div ref={editorRef} style={{ width: '100%', height: '100%' }}></div>
}