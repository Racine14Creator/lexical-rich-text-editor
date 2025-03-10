import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, REDO_COMMAND } from 'lexical';
import { UNDO_COMMAND } from 'lexical';
import { Undo2Icon, Redo2Icon, BoldIcon, ItalicIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'

export default function Toolbars() {
    const [isBold, setIsBold] = useState<boolean>(false);
    const [isItalic, setIsItalic] = useState<boolean>(false);
    const [isUnderline, setIsUnderline] = useState<boolean>(false);
    const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false);
    const [editor] = useLexicalComposerContext();

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // Update text format
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
          setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
      }, []);

      useEffect(()=>{
        editor.registerUpdateListener(({editorState}) => {
            editorState.read(() => {
              $updateToolbar();
            });
        });
    },[$updateToolbar]);
      
  return (
    <div className="flex items-center gap-2 rounded-3xl px-5 py-3 border border-gray-200 shadow-lg">
        <button type="button" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
            <Undo2Icon />
        </button>
        <button type="button" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
            <Redo2Icon />
        </button>

        <div className="divider vertical"></div>

        <div className="flex">
            <button type="button" className={isBold ? "bg-blue-500" : ""} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
                <BoldIcon />
            </button>
            <button type="button" className={isItalic ? "bg-blue-500" : ""} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
                <ItalicIcon />
            </button>
        </div>
    </div>
  )
}
