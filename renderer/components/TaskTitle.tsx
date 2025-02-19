import React, { useState } from "react";

type Props = {
  title: string;
  onUpdate: (newTitle: string) => void;
};

const TaskTitle = ({ title, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editingTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={handleSubmit}
          autoFocus
          className="bg-gray-500 text-black rounded text-xs"
        />
      </form>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer text-ellipsis w-48 overflow-hidden whitespace-nowrap text-xs"
    >
      {editingTitle}
    </div>
  );
};

export default TaskTitle;
