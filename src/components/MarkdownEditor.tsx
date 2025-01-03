import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './MarkdownEditor.module.css';

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false }
);

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className={styles.container}>
      <CodeEditor
        value={value}
        language="markdown"
        placeholder="Mermaid diagram or Markdown here..."
        onChange={(e) => onChange(e.target.value)}
        padding={16}
        className={styles.editor}
        style={{
          fontSize: 14,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          height: '100%'
        }}
      />
    </div>
  );
}