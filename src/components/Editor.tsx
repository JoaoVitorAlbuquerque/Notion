import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Underline from '@tiptap/extension-underline';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import { Color } from '@tiptap/extension-color'
// import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { initialContent } from './initalContent';
import { lowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble,
  RxUnderline,
  RxBlendingMode,
} from 'react-icons/rx';

import 'highlight.js/styles/tokyo-night-dark.css';
import { BubbleButton } from './BubbleButton';
import React, { useCallback } from 'react';

lowlight.registerLanguage('js', js);

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
      // Placeholder.configure({
      //   placeholder: ({ node }) => {
      //     if (node.type.name === 'heading') {
      //       return "What's the title?"
      //     }

      //     return 'Can you add some further context?'
      //   },
      // }),
      Blockquote,
      Document,
      Image,
      Youtube.configure({
        controls: true,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  // const MenuBar = ({ editor }) => {
  //   const widthRef = React.useRef(null)
  //   const heightRef = React.useRef(null)

  //   React.useEffect(() => {
  //     if (widthRef.current && heightRef.current) {
  //       widthRef.current.value = 640
  //       heightRef.current.value = 480
  //     }
  //   }, [widthRef.current, heightRef.current])
  // }

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        // width: Math.max(320, parseInt(widthRef.current.value, 10)) || 640,
        // height: Math.max(180, parseInt(heightRef.current.value, 10)) || 480,
      })
    }
  }

  return (
    <>
      {/* <MenuBar editor={editor} /> */}
      <EditorContent
        className="max-w-[700px] mx-auto pt-16 prose prose-invert prose-sky"
        editor={editor}
      />
      {editor && (
        <FloatingMenu
        editor={editor}
        className="h-72 overflow-y-scroll scrollbar bg-zinc-700 py-2 px-1 shadow-xl boder gap-1 border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
        shouldShow={({ state }) => {
          const { $from } = state.selection
          const currentLineText = $from.nodeBefore?.textContent

          return currentLineText === '/';
        }}
        >
          <div className="text-xs text-zinc-400">
            Blocos básicos
          </div>

          <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
            <img
              src="http://www.notion.so/images/blocks/text/en-US.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Text</span>
              <span className="text-xs text-zinc-400">Just start writing with plain text.</span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <img
              src="http://www.notion.so/images/blocks/header.57a7576a.png"
              alt="Heading"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 1</span>
              <span className="text-xs text-zinc-400">Big section heading.</span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <img
              src="http://www.notion.so/images/blocks/subheader.9aab4769.png"
              alt="Heading"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 2</span>
              <span className="text-xs text-zinc-400">Título de seção médio.</span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <img
              src="http://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
              alt="Heading"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 3</span>
              <span className="text-xs text-zinc-400">Título de seção pequena.</span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            data-active={editor.isActive('taskList')}
          >
            <img
              src="http://www.notion.so/images/blocks/to-do.f8d20542.png"
              alt="Check List"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Lista de tarefas</span>
              <span className="text-xs text-zinc-400">Acompanhar tarefas com uma lista de tarefas.</span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          >
            <img
              src="http://www.notion.so/images/blocks/simple-table.e31a23bb.png"
              alt="Check List"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Tabela</span>
              <span className="text-xs text-zinc-400">Adicione uma tabela simples a esta página.</span>
            </div>
          </button>

          <div className="text-xs text-zinc-400">
            Mídia
          </div>

          <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={addImage}
          >
            <img
              src="http://www.notion.so/images/blocks/image.33d80a98.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Imagem</span>
              <span className="text-xs text-zinc-400">Carregar ou integrar com um link.</span>
            </div>
          </button>

          <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={addYoutubeVideo}
          >
            <img
              src="http://www.notion.so/images/blocks/video.ceeec2c7.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Vídeo</span>
              <span className="text-xs text-zinc-400">Integrar do YouTube, Vimeo...</span>
            </div>
          </button>
        </FloatingMenu>
      )}
      { editor && (
        <BubbleMenu className="bg-zinc-700 shadow-xl boder border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x
        divide-zinc-600" editor={editor}
        >
          <BubbleButton
            onClick={() => ''}
          >
            Text
            <RxChevronDown className="w-4 h-4" />
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            data-active={editor.isActive('blockquote')}
          >
            Comment
            <RxChatBubble className="w-4 h-4" />
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <RxFontBold className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <RxFontItalic className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              data-active={editor.isActive('underline')}
            >
              <RxUnderline className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive('strike')}
            >
              <RxStrikethrough className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive('code')}
            >
              <RxCode className="w-4 h-4" />
            </BubbleButton>

            <BubbleButton
              onClick={() => editor.chain().focus().setColor('#958DF1').run()}
              data-active={editor.isActive('textStyle', { color: '#958DF1' })}
            >
              <RxBlendingMode className="w-4 h-4" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      ) }
    </>
  );
}
