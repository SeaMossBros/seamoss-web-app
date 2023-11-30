'use client'

import { Link, RichTextEditor, RichTextEditorProps } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import RichTextControlImage from '../RichTextControls/Image'

export type ContentEditorProps = Omit<
  RichTextEditorProps,
  'children' | 'defaultValue' | 'editor' | 'onChange'
> & {
  defaultValue?: JSONContent
  placeholder?: string
  readonly?: boolean
  onChange?: (jsonContent: JSONContent) => void
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  defaultValue,
  placeholder,
  readonly,
  onChange,
  ...richTextEditorProps
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Placeholder.configure({ placeholder: placeholder || 'Content...' }),
    ],
    content: defaultValue,
    editable: !readonly,
    onUpdate: ({ editor: _editor }) => {
      const json = _editor.getJSON()
      onChange?.(json)
    },
  })

  return (
    <RichTextEditor {...richTextEditorProps} editor={editor}>
      {editor?.isEditable ? (
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextControlImage />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
      ) : null}
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}

export default ContentEditor
