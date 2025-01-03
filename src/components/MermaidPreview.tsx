import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

type MermaidPreviewProps = {
  code: string;
};

export default function MermaidPreview({ code }: MermaidPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMermaid = async () => {
      if (ref.current) {
        mermaid.initialize({ 
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose'
        });

        // 空のコードの場合は何も表示しない
        if (!code.trim()) {
          ref.current.innerHTML = '';
          return;
        }

        try {
          // Mermaidコードブロックを抽出
          const mermaidCode = code.match(/```mermaid([\s\S]*?)```/)?.[1]?.trim() || code;
          
          // 有効なMermaidコードか確認
          if (!mermaidCode.startsWith('graph') && 
              !mermaidCode.startsWith('sequenceDiagram') &&
              !mermaidCode.startsWith('classDiagram') &&
              !mermaidCode.startsWith('stateDiagram')) {
            ref.current.innerHTML = 'Invalid Mermaid syntax';
            return;
          }

          mermaid.parse(mermaidCode);
          const { svg } = await mermaid.render('mermaid', mermaidCode);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          if (ref.current) {
            ref.current.innerHTML = 'Invalid Mermaid syntax';
          }
        }
      }
    };

    renderMermaid();
  }, [code]);

  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow">
      <div ref={ref} className="mermaid" />
    </div>
  );
}