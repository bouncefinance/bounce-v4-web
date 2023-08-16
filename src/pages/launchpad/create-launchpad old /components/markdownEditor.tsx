import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import { useRef } from 'react'

const MarkdownEditor = ({
  value,
  setEditorValue,
  placeholder,
  style
}: {
  value: string
  setEditorValue(val: string): void
  placeholder: string
  style?: React.CSSProperties
}) => {
  const mdEditor = useRef<Editor>(null)

  const handleEditorChange = ({ text }: { text: any }) => {
    setEditorValue(text)
  }
  return (
    <div className="App">
      <Editor
        ref={mdEditor}
        value={value}
        style={{
          width: '100%',
          height: '350px',
          ...style
        }}
        imageAccept=".jpeg,.png,.webp"
        onChange={handleEditorChange}
        placeholder={placeholder}
        shortcuts={true}
        renderHTML={text => {
          // eslint-disable-next-line react/no-children-prop
          return <ReactMarkdown children={text} />
        }}
      />
    </div>
  )
}
export default MarkdownEditor
