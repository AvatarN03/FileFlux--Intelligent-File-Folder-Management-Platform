import { useState } from "react";

import  useFileStore  from "@/context/useFileStore";

import { Folder, FolderItem} from "@/types/file";
import { UseFolderHandlersProps } from "@/types/ui";


export const useFolderHandlers = ({
  folderId,
  newFolder,
  editName,
  setNewFolder,
  setEditName,
  setEditingId,
  setOpenMenuId,
  setOpenModel,
}: UseFolderHandlersProps) => {
  const [moveFolders, setMoveFolders] = useState<FolderItem[]>([]);
  const [movingFolderId, setMovingFolderId] = useState<number | null>(null);
  const [showMoveModal, setShowMoveModal] = useState(false);

  const { addFolder, updateFolder, deleteFolder, moveFolder, getAllFolders } =
    useFileStore();

  const handleAddFolder = () => {
    if (!newFolder) return;

    addFolder({ folderId, newFolder });
    setNewFolder("");
    setOpenModel(false);
  };

  const handleEdit = (folder: Folder) => {
    setEditingId(folder.id);
    setEditName(folder.name);
    setOpenMenuId(null);
  };

  const handleDelete = (folderId: number) => {
    const confirm = window.confirm(
      "Are you sure to delete the folder? Note: the files in this folder will also be deleted."
    );
    if (confirm) {
      deleteFolder({ folderId });
    }
    setOpenMenuId(null);
  };

  const handleMoveClick = async (folderId: number) => {
    setOpenMenuId(null);
    setMovingFolderId(folderId);

    const folders = await getAllFolders();
    let filtered = folders;

    if (folderId) {
      // build map parentId -> children
      const childrenMap = new Map<number | null, { id: number; parentId: number | null }[]>();
      folders.forEach((f) => {
        const key = f.parentId ?? null;
        if (!childrenMap.has(key)) childrenMap.set(key, []);
        // store minimal shape
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (childrenMap.get(key) as any).push({ id: f.id, parentId: f.parentId });
      });

      // find all descendants of folderId
      const descendantIds = new Set<number>();
      const stack = [folderId];
      while (stack.length) {
        const current = stack.pop()!;
        const children = childrenMap.get(current) ?? [];
        for (const c of children) {
          if (!descendantIds.has(c.id)) {
            descendantIds.add(c.id);
            stack.push(c.id);
          }
        }
      }

      // filter out the folder itself and all its descendants to prevent moving into them
      filtered = folders.filter((f) => f.id !== folderId && !descendantIds.has(f.id));
    }

    setMoveFolders(filtered);
    setShowMoveModal(true);
  };

  const handleConfirmMove = async (targetFolderId: number) => {
    if (!movingFolderId) return;

    await moveFolder({
      folderId: movingFolderId,
      parentId: targetFolderId === 0 ? undefined : targetFolderId,
    });

    setShowMoveModal(false);
    setMovingFolderId(null);
  };

  const handleBlurSave = (folder: Folder) => {
    const trimmed = editName.trim();

    if (!trimmed || trimmed === folder.name) {
      setEditingId(null);
      setEditName("");
      return;
    }

    updateFolder({
      folderId: folder.id,
      editName: trimmed,
    });

    setEditingId(null);
    setEditName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddFolder();
    } else if (e.key === "Escape") {
      setOpenModel(false);
    }
  };

  return {
    moveFolders,
    movingFolderId,
    showMoveModal,
    handleAddFolder,
    handleEdit,
    handleDelete,
    handleMoveClick,
    handleConfirmMove,
    handleBlurSave,
    handleKeyPress,
    setShowMoveModal,
  };
};