import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import { useRef, useState } from 'react'

const MarkdownEditor = () => {
  const mdEditor = useRef<Editor>(null)
  const [value, setValue] = useState('xxx')

  const handleClick = () => {
    if (mdEditor.current) {
      alert(mdEditor.current.getMdElement())
    }
  }

  const handleEditorChange = ({ html, text }: { html: any; text: any }) => {
    const newValue = text.replace(/\d/g, '')
    console.log(newValue)
    setValue(newValue)
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Get value</button>
      <Editor
        ref={mdEditor}
        value={value}
        style={{
          height: '500px'
        }}
        onChange={handleEditorChange}
        renderHTML={text => {
          console.log(text)
          // eslint-disable-next-line react/no-children-prop
          return <ReactMarkdown children={text} />
        }}
      />
    </div>
  )
}
export default MarkdownEditor
