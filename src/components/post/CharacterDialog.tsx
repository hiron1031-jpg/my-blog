import Image from "next/image";

interface CharacterDialogProps {
  workerText: string;
  beaverText: string;
}

export default function CharacterDialog({
  workerText,
  beaverText,
}: CharacterDialogProps) {
  return (
    <div className="not-prose my-6 space-y-3 rounded-xl border border-border bg-surface p-4">
      {/* 初心者（左） */}
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <Image
            src="/images/characters/worker-beginner.png"
            alt="土木初心者"
            width={52}
            height={52}
            className="rounded-full border border-border"
          />
          <p className="mt-1 text-center text-[10px] text-secondary">初心者</p>
        </div>
        <div className="relative mt-1 rounded-2xl rounded-tl-none bg-white px-4 py-3 text-sm text-secondary shadow-sm border border-border max-w-[80%]">
          <span className="absolute -left-2 top-3 h-3 w-3 overflow-hidden">
            <span className="absolute right-0 top-0 h-3 w-3 rotate-45 bg-white border-l border-b border-border" />
          </span>
          {workerText}
        </div>
      </div>

      {/* ビーバー監督（右） */}
      <div className="flex items-start justify-end gap-3">
        <div className="relative mt-1 rounded-2xl rounded-tr-none bg-primary/10 px-4 py-3 text-sm text-secondary shadow-sm border border-primary/20 max-w-[80%]">
          <span className="absolute -right-2 top-3 h-3 w-3 overflow-hidden">
            <span className="absolute left-0 top-0 h-3 w-3 rotate-45 bg-primary/10 border-r border-b border-primary/20" />
          </span>
          {beaverText}
        </div>
        <div className="shrink-0">
          <Image
            src="/images/characters/beaver-supervisor.png"
            alt="ビーバー監督"
            width={52}
            height={52}
            className="rounded-full border border-border"
          />
          <p className="mt-1 text-center text-[10px] text-secondary">監督</p>
        </div>
      </div>
    </div>
  );
}
