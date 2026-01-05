import Link from "next/link";

import { Plus, ChevronRight } from "lucide-react";
import { FolderListHeaderProps } from "@/types/ui";


const FolderListHeader = ({ onAddClick, folderName, folderPath }: FolderListHeaderProps) => {
  const hasPath = folderPath && folderPath.length > 0;

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-4 md:gap-8">
        <div className="flex items-center gap-3">
          {!hasPath ? (
            <h1 className="text-base md:text-xl text-brown">{folderName ?? "Folders"}</h1>
          ) : (
            <div className="flex items-center gap-2 max-w-[60%]">
              {/* parents */}
              <div className="flex items-center gap-2 truncate">
                {folderPath!.slice(0, -1).map((p) => (
                  <span key={p.id} className="flex items-center gap-2 text-sm md:text-base truncate">
                    <Link href={`/folders/${p.id}`} className="hover:underline truncate">{p.name}</Link>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                ))}
              </div>

              {/* last (child) - truncate at start if very long */}
              <div className="text-base md:text-xl text-brown max-w-56 md:max-w-md">
                <div className="truncate" style={{ direction: "rtl" }}>
                  <span style={{ direction: "ltr", display: "inline-block" }}>
                    {folderPath![folderPath!.length - 1].name}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div
            className="flex justify-center items-center md:gap-1 bg-brown hover:bg-peach cursor-pointer p-1 md:p-2 rounded-xl"
            onClick={onAddClick}
          >
            <Plus className="text-violet w-4 h-4 md:w-5 md:h-5" />
            <h1 className="text-violet text-sm md:text-base">Add Folder</h1>
          </div>
        </div>
      </div>
      <Link href={"/folders"} className="hover:underline text-sm md:text-base">
        View all
      </Link>
    </div>
  );
};

export default FolderListHeader;