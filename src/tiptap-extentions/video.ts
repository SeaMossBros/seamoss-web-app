import { mergeAttributes, Node } from '@tiptap/core'

type VideoAttributes = {
  src: string
  width?: number | string
  controls?: boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      /**
       * Comments will be added to the autocomplete.
       */
      setVideo: (props: VideoAttributes) => ReturnType
    }
  }
}

export const Video = Node.create({
  name: 'video', // unique name for the Node
  group: 'block', // belongs to the 'block' group of extensions
  selectable: true, // so we can select the video
  draggable: true, // so we can drag the video
  atom: true, // is a single unit

  addAttributes() {
    return {
      src: {
        default: null,
        isRequired: true,
      },
      width: {
        default: '100%',
      },
      controls: {
        default: true,
      },
    }
  },

  addCommands() {
    return {
      setVideo:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          })
        },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes)]
  },
})
