import { Button, IconButton, ToggleButton, ToggleButtonGroup, Toolbar, styled } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
import { SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_CRITICAL, $getSelection, RangeSelection, FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';

const ToolBarButton = styled(Button)(({theme}) => ({

    '&.MuiButton-root': {
        "min-width": "0px",
    }

}));

type EditToolbarProps = {
    // onClick: (value: string) => void,
}

export function EditToolbar(props: EditToolbarProps) {

    const [editor] = useLexicalComposerContext();

    const [activeEditor, setActiveEditor] = useState(editor);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    const formatList = ["bold", "italic", "underline"];
    const [formats, setFormats] = useState(() : string[] => []);

    const $updateToolbar = () => {

        const selection = $getSelection() as RangeSelection;

        // setFormats(newFormats);

        setFormats(fs => {
            
            const ff = formatList.filter(formatType => selection.hasFormat(formatType as  TextFormatType));
            console.log(ff);
            return ff;
        })

    }

    const format = {
        // bold: useCallback()
    }


    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string) => {
        // console.log(event);
        // setFormats(newFormats);

        console.log(newFormats);

        // for (const newFormat of newFormats) {
        //     activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, (newFormat as TextFormatType));
        //     // if (formats.find(f => f != newFormat)) {
        //     //     activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, (newFormat as TextFormatType));
        //     // }
        // }
        


    };

    useEffect(() => {
        return editor.registerCommand(SELECTION_CHANGE_COMMAND, (_payload, newEditor) => {

            $updateToolbar();
            setActiveEditor(newEditor);
            
            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        );
      }, [editor, $updateToolbar]);
    
      
    useEffect(() => {
        return editor.registerCommand(FORMAT_TEXT_COMMAND, (_payload, newEditor) => {

            $updateToolbar();
            setActiveEditor(newEditor);
            
            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        );
      }, [editor, $updateToolbar]);

    return <>
      <Toolbar disableGutters={true}>
        <div style={{ display: "flex", gap: "6px" }}>
            <div>
                <ToolBarButton value="color">
                    <FormatColorTextIcon></FormatColorTextIcon>
                </ToolBarButton>
            </div>
            <div>
                <ToggleButtonGroup value={formats} size="small">

                    <ToggleButton value={"bold"} onChange={handleFormat} >
                        <FormatBoldIcon></FormatBoldIcon>
                    </ToggleButton>

                    <ToggleButton value={"italic"} onChange={handleFormat} >
                        <FormatItalicIcon></FormatItalicIcon>
                    </ToggleButton>

                    <ToggleButton value={"underline"} onChange={handleFormat} >
                        <FormatUnderlinedIcon></FormatUnderlinedIcon>
                    </ToggleButton>

                </ToggleButtonGroup>
            </div>
        </div>
        </Toolbar>
    </>
  }