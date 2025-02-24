import React from 'react';

import { Person } from '../lib/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearSelection } from '../store/slices/selectedItems';

const SelectionFlyout: React.FC = () => {
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const dispatch = useAppDispatch();
  const selectedCount = Object.keys(selectedItems).length;

  if (selectedCount === 0) return null;

  const handleDownload = () => {
    const items = Object.values(selectedItems);
    const csvContent = generateCSV(items);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedCount}_characters.csv`;
    link.click();
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-gray-400 bg-white p-2 shadow-lg [.dark_&]:border-gray-700 [.dark_&]:bg-gray-900">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between">
        <span>{selectedCount} items selected</span>
        <div className="space-x-4">
          <button
            onClick={() => dispatch(clearSelection())}
            className="cursor-pointer rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 [.dark_&]:border-gray-700 [.dark_&]:hover:bg-gray-800"
          >
            Unselect all
          </button>
          <button
            onClick={handleDownload}
            className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

function generateCSV(items: Person[]): string {
  const headers = ['name', 'gender', 'birth_year', 'height', 'mass', 'url'];
  const csvRows = [
    headers.join(','),
    ...items.map((item) =>
      headers
        .map((header) => JSON.stringify(item[header as keyof Person]))
        .join(',')
    ),
  ];
  return csvRows.join('\n');
}

export default SelectionFlyout;
