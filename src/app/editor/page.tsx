'use client';

import { useState } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import MermaidPreview from '@/components/MermaidPreview';

export default function EditorPage() {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-2 gap-8 h-[calc(100vh-4rem)]">
        <div className="h-full">
          <MarkdownEditor value={code} onChange={setCode} />
        </div>
        <div className="h-full">
          <MermaidPreview code={code} />
        </div>
      </div>
    </div>
  );
}