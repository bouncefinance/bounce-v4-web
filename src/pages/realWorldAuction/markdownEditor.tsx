import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import { useRef } from 'react'
import { uploader } from 'api/upload'

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
  const handleImageUpload = (file: File) => {
    return new Promise((resolve, reject) => {
      uploader({
        file: file
      }).then(res => {
        if (res) {
          resolve(res.data.path)
        } else {
          reject('')
        }
      })
    })
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
        onImageUpload={handleImageUpload}
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
